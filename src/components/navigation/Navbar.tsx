import { useEffect, useState } from 'react'
import { profile } from '../../content/profile'
import ThemeToggle from '../theme/ThemeToggle'

const SCROLL_THRESHOLD = 8

const NAV_LINKS = [
  { href: '#home', label: '首页' },
  { href: '#projects', label: '项目' },
  { href: '#about', label: '关于我' },
  { href: '#contact', label: '联系我' },
] as const

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    // 初始同步一次：页面以 hash 直达或恢复滚动位置打开时状态正确
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled
          ? 'border-b border-slate-200/60 bg-white/70 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/70'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="主导航"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6"
      >
        <a
          href="#home"
          className="hidden text-lg font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 md:inline dark:text-white"
        >
          {profile.name}
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:text-slate-300 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
