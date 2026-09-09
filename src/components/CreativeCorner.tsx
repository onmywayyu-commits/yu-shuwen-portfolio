import { creativeEntries } from '../data/siteData'

const kindStyle: Record<string, string> = {
  手作: 'bg-warm-soft text-warm',
  拼豆: 'bg-warm-soft text-warm',
  吉他: 'bg-accent-soft text-accent-strong',
  唱歌: 'bg-rose/15 text-rose',
}

export default function CreativeCorner() {
  return (
    <div>
      <p className="mb-5 text-sm text-muted">手工作品、吉他练习与翻唱记录。图片与视频链接都可以在数据文件里替换。</p>

      {/* CSS columns 实现瀑布流，移动端自动单列 */}
      <div className="masonry columns-1 sm:columns-2 lg:columns-3">
        {creativeEntries.map((c) => (
          <article
            key={c.id}
            className="group mb-5 overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* 图片区域：无图时用占位块，高度错落形成瀑布流节奏 */}
            {c.image ? (
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="w-full object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className={`flex items-center justify-center bg-accent-soft/60 text-accent ${
                  c.placeholderSize === 'tall' ? 'h-56' : 'h-32'
                }`}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
            )}

            {/* 说明常驻显示（不依赖 hover，移动端友好），hover 时卡片整体强调 */}
            <div className="p-4 transition-colors group-hover:bg-accent-soft/30">
              <div className="flex items-center justify-between gap-2">
                <h5 className="text-sm font-semibold sm:text-base">{c.title}</h5>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${kindStyle[c.kind] || 'bg-line/50 text-muted'}`}>
                  {c.kind}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">{c.date}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{c.description}</p>
              {c.link ? (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs font-medium text-accent underline-offset-4 hover:underline"
                >
                  {c.linkLabel ?? '查看作品'} →
                </a>
              ) : (
                c.linkLabel && <p className="mt-2 text-xs text-muted">{c.linkLabel}（待补充）</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
