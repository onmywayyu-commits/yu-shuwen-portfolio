import { siteMeta } from '../data/siteData'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-muted sm:flex-row sm:px-6 sm:text-sm">
        <p>
          © {new Date().getFullYear()} {siteMeta.name} · Built with React
        </p>
        <p>最后更新于 {siteMeta.lastUpdated}</p>
      </div>
    </footer>
  )
}
