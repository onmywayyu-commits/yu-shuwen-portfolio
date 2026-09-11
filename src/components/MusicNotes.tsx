import { useMemo, useState } from 'react'
import CoverArt from './CoverArt'
import libraryData from '../data/libraryData.json'

/* ---------- Types ---------- */
interface Music {
  id: string
  title: string
  artist: string
  album?: string
  tags: string[]
  comment: string
  favoritePart?: string
  link?: string
  monthlyPick?: boolean
  cover?: string
}

/* ---------- Data ---------- */
const musics: Music[] = libraryData.musics as Music[]

/* ---------- Components ---------- */
function TagFilter({
  tags,
  value,
  onChange,
}: {
  tags: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium tracking-wide text-[var(--muted)]">风格</span>
      {tags.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          aria-pressed={value === t}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
            value === t
              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-strong)]'
              : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent-strong)]'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

function PlayButton({ href, label }: { href?: string; label: string }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent-strong)] transition-all hover:bg-[var(--accent)] hover:text-white"
      >
        <PlayIcon />
        {label}
      </a>
    )
  }

  return (
    <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)]">
      <PlayIcon />
      试听链接待补充
    </span>
  )
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function MusicCard({ music }: { music: Music }) {
  const [isLyricsExpanded, setIsLyricsExpanded] = useState(false)

  return (
    <article className="group flex gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(96,76,88,0.14)] sm:gap-5 sm:p-5">
      {/* Album cover */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--line)] shadow-sm transition-transform duration-300 group-hover:scale-[1.03] sm:h-28 sm:w-28">
        <CoverArt seed={music.id} title={music.title} image={music.cover} />
        {music.monthlyPick && (
          <span className="absolute -right-5 -top-5 flex h-14 w-14 rotate-45 items-end justify-center bg-[#c5b8d6] pb-1 text-[10px] font-bold text-[#4a3b5c]">
            PICK
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="truncate text-base font-bold text-[var(--ink)] sm:text-lg">{music.title}</h4>
            <p className="mt-0.5 truncate text-sm text-[var(--accent-strong)]">{music.artist}</p>
            {music.album && <p className="truncate text-xs text-[var(--muted)]">{music.album}</p>}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
          {music.comment}
        </p>

        {music.favoritePart && (
          <div className="mt-3 rounded-xl border border-[var(--line)] bg-[#faf7f5] p-3 dark:bg-[#2e292f]">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              喜欢的片段
            </p>
            <p
              className={`text-xs leading-relaxed whitespace-pre-line text-[var(--ink)] ${
                isLyricsExpanded ? '' : 'line-clamp-3'
              }`}
            >
              {music.favoritePart}
            </p>
            {music.favoritePart.split('\n').length > 3 && (
              <button
                type="button"
                onClick={() => setIsLyricsExpanded((v) => !v)}
                className="mt-1.5 text-[10px] font-medium text-[var(--accent-strong)] hover:underline"
              >
                {isLyricsExpanded ? '收起' : '展开'}
              </button>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {music.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-2 py-0.5 text-[10px] text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <PlayButton href={music.link} label={music.monthlyPick ? '本月循环试听' : '试听'} />
        </div>
      </div>
    </article>
  )
}

/* ---------- Main ---------- */
export default function MusicNotes() {
  const tags = useMemo(
    () => ['全部', ...Array.from(new Set(musics.flatMap((m) => m.tags)))],
    [],
  )
  const [tag, setTag] = useState('全部')

  const filtered = musics.filter((m) => tag === '全部' || m.tags.includes(tag))

  return (
    <div>
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        音乐推荐与乐评。歌词片段使用原文与中文对照，展开可查看完整内容。
      </p>

      <TagFilter tags={tags} value={tag} onChange={setTag} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {filtered.map((m) => (
          <MusicCard key={m.id} music={m} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
          这个筛选组合下暂时没有条目。
        </p>
      )}
    </div>
  )
}
