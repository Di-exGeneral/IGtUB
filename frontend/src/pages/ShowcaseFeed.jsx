import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { ErrorMessage, EmptyState } from '../components/AsyncStates'
import { SkeletonGrid } from '../components/Skeleton'
import useFetch from '../lib/useFetch'
import { getProjects, getAbandonedProjects } from '../lib/api'

export default function ShowcaseFeed() {
  const { data: projects, loading, error, retry } = useFetch(getProjects)
  const { data: atRisk } = useFetch(getAbandonedProjects)

  const projectCount = projects?.length ?? 0
  const atRiskCount = atRisk?.length ?? 0
  const healthyCount = projects?.filter(p => p.status === 'Healthy').length ?? 0

  return (
    <div>
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate via-ink to-ink" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sage/20 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-teal/25 blur-3xl" />

        <div className="container-page relative py-20 md:py-28">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
              South African Open Source,
              <br />
              <span className="text-gradient">Ranked by What Matters</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Stars don't keep projects alive. Discover local projects by real activity and
              health, then get matched to the ones that need your exact skills.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/abandoned" className="btn-on-dark px-6 py-3">
                Find projects to save
              </Link>
              <Link to="/add" className="btn-outline-dark px-6 py-3">
                List your project
              </Link>
            </div>
          </div>

          {/* Stat strip */}
          <div className="relative mt-14 grid grid-cols-3 max-w-lg gap-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
            {[
              { value: projectCount, label: 'Projects listed' },
              { value: healthyCount, label: 'Healthy right now' },
              { value: atRiskCount, label: 'Need contributors' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 backdrop-blur-sm">
                <p className="font-display text-2xl md:text-3xl font-bold text-sage">{s.value}</p>
                <p className="text-white/60 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Grid ---- */}
      {loading ? (
        <SkeletonGrid count={6} />
      ) : error ? (
        <ErrorMessage error={error} onRetry={retry} />
      ) : projects && projects.length > 0 ? (
        <div className="container-page py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-ink">Project Showcase</h2>
              <p className="text-slate mt-1">Ranked by Project Priority Score — not stars.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState message="No projects listed yet. Be the first to add one!" />
      )}
    </div>
  )
}
