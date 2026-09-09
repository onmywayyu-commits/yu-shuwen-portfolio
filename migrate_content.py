import csv, shutil, os, re, json
from pathlib import Path
from openpyxl import load_workbook

BASE = Path('C:/Users/25895/Desktop/MIS3011/个人网站')
IMG_DIR = BASE / '图片'
PUBLIC = BASE / 'portfolio-site/public'
COVERS_DST = PUBLIC / 'covers'
CRAFTS_DST = PUBLIC / 'crafts'
COVERS_DST.mkdir(exist_ok=True)
CRAFTS_DST.mkdir(exist_ok=True)

wb = load_workbook(BASE / '兴趣板块.xlsx', data_only=True)

def norm(s):
    return re.sub(r'[\s\u3000.。,，!！?？~～\-\(\)（）【】]', '', str(s))

def guess_cover(title):
    """根据文件名匹配封面图；文件名可能简化/换序"""
    title_n = norm(title)
    candidates = {norm(f.stem): f for f in (IMG_DIR / '番剧').iterdir() if f.is_file()}
    # exact norm title first
    for stem, f in candidates.items():
        if stem == title_n:
            return f
    # substring
    for stem, f in candidates.items():
        if stem in title_n or title_n in stem:
            return f
    # relaxed: if all chars of one in other
    for stem, f in candidates.items():
        if set(stem).intersection(title_n) and (len(set(stem) & set(title_n)) / max(len(set(title_n)), 1) > 0.6):
            return f
    return None


def copy_cover(title):
    src = guess_cover(title)
    if not src:
        return None
    dst = COVERS_DST / src.name
    shutil.copy2(src, dst)
    return f'/covers/{src.name}'


def parse_anime(sheet, season):
    rows = list(sheet.iter_rows(values_only=True))
    if len(rows) < 2:
        return []
    out = []
    prev = None
    # skip header row
    for i, row in enumerate(rows[1:], start=2):
        if str(row[0]).strip() == '名称':
            continue
        title = str(row[0]) if row[0] else ''
        genre = str(row[1]) if len(row) > 1 and row[1] else ''
        comment = str(row[2]) if len(row) > 2 and row[2] else ''
        tier_raw = str(row[3]) if len(row) > 3 and row[3] else ''
        # continuation row (empty title)
        if not title.strip() and prev is not None:
            if comment:
                prev['detail'] = (prev.get('detail') or prev.get('shortReview') or '') + '\n' + comment
            if tier_raw.strip():
                prev['tierNote'] = tier_raw.strip()
            continue
        # new entry
        dropped = '已弃' in comment or '看不下去' in comment
        status = '补番' if '补番' in genre or (season == '补番') else '新番'
        # normalize tier
        t = tier_raw.strip()
        if 'npc' in tier_raw.lower():
            tier = 'npc'
            note = t if t != 'npc' else ''
        elif '顶级' in tier_raw:
            tier = '顶级'
            note = ''
        elif '人上人' in tier_raw:
            tier = '人上人'
            note = t if t != '人上人' else ''
        elif t == '夯':
            tier = '夯'
            note = ''
        elif t == '拉':
            tier = '拉'
            note = ''
        else:
            tier = '未评'
            note = t if t else ''
        # shortReview: first sentence before first ； or whole comment if short
        short = comment.split('；')[0] if '；' in comment else comment
        short = short.strip()[:140]
        detail = comment.strip() if len(comment) > len(short) else None
        entry = {
            'title': title.strip(),
            'genre': genre.strip(),
            'season': season,
            'status': status,
            'tier': tier,
            'tierNote': note or None,
            'shortReview': short,
            'detail': detail,
            'dropped': dropped,
            'cover': copy_cover(title.strip())
        }
        out.append(entry)
        prev = entry
    return out


