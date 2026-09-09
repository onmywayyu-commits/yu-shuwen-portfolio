import { useState } from 'react'
import CoverArt from './CoverArt'
import { gameEntries, type GameEntry } from '../data/siteData'

const statusStyle: Record<GameEntry['status'], string> = {
  正在玩: 'bg-sage/15 text-sage border-sage/40',
  已通关: 'bg-accent-soft text-accent-strong border-accent/30',
  搁置: 'bg-line/60 text-muted border-line',
}

function Stars({ n }: { n: number }) {
  const full = Math.floor(n)
  const half = n % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span aria-label={`推荐度 ${n} / 5`} className="text-warm" role="img">
      {'★'.repeat(full)}
      {half && <span className="relative inline-block text-warm">★<span className="absolute inset-0 text-line" style={{ clipPath: 'inset(0 50% 0 0)' }} /></span>}
      <span className="text-line">{'★'.repeat(Math.max(0, empty))}</span>
    </span>
  )
}

export default function GameDiary() {
  const statuses = ['全部', '正在玩', '已通关', '搁置'] as const
  const [status, setStatus] = useState<(typeof statuses)[number]>('全部')

  const filtered = gameEntries.filter((g) => status === '全部' || g.status === status)

  return (
    <div>
      <p className="mb-5 text-sm text-muted">最近在玩的游戏和游玩感想。</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            aria-pressed={status === s}
            className={`rounded-full border px-3 py-1 text-xs transition-colors sm:text-sm ${
              status === s
                ? 'border-accent bg-accent-soft font-medium text-accent-strong'
                : 'border-line bg-surface text-muted hover:border-accent/50 hover:text-accent'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <article
            key={g.id}
            className={`relative overflow-hidden rounded-2xl border bg-surface transition-all hover:-translate-y-0.5 hover:shadow-md ${
              g.highlight ? 'border-warm/50 ring-1 ring-warm/30' : 'border-line'
            }`}
          >
            {g.highlight && (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-warm px-2.5 py-0.5 text-xs font-medium text-white shadow">
                {g.highlight}
              </span>
            )}
            <div className="h-32">
              <CoverArt seed={g.id} title={g.title} image={g.cover} />
            </div>
            <div className="p-4">
              <h5 className="text-sm font-semibold sm:text-base">{g.title}</h5>
              <p className="mt-1 text-xs text-muted">
                {g.platform}
                {g.hours && ` · ${g.hours}`}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className={`rounded-full border px-2 py-0.5 text-xs ${statusStyle[g.status]}`}>
                  {g.status}
                </span>
                <Stars n={g.recommend} />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">{g.comment}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
