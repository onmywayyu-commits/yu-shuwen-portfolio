import { useEffect, useState } from 'react'
import { siteMeta } from '../data/siteData'
import { resumeUrl } from '../data/siteConfig'

const links = [
  { href: '#home', label: '首页', english: 'Home' },
  { href: '#papers', label: '学术论文', english: 'Papers' },
  { href: '#library', label: '兴趣角落', english: 'Library' },
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

  const closeMenu = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled || open ? 'site-header--solid' : ''}`}>
      <nav className="nav-bar page-width" aria-label="主导航">
        <a href="#home" className="brand-mark" onClick={closeMenu}>
          <span>{siteMeta.name}</span>
          <small>PERSONAL INDEX</small>
        </a>
        <div className="desktop-nav">
          {links.map((link) => <a key={link.href} href={link.href}><span>{link.label}</span><small>{link.english}</small></a>)}
          <a className="resume-nav-link" href={resumeUrl} target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
          <ThemeButton theme={theme} onToggle={onToggleTheme} />
        </div>
        <div className="mobile-actions">
          <ThemeButton theme={theme} onToggle={onToggleTheme} />
          <button type="button" className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? '关闭菜单' : '打开菜单'}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {open && <div id="mobile-nav" className="mobile-nav">
        {links.map((link) => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}<small>{link.english}</small></a>)}
        <a className="resume-nav-link" href={resumeUrl} target="_blank" rel="noreferrer">求职简历 / Resume ↗</a>
      </div>}
    </header>
  )
}

function ThemeButton({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  return <button type="button" className="theme-toggle" onClick={onToggle} aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'} title={theme === 'dark' ? '浅色模式' : '深色模式'}>
    {theme === 'dark' ? '☼' : '☾'}
  </button>
}
