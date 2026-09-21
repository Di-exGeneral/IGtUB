import { Link } from 'react-router-dom'
import { getStatus } from '../lib/status'
import ScoreRing from './ScoreRing'
import { AvatarStack } from './Avatar'

export default function ProjectCard({ project }) {
  const status = getStatus(project.priorityScore, project.busFactorRisk)
  const ringStatus = status.label === 'At Risk' ? 'danger' : status.label === 'Needs Help' ? 'warning' : 'healthy'

  return (
    <Link to={`/project/${project.id}`} className="card-link group">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-ink leading-snug group-hover:text-teal transition-colors">
              {project.name}
            </h3>
            {project.archived && (
              <span className="badge bg-slate/10 text-slate">Archived</span>
            )}
          </div>
          <p className="text-sm text-slate mt-1.5 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
        <ScoreRing score={project.priorityScore} status={ringStatus} size={52} />
      </div>

      <div className="flex items-center justify-between mt-5">
        <AvatarStack names={project.contributors} />
        <span className={`badge ${status.className}`}>{status.label}</span>
      </div>
    </Link>
  )
}
