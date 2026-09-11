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

const tierDisplay = (tier: AnimeTier): string => (tier === 'npc' ? 'NPC' : tier)

/** 莫兰迪色系梯队标签 */
const tierTheme: Record<AnimeTier, { labelBg: string; labelText: string; dot: string; border: string }> = {
  夯: {
    labelBg: 'bg-[#e6c2b0]',
    labelText: 'text-[#7a4f3d]',
    dot: 'bg-[#b07d62]',
    border: 'border-[#d6a88e]',
  },
  顶级: {
    labelBg: 'bg-[#c5b8d6]',
    labelText: 'text-[#4a3b5c]',
    dot: 'bg-[#7d6a91]',
    border: 'border-[#a99bbd]',
  },
  人上人: {
    labelBg: 'bg-[#b8c9d6]',
    labelText: 'text-[#314a5a]',
    dot: 'bg-[#5e7d91]',
    border: 'border-[#9bb0c0]',
  },
  npc: {
    labelBg: 'bg-[#d1ccc7]',
    labelText: 'text-[#4a4744]',
    dot: 'bg-[#8a8580]',
    border: 'border-[#b8b2ac]',
  },
  拉: {
    labelBg: 'bg-[#d6b8b8]',
    labelText: 'text-[#5a3131]',
    dot: 'bg-[#9b6b6b]',
    border: 'border-[#c49a9a]',
  },
  未评: {
    labelBg: 'bg-[#e8e4e1]',
    labelText: 'text-[#6b6763]',
    dot: 'bg-[#9e9a96]',
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
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium tracking-wide text-[var(--muted)]">发布时期</span>
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

/** Single anime thumbnail with hover tooltip trigger */
function AnimeThumb({
  anime,
  onEnter,
  onMove,
  onLeave,
  onClick,
}: {
  anime: Anime
  onEnter: (el: HTMLElement, anime: Anime) => void
  onMove: (el: HTMLElement) => void
  onLeave: () => void
  onClick: (anime: Anime) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onClick(anime)}
      onMouseEnter={() => ref.current && onEnter(ref.current, anime)}
      onMouseMove={() => ref.current && onMove(ref.current)}
      onMouseLeave={onLeave}
      className="group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-sm transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:z-10 sm:h-24 sm:w-24"
      aria-label={`${anime.title}，${anime.tier}`}
    >
      <CoverArt seed={anime.id} title={anime.title} image={anime.cover} />
      {anime.dropped && (
        <span className="absolute left-1 top-1 rounded bg-[var(--ink)]/70 px-1 py-0.5 text-[10px] text-[var(--bg)]">
          已弃
        </span>
      )}
    </button>
  )
}

/** Floating hover popover rendered via portal */
function AnimePopover({ anime, targetEl, onClose }: { anime: Anime; targetEl: HTMLElement; onClose: () => void }) {
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const theme = tierTheme[anime.tier]

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const rect = targetEl.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const margin = 12

    let left = rect.left + rect.width / 2 - cardRect.width / 2
    let top = rect.top - cardRect.height - margin

    // keep inside viewport horizontally
    if (left < margin) left = margin
    if (left + cardRect.width > window.innerWidth - margin) {
      left = window.innerWidth - cardRect.width - margin
    }
    // if no room above, place below
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
              <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
              {tierDisplay(anime.tier)}
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

/** Detail modal for click / mobile interaction */
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

  const theme = tierTheme[anime.tier]
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
          <div className="h-28 w-22 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--line)] sm:h-36 sm:w-28">
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
                {tierDisplay(anime.tier)}
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
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        我的个人评级梯队：
        <span className="font-medium text-[#b07d62]">夯</span> ＞
        <span className="font-medium text-[#7d6a91]"> 顶级</span> ＞
        <span className="font-medium text-[#5e7d91]"> 人上人</span> ＞
        <span className="font-medium text-[#8a8580]"> NPC</span> ＞
        <span className="font-medium text-[#9b6b6b]"> 拉</span>
        。悬停封面查看剧评，点击打开完整卡片。
      </p>

      <SeasonFilter seasons={seasons} value={filterSeason} onChange={setFilterSeason} />

      <div className="space-y-5">
        {visibleTiers.map((tier) => {
          const theme = tierTheme[tier]
          return (
            <div
              key={tier}
              className="flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-4"
            >
              {/* Tier label */}
              <div
                className={`flex w-10 flex-shrink-0 flex-col items-center justify-center rounded-xl ${theme.labelBg} ${theme.labelText} sm:w-12`}
              >
                <span className="text-lg font-bold leading-none sm:text-xl">{tierDisplay(tier)}</span>
              </div>

              {/* Thumbnails row */}
              <div className="flex flex-1 flex-wrap items-center gap-2 sm:gap-3">
                {grouped[tier].map((anime) => (
                  <AnimeThumb
                    key={anime.id}
                    anime={anime}
                    onEnter={(el, a) => setHovered({ anime: a, el })}
                    onMove={(el) => setHovered((prev) => (prev && prev.anime.id === anime.id ? { anime, el } : prev))}
                    onLeave={() => setHovered(null)}
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
