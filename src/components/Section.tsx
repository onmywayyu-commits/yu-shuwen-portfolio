import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
}

/** 统一的板块容器：标题 + 副标题 + 内容 */
export default function Section({ id, title, subtitle, children }: Props) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-muted sm:text-base">{subtitle}</p>}
        <div className="mt-4 h-px w-16 bg-accent" />
      </div>
      {children}
    </section>
  )
}
