import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CoverArt from './CoverArt'
import libraryData from '../data/libraryData.json'

/* ---------- Types ---------- */
type AnimeTier = '夯' | '顶级' | '人上人' | 'npc' | '拉' | '未评'

interface Anime {
  id: string
  title: string
  genre: string
  season: string
  status: string
  tier: AnimeTier
  tierNote?: string
  shortReview: string
  detail?: string
  dropped?: boolean
  cover?: string
  link?: string
}

/* ---------- Data ---------- */
const animes: Anime[] = libraryData.animes as Anime[]

const tierOrder: AnimeTier[] = ['夯', '顶级', '人上人', 'npc', '拉', '未评']

const tierMeta: Record<
  AnimeTier,
  { label: string; sub: string; labelBg: string; labelText: string; accent: string; border: string }
> = {
  夯: {
    label: '夯',
    sub: 'LOVE',
    labelBg: 'bg-[#d8c4b8]',
    labelText: 'text-[#5d3f30]',
    accent: '#b07d62',
    border: 'border-[#c9a992]',
  },
  顶级: {
    label: '顶级',
    sub: 'LIKE',
    labelBg: 'bg-[#c8bcd6]',
    labelText: 'text-[#4a3b5c]',
    accent: '#7d6a91',
    border: 'border-[#a99bbd]',
  },
  人上人: {
    label: '人上人',
    sub: 'OK',
    labelBg: 'bg-[#b8c9d6]',
    labelText: 'text-[#314a5a]',
    accent: '#5e7d91',
    border: 'border-[#9bb0c0]',
  },
  npc: {
    label: 'NPC',
    sub: 'NORMAL',
    labelBg: 'bg-[#d1ccc7]',
    labelText: 'text-[#4a4744]',
    accent: '#8a8580',
    border: 'border-[#b8b2ac]',
  },
  拉: {
    label: '拉',
    sub: 'DROP',
    labelBg: 'bg-[#d6b8b8]',
    labelText: 'text-[#5a3131]',
    accent: '#9b6b6b',
    border: 'border-[#c49a9a]',
  },
  未评: {
    label: '未评',
    sub: 'UNRATED',
    labelBg: 'bg-[#e8e4e1]',
    labelText: 'text-[#6b6763]',
    accent: '#9e9a96',
    border: 'border-[#c9c5c1]',
  },
}

/* ---------- Components ---------- */
function SeasonFilter({
  seasons,
  value,
  onChange,
}: {
  seasons: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium tracking-widest text-[var(--muted)] uppercase">发布时期</span>
      {seasons.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          aria-pressed={value === s}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
            value === s
              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-strong)]'
              : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent-strong)]'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

function AnimeCard({
  anime,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  onClick,
}: {
  anime: Anime
  onHoverStart: (el: HTMLElement, anime: Anime) => void
  onHoverMove: (el: HTMLElement) => void
  onHoverEnd: () => void
  onClick: (anime: Anime) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const theme = tierMeta[anime.tier]
  const review = anime.detail || anime.shortReview

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onClick(anime)}
      onMouseEnter={() => ref.current && onHoverStart(ref.current, anime)}
      onMouseMove={() => ref.current && onHoverMove(ref.current)}
      onMouseLeave={onHoverEnd}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(96,76,88,0.16)]"
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--accent-soft)]">
        <CoverArt seed={anime.id} title={anime.title} image={anime.cover} />

        {/* Hover overlay with review */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--ink)]/85 via-[var(--ink)]/50 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="line-clamp-5 text-xs leading-relaxed text-[var(--bg)]">{review}</p>
        </div>

        {anime.dropped && (
          <span className="absolute left-2 top-2 rounded bg-[var(--ink)]/80 px-1.5 py-0.5 text-[10px] text-[var(--bg)]">
            已弃
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3">
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--accent-strong)]">
          {anime.title}
        </h4>
        <p className="mt-1 text-[11px] text-[var(--muted)]">
          {anime.season} · {anime.genre || '动画'}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
          <span className="text-[10px] text-[var(--muted)]">{anime.status}</span>
        </div>
      </div>
    </button>
  )
}

