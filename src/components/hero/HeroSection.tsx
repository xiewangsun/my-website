import { profile } from '../../content/profile'
import ParticleBackground from './ParticleBackground'

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen min-h-svh scroll-mt-20 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      {/* L1 渐变底色层（静态；Phase 3 将在此之上叠加粒子层） */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -z-20 h-[36rem] w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/15"
      />

      {/* L2 粒子层（静态绘制，可替换插槽） */}
      <ParticleBackground />

      {/* L3 内容层 */}
      <div className="z-10 flex max-w-3xl flex-col items-center gap-6">
        <h1 className="text-balance text-5xl font-bold tracking-tight text-slate-900 break-words sm:text-6xl dark:text-white">
          {profile.name}
        </h1>
        <p className="text-lg font-medium tracking-wide text-indigo-600 dark:text-indigo-300">
          {profile.role}
        </p>
        <p className="text-balance text-xl leading-relaxed text-slate-600 break-words dark:text-slate-300">
          {profile.tagline}
        </p>
        <a
          href="#projects"
          className="mt-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          查看我的项目
        </a>
      </div>
    </section>
  )
}

export default HeroSection
