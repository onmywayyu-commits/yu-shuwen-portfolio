import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title?: string
  className?: string
  children: ReactNode
}

export default function BentoCard({ eyebrow, title, className = '', children }: Props) {
  return (
    <article className={`bento-card ${className}`}>
      {eyebrow && <p className="bento-eyebrow">{eyebrow}</p>}
      {title && <h2 className="bento-title">{title}</h2>}
      {children}
    </article>
  )
}
