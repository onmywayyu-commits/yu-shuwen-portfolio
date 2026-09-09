import { useEffect, useState } from 'react'
import { siteMeta } from '../data/siteData'

const links = [
  { href: '#about', label: '关于我' },
  { href: '#career', label: '实习经历' },
  { href: '#interests', label: '兴趣角落' },
  { href: '#contact', label: '联系方式' },
]

interface Props {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Navbar({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${
        scrolled || open
          ? 'border-line bg-bg/90 backdrop-blur'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="text-base font-semibold tracking-wide">
          {siteMeta.name}
        </a>

        {/* 桌面端导航 */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-accent focus-visible:text-accent"
            >
              {l.label}
            </a>
          ))}
          <ThemeButton theme={theme} onToggle={onToggleTheme} />
        </div>

        {/* 移动端：主题 + 菜单按钮 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeButton theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* 移动端展开菜单 */}
      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-2 sm:px-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-sm text-ink last:border-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function ThemeButton({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
      title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
      className="rounded-full border border-line p-2 text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {theme === 'dark' ? (
        /* 太阳 */
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="10" cy="10" r="3.5" />
          <line x1="10" y1="1.5" x2="10" y2="3.5" />
          <line x1="10" y1="16.5" x2="10" y2="18.5" />
          <line x1="1.5" y1="10" x2="3.5" y2="10" />
          <line x1="16.5" y1="10" x2="18.5" y2="10" />
          <line x1="4" y1="4" x2="5.4" y2="5.4" />
          <line x1="14.6" y1="14.6" x2="16" y2="16" />
          <line x1="16" y1="4" x2="14.6" y2="5.4" />
          <line x1="5.4" y1="14.6" x2="4" y2="16" />
        </svg>
      ) : (
        /* 月亮 */
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M16.5 12.5A7 7 0 0 1 7.5 3.5a7 7 0 1 0 9 9z" />
        </svg>
      )}
    </button>
  )
}
