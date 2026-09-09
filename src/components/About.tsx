import Section from './Section'
import { about, siteMeta } from '../data/siteData'

function Tag({ children, tone = 'accent' }: { children: string; tone?: 'accent' | 'warm' }) {
  const cls =
    tone === 'accent'
      ? 'border-accent/25 bg-accent-soft text-accent-strong'
      : 'border-warm/30 bg-warm-soft text-warm'
  return (
    <span className={`rounded-full border px-3 py-1 text-xs sm:text-sm ${cls}`}>{children}</span>
  )
}

export default function About() {
  return (
    <Section id="about" title="关于我" subtitle="一半是数据和研报，一半是动画和音乐。">
      <div className="grid gap-6 md:grid-cols-5">
        {/* 左栏：自我介绍 + 教育经历 */}
        <div className="space-y-6 md:col-span-3">
          <div className="rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-md">
            <h3 className="mb-3 text-base font-semibold">自我介绍</h3>
            <p className="leading-relaxed text-muted">{about.bio}</p>
            <p className="mt-4 text-sm">
              <span className="font-medium text-ink">求职方向：</span>
              <span className="text-accent-strong">{siteMeta.direction}</span>
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-md">
            <h3 className="mb-4 text-base font-semibold">教育经历</h3>
            <div className="space-y-5">
              {about.education.map((e) => (
                <div key={e.school + e.period}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">
                      {e.school}
                      <span className="ml-2 text-sm font-normal text-muted">{e.degree}</span>
                    </p>
                    <p className="text-sm text-muted">{e.period}</p>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右栏：技能 / 工具 / 兴趣 / 在学 */}
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-md">
            <h3 className="mb-3 text-base font-semibold">核心技能</h3>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-md">
            <h3 className="mb-3 text-base font-semibold">常用工具</h3>
            <div className="flex flex-wrap gap-2">
              {about.tools.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-md">
            <h3 className="mb-3 text-base font-semibold">兴趣标签</h3>
            <div className="flex flex-wrap gap-2">
              {about.interestTags.map((t) => (
                <Tag key={t} tone="warm">
                  {t}
                </Tag>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-accent/40 bg-accent-soft/50 p-6">
            <h3 className="mb-3 text-base font-semibold text-accent-strong">目前在学习 / 关注</h3>
            <ul className="space-y-2 text-sm text-muted">
              {about.learning.map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
