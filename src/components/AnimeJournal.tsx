import { useEffect, useMemo, useState } from 'react'
import CoverArt from './CoverArt'
import {
  animeEntries,
  animeTierOrder,
  animeTierScore,
  type AnimeEntry,
  type AnimeTier,
} from '../data/siteData'

/** 各评级梯队的徽章配色 */
const tierStyle: Record<AnimeTier, string> = {
  顶级: 'bg-ink/90 text-bg border-ink/20',
  夯: 'bg-warm-soft text-warm border-warm/40',
  人上人: 'bg-accent-soft text-accent-strong border-accent/30',
  npc: 'bg-line/60 text-muted border-line',
  拉: 'bg-rose/15 text-rose border-rose/40',
  未评: 'bg-transparent text-muted border-dashed border-line',
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={`rounded-full border px-3 py-1 text-xs transition-colors sm:text-sm ${
            value === o
              ? 'border-accent bg-accent-soft font-medium text-accent-strong'
              : 'border-line bg-surface text-muted hover:border-accent/50 hover:text-accent'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export default function AnimeJournal() {
  const seasons = useMemo(
    () => ['全部', ...Array.from(new Set(animeEntries.map((a) => a.season)))] as const,
    [],
  )
  const tiers = useMemo(() => ['全部', ...animeTierOrder] as const, [])
  const statuses = ['全部', '新番', '补番'] as const

  const [season, setSeason] = useState<(typeof seasons)[number]>('全部')
  const [tier, setTier] = useState<(typeof tiers)[number]>('全部')
  const [status, setStatus] = useState<(typeof statuses)[number]>('全部')
  const [selected, setSelected] = useState<AnimeEntry | null>(null)

  const filtered = useMemo(() => {
    return animeEntries
      .filter((a) => season === '全部' || a.season === season)
      .filter((a) => tier === '全部' || a.tier === tier)
      .filter((a) => status === '全部' || a.status === status)
      .sort((x, y) => animeTierScore[y.tier] - animeTierScore[x.tier])
  }, [season, tier, status])

  /* Esc 关闭弹窗 + 锁定背景滚动 */
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <div>
      <p className="mb-5 text-sm text-muted">
        我的个人评级梯队：
        <span className="font-medium text-warm">夯</span> ＞
        <span className="font-medium text-ink"> 顶级</span> ＞
        <span className="font-medium text-accent-strong"> 人上人</span> ＞
        <span className="font-medium text-muted"> npc</span> ＞
        <span className="font-medium text-rose"> 拉</span>
        。点击卡片可查看完整剧评。
      </p>

      <div className="mb-6 space-y-3">
        <FilterGroup label="季度" options={seasons} value={season} onChange={setSeason} />
        <FilterGroup label="评级" options={tiers} value={tier} onChange={setTier} />
        <FilterGroup label="类型" options={statuses} value={status} onChange={setStatus} />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">
          这个筛选组合下暂时没有条目。
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelected(a)}
              className="group overflow-hidden rounded-2xl border border-line bg-surface text-left transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="relative h-36">
                <CoverArt seed={a.id} title={a.title} image={a.cover} />
                <span
                  className={`absolute right-2 top-2 rounded-full border px-2 py-0.5 text-xs font-medium ${tierStyle[a.tier]}`}
                >
                  {a.tier}
                </span>
                {a.dropped && (
                  <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-xs text-bg">
                    已弃
                  </span>
                )}
              </div>
              <div className="p-4">
                <h4 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-accent-strong">
                  {a.title}
                </h4>
                <p className="mt-1 text-xs text-muted">
                  {a.season} · {a.genre} · {a.status}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
                  {a.shortReview}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 剧评详情弹窗 */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} 的完整剧评`}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-line bg-surface p-6 shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold leading-snug">{selected.title}</h4>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  {selected.season} · {selected.genre} · {selected.status}
                  {selected.dropped && ' · 已弃番'}
                </p>
              </div>
              <button
                type="button"
                aria-label="关闭"
                onClick={() => setSelected(null)}
                className="shrink-0 rounded-full border border-line p-1.5 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="3" y1="3" x2="13" y2="13" />
                  <line x1="13" y1="3" x2="3" y2="13" />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-sm font-medium ${tierStyle[selected.tier]}`}>
                {selected.tier}
              </span>
              {selected.tierNote && (
                <span className="text-xs text-muted">（{selected.tierNote}）</span>
              )}
            </div>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink sm:text-base">
              {selected.detail ?? selected.shortReview}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
