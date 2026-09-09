import { useState } from 'react'
import Section from './Section'
import { contactLinks, contactMessage, siteMeta } from '../data/siteData'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteMeta.email)
    } catch {
      /* 剪贴板 API 不可用时的兜底 */
      const ta = document.createElement('textarea')
      ta.value = siteMeta.email
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Section id="contact" title="联系方式" subtitle="欢迎交流——无论是工作机会，还是同好唠嗑。">
      <p className="mb-8 max-w-2xl leading-relaxed text-muted">{contactMessage}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 邮箱卡片：带复制按钮 */}
        <div className="rounded-2xl border border-accent/30 bg-accent-soft/40 p-5">
          <p className="text-xs font-medium text-muted">邮箱</p>
          <p className="mt-1 break-all text-sm font-semibold text-accent-strong">{siteMeta.email}</p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href={`mailto:${siteMeta.email}`}
              className="text-xs font-medium text-accent underline-offset-4 hover:underline"
            >
              直接写信 →
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent-strong transition-colors hover:bg-accent hover:text-white"
            >
              {copied ? '已复制 ✓' : '复制邮箱'}
            </button>
          </div>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? '邮箱地址已复制到剪贴板' : ''}
          </span>
        </div>

        {contactLinks
          .filter((c) => c.label !== '邮箱')
          .map((c) =>
            c.url ? (
              <a
                key={c.label}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <p className="text-xs font-medium text-muted">{c.label}</p>
                <p className="mt-1 break-all text-sm font-semibold text-ink">{c.value}</p>
                {c.note && <p className="mt-1 text-xs text-muted">{c.note}</p>}
              </a>
            ) : (
              <div key={c.label} className="rounded-2xl border border-dashed border-line bg-surface/60 p-5">
                <p className="text-xs font-medium text-muted">{c.label}</p>
                <p className="mt-1 text-sm font-semibold text-muted">{c.value}</p>
                {c.note && <p className="mt-1 text-xs text-muted">{c.note}</p>}
              </div>
            ),
          )}
      </div>
    </Section>
  )
}
