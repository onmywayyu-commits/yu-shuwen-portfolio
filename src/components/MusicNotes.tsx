import { useMemo, useState } from 'react'
import CoverArt from './CoverArt'
import { musicEntries } from '../data/siteData'

/** 唱片 / CD 视觉元素（纯装饰，不影响可读性） */
function Vinyl({ seed, title, cover }: { seed: string; title: string; cover?: string }) {
  return (
    <div className="relative h-24 w-24 shrink-0">
      <div className="absolute inset-0 overflow-hidden rounded-full border border-line shadow-sm">
        <CoverArt seed={seed} title={title} image={cover} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-[30%] rounded-full border border-line bg-surface"
      />
      <div aria-hidden="true" className="absolute inset-[46%] rounded-full bg-line" />
    </div>
  )
}

export default function MusicNotes() {
  const tags = useMemo(
    () => ['全部', ...Array.from(new Set(musicEntries.flatMap((m) => m.tags)))],
    [],
  )
  const [tag, setTag] = useState('全部')

  const picks = musicEntries.filter((m) => m.monthlyPick)
  const filtered = musicEntries.filter((m) => tag === '全部' || m.tags.includes(tag))

  return (
    <div>
      <p className="mb-5 text-sm text-muted">
        音乐推荐与乐评，不是播放器——点链接会跳转到对应的音乐平台。有「本月循环」标记的是近期循环次数最多的歌。
      </p>

      {/* 本月循环 */}
      {picks.length > 0 && (
        <div className="mb-8">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent-strong">
            <span aria-hidden="true" className="inline-block h-2 w-2 animate-pulse rounded-full bg-warm" />
            本月循环
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {picks.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-4 rounded-2xl border border-warm/40 bg-warm-soft/50 p-4"
              >
                <Vinyl seed={m.id} title={m.title} cover={m.cover} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{m.title}</p>
                  <p className="text-xs text-muted">{m.artist}</p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{m.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 标签筛选 */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={`rounded-full border px-3 py-1 text-xs transition-colors sm:text-sm ${
              tag === t
                ? 'border-accent bg-accent-soft font-medium text-accent-strong'
                : 'border-line bg-surface text-muted hover:border-accent/50 hover:text-accent'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((m) => (
          <article
            key={m.id}
            className="rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <Vinyl seed={m.id} title={m.title} cover={m.cover} />
              <div className="min-w-0">
                <h5 className="truncate text-sm font-semibold sm:text-base">{m.title}</h5>
                <p className="text-xs text-muted sm:text-sm">{m.artist}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {m.tags.map((t) => (
                    <span key={t} className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent-strong">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {m.reason && (
              <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">{m.reason}</p>
            )}
            <p className="mt-2 border-l-2 border-warm/50 pl-3 text-xs italic leading-relaxed text-ink sm:text-sm">
              {m.comment}
            </p>
            {m.favoritePart && (
              <div className="mt-3 rounded-xl bg-surface p-3 text-xs leading-relaxed text-muted sm:text-sm">
                <p className="mb-1 font-medium text-ink">喜欢的片段</p>
                <p className="whitespace-pre-line">{m.favoritePart}</p>
              </div>
            )}
            {m.link ? (
              <a
                href={m.link}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs font-medium text-accent underline-offset-4 hover:underline"
              >
                在音乐平台收听 →
              </a>
            ) : (
              <p className="mt-3 text-xs text-muted">平台链接待补充</p>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
