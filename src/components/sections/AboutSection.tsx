import { about } from '../../content/about'

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">关于我</h2>
        <div className="mt-8 grid items-center gap-10 md:grid-cols-[2fr_3fr]">
          <img
            src={about.photo}
            alt={about.photoAlt}
            width={600}
            height={800}
            loading="lazy"
            decoding="async"
            className="mx-auto aspect-[3/4] w-full max-w-xs rounded-2xl object-cover md:justify-self-end md:max-w-none"
          />
          <div className="flex flex-col gap-4">
            {about.bio.map((paragraph, index) => (
              <p
                key={index}
                className="leading-relaxed text-slate-600 break-words dark:text-slate-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        {about.brandTags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {about.brandTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AboutSection