def parse_music(sheet):
    rows = list(sheet.iter_rows(values_only=True))
    out = []
    for row in rows[1:]:
        title = str(row[0]) if row[0] else ''
        if title.strip() in ('名称', '歌曲推荐', ''):
            continue
        artist = str(row[1]) if len(row) > 1 and row[1] else ''
        tag = str(row[2]) if len(row) > 2 and row[2] else ''
        comment = str(row[3]) if len(row) > 3 and row[3] else ''
        fav = str(row[6]) if len(row) > 6 and row[6] else ''
        monthly_cell = str(row[7]) if len(row) > 7 and row[7] else ''
        monthly = '本月循环' in (monthly_cell + tag + comment + fav)
        out.append({
            'title': title.strip(),
            'artist': artist.strip(),
            'tags': [t.strip() for t in tag.replace('，', ',').split(',') if t.strip()],
            'reason': '',
            'comment': comment.strip(),
            'favoritePart': fav.strip() or None,
            'link': '',
            'monthlyPick': monthly,
        })
    return out


def parse_games(sheet):
    rows = list(sheet.iter_rows(values_only=True))
    out = []
    for row in rows[1:]:
        title = str(row[0]) if row[0] else ''
        if title.strip() in ('名称', '游戏手记', ''):
            continue
        status = str(row[1]) if len(row) > 1 and row[1] else ''
        comment = str(row[3]) if len(row) > 3 and row[3] else ''
        rating = str(row[4]) if len(row) > 4 and row[4] else ''
        # parse stars
        r = rating.strip()
        if '五星' in r:
            rec = 5
        elif '四星半' in r or '4.5' in r:
            rec = 4.5
        elif '四星' in r:
            rec = 4
        elif '三星半' in r or '3.5' in r:
            rec = 3.5
        elif '三星' in r:
            rec = 3
        else:
            rec = 4
        out.append({
            'title': title.strip(),
            'platform': '',
            'status': status.strip(),
            'hours': '',
            'recommend': rec,
            'comment': comment.strip(),
            'highlight': '',
        })
    return out


def craft_image(title):
    """在 图片/手工 中按标题匹配手作照片"""
    title_n = norm(title)
    for f in (IMG_DIR / '手工').iterdir():
        if not f.is_file():
            continue
        stem = norm(f.stem)
        if stem == title_n or stem in title_n or title_n in stem:
            dst = CRAFTS_DST / f.name
            shutil.copy2(f, dst)
            return f'/crafts/{f.name}'
    return None


def parse_crafts(sheet):
    rows = list(sheet.iter_rows(values_only=True))
    out = []
    for row in rows[1:]:  # skip header
        if not row or not row[0]:
            continue
        idx = str(row[0]).strip()
        title = str(row[1]).strip() if len(row) > 1 and row[1] else ''
        kind = str(row[2]).strip() if len(row) > 2 and row[2] else ''
        # 第 5 列（索引 4）是视频链接
        video = str(row[4]).strip() if len(row) > 4 and row[4] else ''
        if not title or title == 'IP/名称':
            continue
        out.append({
            'title': title,
            'date': '',
            'kind': kind,
            'description': '',
            'image': craft_image(title),
            'link': video if video.startswith('http') else '',
            'linkLabel': '制作过程视频' if video.startswith('http') else '',
        })
    return out


anime7 = parse_anime(wb['26.7新番评价'], '2026年7月')
anime4 = parse_anime(wb['26.4新番评价'], '2026年4月')
anime_extra = parse_anime(wb['补番评价'], '补番')
all_anime = anime7 + anime4 + anime_extra

music = parse_music(wb['音乐'])
games = parse_games(wb['游戏手记'])
crafts = parse_crafts(wb['手工'])

with open(BASE / 'portfolio-site/migrated_data.json', 'w', encoding='utf-8') as f:
    json.dump({
        'anime': all_anime,
        'music': music,
        'games': games,
        'crafts': crafts,
    }, f, ensure_ascii=False, indent=2)

print(f'anime={len(all_anime)}, music={len(music)}, games={len(games)}, crafts={len(crafts)}')
print('covers:', sorted(COVERS_DST.iterdir()))
print('crafts:', sorted(CRAFTS_DST.iterdir()))
