import { useState } from 'react'
import Section from './Section'
import { experiences, type Experience } from '../data/siteData'

function TimelineItem({ exp, defaultOpen }: { exp: Experience; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `exp-panel-${exp.id}`

  return (
    <li className="relative pl-8 sm:pl-10">
      {/* 时间轴节点与竖线 */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 ${
          exp.kind === '创业' ? 'border-warm bg-warm-soft' : 'border-accent bg-accent-soft'
        }`}
      />
      <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-6 w-px bg-line" />

      <div className="rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold sm:text-lg">
              {exp.company}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 align-middle text-xs ${
                  exp.kind === '创业'
                    ? 'bg-warm-soft text-warm'
                    : 'bg-accent-soft text-accent-strong'
                }`}
              >
                {exp.kind}
              </span>
            </h3>
            <p className="mt-1 text-sm text-muted">{exp.role}</p>
          </div>
          <p className="shrink-0 text-sm tabular-nums text-muted">{exp.period}</p>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">{exp.summary}</p>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
        >
          {open ? '收起详情' : '展开详情'}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <polyline points="3 6 8 11 13 6" />
          </svg>
        </button>

        {open && (
          <div id={panelId} className="mt-4 border-t border-line pt-4">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              {exp.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {exp.tags.map((t) => (
                <span key={t} className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-accent-strong">
                  {t}
                </span>
              ))}
            </div>
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline"
              >
                查看项目 / 作品 →
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default function Career() {
  return (
    <Section
      id="career"
      title="实习与经历"
      subtitle="从券商固收、投行到信用评级与行业研究，再到一次真实的创业实践。"
    >
      <ol className="space-y-6">
        {experiences.map((e, i) => (
          <TimelineItem key={e.id} exp={e} defaultOpen={i === 0} />
        ))}
      </ol>
    </Section>
  )
}
