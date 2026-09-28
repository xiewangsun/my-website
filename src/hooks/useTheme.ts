import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const META_THEME_COLOR: Record<Theme, string> = {
  light: '#f8fafc',
  dark: '#020617',
}

// ---- 模块级单一事实源：所有 useTheme() 实例共享同一份主题状态 ----
// 若用组件内 useState，实例间互相隔离：手动切换只更新触发组件自身，
// 消费主题的其他组件（如粒子层按 [theme] 重绘）不会联动（实施期验证发现的缺陷）

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    // 存储不可用（隐私模式/禁用）：视为未选择，跟随系统
    return null
  }
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  // 与 index.html 内联脚本写入的 <html> 类对齐，避免双源不一致
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

let currentTheme = getInitialTheme()
const listeners = new Set<() => void>()

function emitChange(): void {
  for (const listener of listeners) {
    listener()
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', META_THEME_COLOR[theme])
}

function setThemeState(next: Theme): void {
  currentTheme = next
  applyTheme(next)
  emitChange()
}

/** 手动切换：状态 + `<html>` 类 + 通知所有订阅实例，并持久化 */
export function setTheme(next: Theme): void {
  setThemeState(next)
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // 存储不可用：仅当前会话生效，不记忆
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

// 系统偏好监听：模块级注册一次（避免每实例重复挂载）；
// 已有手动选择（存储值存在）则不跟随；跟随系统不写存储——写入会固化为手动选择
if (typeof window !== 'undefined') {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      if (readStoredTheme() !== null) return
      setThemeState(event.matches ? 'dark' : 'light')
    })
}

export function useTheme(): { theme: Theme; setTheme: typeof setTheme } {
  const theme = useSyncExternalStore(
    subscribe,
    () => currentTheme,
    () => currentTheme,
  )
  return { theme, setTheme }
}

export type { Theme }
