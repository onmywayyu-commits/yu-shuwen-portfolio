import { siteMeta } from '../data/siteData'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* 背景抽象图形：克制的几何线条，可用头像图片替换 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <svg
          className="absolute -right-24 top-1/2 h-[560px] w-[560px] -translate-y-1/2 text-line opacity-70 sm:right-0"
          viewBox="0 0 560 560"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="280" cy="280" r="240" strokeWidth="1" />
          <circle cx="280" cy="280" r="170" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="280" cy="280" r="100" strokeWidth="1" />
          <line x1="40" y1="280" x2="520" y2="280" strokeWidth="1" />
          <line x1="280" y1="40" x2="280" y2="520" strokeWidth="1" />
        </svg>
        <div className="absolute right-[12%] top-[30%] hidden h-40 w-40 rounded-full border border-accent/30 bg-accent-soft/60 md:block" />
        <div className="absolute right-[28%] bottom-[22%] hidden h-16 w-16 rounded-2xl border border-warm/40 bg-warm-soft/70 md:block" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-24 pt-32 sm:px-6">
        <p className="mb-4 text-sm font-medium tracking-widest text-accent">
          {siteMeta.taglineEn}
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {siteMeta.name}
        </h1>
        <p className="mt-4 text-lg font-medium text-ink sm:text-xl">{siteMeta.tagline}</p>
        <p className="mt-2 text-sm text-muted sm:text-base">求职方向：{siteMeta.direction}</p>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">{siteMeta.intro}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#career"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            查看履历
          </a>
          <a
            href="#interests"
            className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-lg"
          >
            探索兴趣
          </a>
        </div>
      </div>
    </section>
  )
}
