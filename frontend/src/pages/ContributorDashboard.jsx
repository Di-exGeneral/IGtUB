import ProjectCard from '../components/ProjectCard'
import { ErrorMessage, EmptyState } from '../components/AsyncStates'
import { SkeletonGrid } from '../components/Skeleton'
import useFetch from '../lib/useFetch'
import { getSkills, getMatches } from '../lib/api'

export default function ContributorDashboard() {
  const skillsState = useFetch(getSkills)
  const matchesState = useFetch(getMatches)

  const skills = skillsState.data || []
  const matches = matchesState.data || []

  return (
    <div>
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate via-ink to-ink" />
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-healthy/20 blur-3xl animate-float-slow" />

        <div className="container-page relative py-14 md:py-18">
          <div className="animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-bold">Your Matches</h1>
            <p className="mt-3 text-white/70 max-w-xl leading-relaxed">
              Based on the skills detected from your GitHub activity.
            </p>

            {skillsState.loading ? (
              <div className="mt-6 flex gap-2">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="skeleton h-8 w-20 !rounded-full" />
                ))}
              </div>
            ) : skillsState.error ? (
              <p className="mt-5 text-[#F0A08C] text-sm">{skillsState.error.message}</p>
            ) : (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="chip bg-sage text-ink font-semibold shadow-[0_2px_10px_rgba(143,191,159,0.3)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---- Matches ---- */}
      <div className="container-page py-14">
        <h2 className="text-2xl font-bold text-ink mb-2">Projects that need your skills</h2>
        <p className="text-slate mb-8">Open issues matched to what you already know.</p>

        {matchesState.loading ? (
          <SkeletonGrid count={2} />
        ) : matchesState.error ? (
          <ErrorMessage error={matchesState.error} onRetry={matchesState.retry} />
        ) : matches.length === 0 ? (
          <EmptyState message="No matches yet — connect your GitHub to get suggestions." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((p, i) => (
              <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
