import { projects } from '../../content/projects'
import ProjectCard from './ProjectCard'

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">项目</h2>
        {projects.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
