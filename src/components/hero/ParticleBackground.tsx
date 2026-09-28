import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'

interface Particle {
  x: number
  y: number
  radius: number
}

const MAX_DPR = 2
const RESIZE_DEBOUNCE_MS = 150
const LINK_DISTANCE = 130

/** 粒子数量随视口面积缩放，下限 24 / 上限 90 */
function particleCount(width: number, height: number): number {
  return Math.min(90, Math.max(24, Math.round((width * height) / 14000)))
}

/** 检测 Canvas 2D 是否可用；不可用则整个组件不渲染（渐变底仍在） */
function isCanvasSupported(): boolean {
  try {
    return !!document.createElement('canvas').getContext('2d')
  } catch {
    return false
  }
}

/** 一次性静态绘制：星点 + 邻近连线，颜色从 CSS 自定义属性读取（配色只定义在 index.css） */
function draw(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  const styles = getComputedStyle(document.documentElement)
  const dotColor = styles.getPropertyValue('--particle-dot-color').trim()
  const lineColor = styles.getPropertyValue('--particle-line-color').trim()
  if (!dotColor || !lineColor) return

  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)

  const particles: Particle[] = Array.from(
    { length: particleCount(width, height) },
    () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 1.6,
    }),
  )

  // 邻近连线，随距离渐隐
  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const distance = Math.hypot(
        particles[i].x - particles[j].x,
        particles[i].y - particles[j].y,
      )
      if (distance < LINK_DISTANCE) {
        ctx.globalAlpha = 1 - distance / LINK_DISTANCE
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
  ctx.globalAlpha = 1

  // 星点
  ctx.fillStyle = dotColor
  for (const particle of particles) {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  // Canvas 不支持时返回 null（spec 异常场景：渐变底兜底）
  const [supported] = useState(isCanvasSupported)

  useEffect(() => {
    if (!supported) return
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const render = () => {
      const rect = parent.getBoundingClientRect()
      draw(canvas, ctx, rect.width, rect.height)
    }

    render()

    // resize / 转屏：debounce 150ms 后整层重绘
    let timer: number | undefined
    const onResize = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(render, RESIZE_DEBOUNCE_MS)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
    // theme 变化：以新配色同步重绘（.dark 类此时已切换，CSS 变量已是新值）
  }, [theme, supported])

  if (!supported) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 h-full w-full"
    />
  )
}

export default ParticleBackground
