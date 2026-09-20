import { Link } from 'react-router-dom'

function getStatus(score, busFactorRisk) {
  if (busFactorRisk === 'High' || score < 50) return { label: 'At Risk', color: 'bg-red-500' }
  if (busFactorRisk === 'Medium' || score < 70) return { label: 'Needs Help', color: 'bg-yellow-500' }
  return { label: 'Healthy', color: 'bg-sage' }
}

export default function ProjectCard({ project }) {
  const status = getStatus(project.priorityScore, project.busFactorRisk)

  return (
    <Link
      to={`/project/${project.id}`}
      className="block bg-slate text-white rounded-lg p-5 hover:bg-teal transition-colors relative"
    >
      <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded ${status.color} text-ink`}>
        {status.label}
      </span>
      <h3 className="font-semibold text-lg pr-20">{project.name}</h3>
      <p className="text-sm text-white/80 mt-1">{project.description}</p>
      <span className="inline-block mt-3 bg-white/10 text-white text-xs font-medium px-2 py-1 rounded">
        Score: {project.priorityScore}
      </span>
    </Link>
  )
}