/** Floating hover popover for richer details */
function AnimePopover({ anime, targetEl, onClose }: { anime: Anime; targetEl: HTMLElement; onClose: () => void }) {
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const theme = tierMeta[anime.tier]

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const rect = targetEl.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const margin = 12

    let left = rect.left + rect.width / 2 - cardRect.width / 2
    let top = rect.top - cardRect.height - margin

    if (left < margin) left = margin
    if (left + cardRect.width > window.innerWidth - margin) {
      left = window.innerWidth - cardRect.width - margin
    }
    if (top < margin) {
      top = rect.bottom + margin
    }

    setPos({ left, top })
  }, [targetEl])

  const fullReview = anime.detail || anime.shortReview

  return createPortal(
    <div
      ref={cardRef}
      style={{ left: pos.left, top: pos.top }}
      className="fixed z-[60] w-[min(90vw,320px)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_24px_70px_rgba(96,76,88,0.22)]"
      onMouseLeave={onClose}
    >
      <div className="flex gap-4">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--line)]">
          <CoverArt seed={anime.id} title={anime.title} image={anime.cover} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-semibold leading-tight text-[var(--ink)]">{anime.title}</h4>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {anime.season} · {anime.genre || '动画'}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${theme.labelBg} ${theme.labelText} ${theme.border}`}>
              {theme.label}
            </span>
            {anime.tierNote && <span className="text-xs text-[var(--muted)]">{anime.tierNote}</span>}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-[var(--line)] pt-3">
        <p className="max-h-32 overflow-y-auto text-sm leading-relaxed whitespace-pre-line text-[var(--ink)]">
          {fullReview}
        </p>
      </div>

      {anime.link && (
        <a
          href={anime.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center text-xs font-medium text-[var(--accent-strong)] hover:underline"
        >
          阅读全文 →
        </a>
      )}
    </div>,
    document.body,
  )
}

/** Detail modal for click / mobile */
function AnimeModal({ anime, onClose }: { anime: Anime; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const theme = tierMeta[anime.tier]
  const fullReview = anime.detail || anime.shortReview

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[var(--ink)]/40 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="h-32 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--line)] sm:h-40 sm:w-28">
            <CoverArt seed={anime.id} title={anime.title} image={anime.cover} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-snug text-[var(--ink)] sm:text-xl">{anime.title}</h3>
            <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
              {anime.season} · {anime.genre || '动画'} · {anime.status}
              {anime.dropped && ' · 已弃番'}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-sm font-medium ${theme.labelBg} ${theme.labelText} ${theme.border}`}>
                {theme.label}
              </span>
              {anime.tierNote && <span className="text-xs text-[var(--muted)]">（{anime.tierNote}）</span>}
            </div>
          </div>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            className="shrink-0 rounded-full border border-[var(--line)] p-1.5 text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>

        <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[var(--ink)] sm:text-base">
          {fullReview}
        </p>

        {anime.link && (
          <a
            href={anime.link}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center rounded-full bg-[var(--accent-strong)] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            阅读全文 →
          </a>
        )}
      </div>
    </div>
  )
}

/* ---------- Main ---------- */
export default function AnimeJournal() {
  const [filterSeason, setFilterSeason] = useState('全部')
  const [hovered, setHovered] = useState<{ anime: Anime; el: HTMLElement } | null>(null)
  const [selected, setSelected] = useState<Anime | null>(null)

  const seasons = useMemo(
    () => ['全部', ...Array.from(new Set(animes.map((a) => a.season)))],
    [],
  )

  const filtered = useMemo(() => {
    return animes.filter((a) => filterSeason === '全部' || a.season === filterSeason)
  }, [filterSeason])

  const grouped = useMemo(() => {
    const groups: Record<string, Anime[]> = {}
    tierOrder.forEach((tier) => {
      groups[tier] = filtered.filter((a) => a.tier === tier)
    })
    return groups
  }, [filtered])

  const visibleTiers = tierOrder.filter((tier) => grouped[tier].length > 0)

  return (
    <div>
      <SeasonFilter seasons={seasons} value={filterSeason} onChange={setFilterSeason} />

      <div className="space-y-10">
        {visibleTiers.map((tier) => {
          const theme = tierMeta[tier]
          const items = grouped[tier]
          return (
            <div key={tier} className="flex gap-4 sm:gap-6">
              {/* Tier label */}
              <div className="relative flex w-14 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-[var(--line)] py-6 sm:w-20 sm:py-8">
                <div
                  className={`absolute inset-x-2 top-4 bottom-4 rounded-xl ${theme.labelBg} opacity-40`}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className={`text-2xl font-bold leading-none ${theme.labelText} sm:text-3xl`}>
                    {theme.label}
                  </span>
                  <span className="mt-2 text-[9px] tracking-widest text-[var(--muted)] uppercase sm:text-[10px]">
                    {theme.sub}
                  </span>
                  <span className="mt-4 text-[10px] text-[var(--muted)] sm:text-xs">{items.length} works</span>
                </div>

                {/* Decorative diamond */}
                <div
                  className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border border-[var(--line)] bg-[var(--surface)]"
                  style={{ borderColor: theme.accent }}
                />
              </div>

              {/* Cards grid */}
              <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4">
                {items.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onHoverStart={(el, a) => setHovered({ anime: a, el })}
                    onHoverMove={(el) => setHovered((prev) => (prev && prev.anime.id === anime.id ? { anime, el } : prev))}
                    onHoverEnd={() => setHovered(null)}
                    onClick={(a) => setSelected(a)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
          这个筛选组合下暂时没有条目。
        </p>
      )}

      {hovered && !selected && (
        <AnimePopover anime={hovered.anime} targetEl={hovered.el} onClose={() => setHovered(null)} />
      )}

      {selected && <AnimeModal anime={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
