import ProjectCard from '../components/ProjectCard'
import { ErrorMessage, EmptyState } from '../components/AsyncStates'
import { SkeletonGrid } from '../components/Skeleton'
import useFetch from '../lib/useFetch'
import { getAbandonedProjects } from '../lib/api'

export default function AbandonedProjects() {
  const { data: projects, loading, error, retry } = useFetch(getAbandonedProjects)

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3A2A22] via-ink to-ink" />
        <div className="absolute -top-20 right-10 w-80 h-80 rounded-full bg-danger/20 blur-3xl animate-float-slow" />

        <div className="container-page relative py-16 md:py-20">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Projects That <span className="text-gradient">Need You</span>
            </h1>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              These South African projects show signs of stalling — slow commits, unanswered
              issues, or a single overloaded maintainer. Your contribution could keep them alive.
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <SkeletonGrid count={3} />
      ) : error ? (
        <ErrorMessage error={error} onRetry={retry} />
      ) : projects && projects.length > 0 ? (
        <div className="container-page py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No projects currently flagged as at risk. 🎉" />
      )}
    </div>
  )
}
