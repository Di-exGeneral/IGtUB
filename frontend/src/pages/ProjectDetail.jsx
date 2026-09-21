import { useParams, Link } from 'react-router-dom'
import { Loading, ErrorMessage } from '../components/AsyncStates'
import ScoreRing from '../components/ScoreRing'
import { Avatar } from '../components/Avatar'
import useFetch from '../lib/useFetch'
import { getProject } from '../lib/api'

export default function ProjectDetail() {
  const { id } = useParams()
  const { data: project, loading, error, retry } = useFetch(() => getProject(id), [id])

  if (loading) return <Loading label="Loading project…" />
  if (error) return <ErrorMessage error={error} onRetry={retry} />

  return (
    <div className="pb-10">
      {/* ---- Dark header panel ---- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate via-ink to-ink" />
        <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-sage/15 blur-3xl" />

        <div className="container-page relative py-12 md:py-16">
          <Link to="/" className="text-white/50 hover:text-white/80 text-sm transition-colors">
            ← Back to showcase
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-8 mt-6 animate-fade-up">
            <ScoreRing score={project.priorityScore} size={120} textColor="#FFFFFF" />

            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold">{project.name}</h1>
                {project.archived && <span className="badge bg-white/10 text-white/70">Archived</span>}
              </div>
              <p className="text-white/70 mt-3 max-w-2xl leading-relaxed">{project.description}</p>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sage hover:text-white text-sm font-medium transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                {project.repoUrl.replace('https://github.com/', '')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page max-w-4xl">
        {/* ---- Health stats ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 -mt-0 mt-8">
          {[
            { label: 'Commit Velocity', value: project.commitVelocity },
            { label: 'Issue Response Time', value: project.issueResponseTime },
            { label: 'Bus Factor Risk', value: project.busFactorRisk },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <p className="stat-label">{s.label}</p>
              <p className="font-display font-semibold text-ink text-lg mt-1.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* ---- Contributors ---- */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-ink mb-4">
            Contributors
            <span className="ml-2 text-sm font-normal text-slate">({project.contributors.length})</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.contributors.map(c => (
              <div key={c} className="card flex items-center gap-3 px-4 py-2.5">
                <Avatar name={c} size="sm" />
                <span className="text-sm font-medium text-ink">{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Open issues ---- */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-ink mb-4">
            Open Issues
            <span className="ml-2 text-sm font-normal text-slate">({project.openIssues.length})</span>
          </h2>
          {project.openIssues.length === 0 ? (
            <p className="text-slate text-sm">No open issues.</p>
          ) : (
            <div className="space-y-3">
              {project.openIssues.map(issue => (
                <div key={issue} className="card px-5 py-4 flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="#D9A441" className="mt-0.5 shrink-0" aria-hidden="true">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                  </svg>
                  <span className="text-sm text-ink leading-relaxed">{issue}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---- Actions ---- */}
        <div className="flex items-center gap-4 mt-12">
          <button className="btn-primary px-6 py-3">🔖 Bookmark this project</button>
          <span className="text-xs text-slate">Works offline — syncs when you're back online</span>
        </div>
      </div>
    </div>
  )
}
