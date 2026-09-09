import json, re
from pathlib import Path

BASE = Path('C:/Users/25895/Desktop/MIS3011/个人网站/portfolio-site')
SITE_DATA = BASE / 'src/data/siteData.ts'
MIGRATED = BASE / 'migrated_data.json'

migrated = json.loads(MIGRATED.read_text(encoding='utf-8'))


def omit_optional(entry, keys):
    return {k: v for k, v in entry.items() if not (k in keys and (v is None or v == ''))}


# 给动画条目生成 ID 并清理字段
anime_clean = []
season_groups = {}
for i, e in enumerate(migrated['anime']):
    season = e['season']
    season_groups.setdefault(season, 0)
    season_groups[season] += 1
    prefix = 'a2607-' if season == '2026年7月' else ('a2604-' if season == '2026年4月' else 'aextra-')
    num = season_groups[season]
    e['id'] = f'{prefix}{num:02d}'
    e = omit_optional(e, ['tierNote', 'detail', 'cover'])
    anime_clean.append(e)

# 音乐、游戏、手作
for idx, e in enumerate(migrated['music'], start=1):
    e['id'] = f'm-{idx:02d}'
    e = omit_optional(e, ['favoritePart', 'link', 'cover', 'reason'])

for idx, e in enumerate(migrated['games'], start=1):
    e['id'] = f'g-{idx:02d}'
    e = omit_optional(e, ['platform', 'hours', 'highlight', 'cover'])

for idx, e in enumerate(migrated['crafts'], start=1):
    e['id'] = f'c-{idx:02d}'
    # kind 从 xlsx 可能是 "拼豆"，为了类型和 UI 兼容，归入 "手作"，同时保留显示
    e['kind'] = '手作'
    e = omit_optional(e, ['description', 'image', 'link', 'linkLabel', 'date', 'placeholderSize'])


def ts_literal(v, indent=0):
    """生成可读的 TypeScript 字面量，省略 null/空可选字段"""
    pad = '  ' * indent
    if isinstance(v, dict):
        if not v:
            return '{}'
        lines = ['{']
        for k, val in v.items():
            lines.append(f'{pad}  {k}: {ts_literal(val, indent + 1)},')
        lines.append(f'{pad}}}')
        return '\n'.join(lines)
    if isinstance(v, list):
        if not v:
            return '[]'
        if all(isinstance(x, str) for x in v):
            # 字符串数组单行
            return '[' + ', '.join(ts_literal(x, indent) for x in v) + ']'
        items = ',\n'.join(ts_literal(x, indent + 1) for x in v)
        return f'[\n{items}\n{pad}]'
    if isinstance(v, str):
        # 优先用单引号；含换行用 JSON 双引号转义
        if '\n' in v or '\r' in v:
            return json.dumps(v, ensure_ascii=False)
        if "'" in v and '`' not in v:
            return f'`{v}`'
        if "'" in v:
            return json.dumps(v, ensure_ascii=False)
        return f"'{v}'"
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if v is None:
        return 'undefined'
    return str(v)


anime_ts = ts_literal(anime_clean)
music_ts = ts_literal(migrated['music'])
games_ts = ts_literal(migrated['games'])
crafts_ts = ts_literal(migrated['crafts'])

text = SITE_DATA.read_text(encoding='utf-8')


def replace_array(content, name, new_body):
    pattern = re.compile(rf'export const {name}: \w+\[\] = \[(?P<body>[\s\S]*?)\n\]')
    m = pattern.search(content)
    if not m:
        raise RuntimeError(f'Could not find {name} array')
    start = m.start('body') - 1  # include the [ already matched
    end = m.end()
    return content[:start] + f'[\n{new_body}\n]' + content[end:]


text = replace_array(text, 'animeEntries', anime_ts[1:-1])  # remove outer [ ]
text = replace_array(text, 'musicEntries', music_ts[1:-1])
text = replace_array(text, 'gameEntries', games_ts[1:-1])
text = replace_array(text, 'creativeEntries', crafts_ts[1:-1])

# 更新评级梯队顺序与分数：顶级 > 夯 > 人上人 > npc > 拉 > 未评
text = re.sub(
    r"export const animeTierOrder: AnimeTier\[\] = \[[^\]]*\]",
    "export const animeTierOrder: AnimeTier[] = ['顶级', '夯', '人上人', 'npc', '拉', '未评']",
    text,
)
text = re.sub(
    r"export const animeTierScore: Record<AnimeTier, number> = \{[^}]*\}",
    """export const animeTierScore: Record<AnimeTier, number> = {
  顶级: 6,
  夯: 5,
  人上人: 4,
  npc: 3,
  拉: 2,
  未评: 1,
}""",
    text,
)

# 更新文件头注释，去掉音乐/游戏/手作的「示例数据」提示
text = re.sub(
    r'\n/\* ---------- 兴趣角落 B：音乐推荐 ---------- \*/\n',
    '\n/* ---------- 兴趣角落 B：音乐推荐 ---------- */\n',
    text,
)
text = re.sub(
    r'/\* ⚠️ 示例数据 · 待替换：请换成你最近在玩的游戏与感想。 \*/\n',
    '',
    text,
)
text = re.sub(
    r'/\* ⚠️ 示例数据 · 待替换：请换成你的手作照片、吉他练习与翻唱记录。\s*图片放到 public/crafts/ 文件夹后，把 image 字段改为 \'/crafts/文件名.jpg\' 即可。 \*/\n',
    '',
    text,
)

SITE_DATA.write_text(text, encoding='utf-8')
print('siteData.ts updated')
