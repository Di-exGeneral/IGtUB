import { useParams } from 'react-router-dom'

const mockProject = {
  id: 1,
  name: 'Sample Project',
  description: 'Placeholder until backend is ready',
  priorityScore: 82,
  commitVelocity: 'High',
  issueResponseTime: '2 days avg',
  busFactorRisk: 'Low',
  contributors: ['dev1', 'dev2', 'dev3'],
  openIssues: ['Fix broken login redirect', 'Add dark mode toggle', 'Improve API error handling'],
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = mockProject // will become fetch('/api/projects/' + id)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-slate text-white rounded-lg p-6">
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <p className="text-white/80 mt-2">{project.description}</p>
        <span className="inline-block mt-4 bg-sage text-ink text-xs font-medium px-3 py-1 rounded-full">
          Priority Score: {project.priorityScore}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white border border-teal/30 rounded-lg p-4">
          <p className="text-xs text-teal font-medium">Commit Velocity</p>
          <p className="text-ink font-semibold mt-1">{project.commitVelocity}</p>
        </div>
        <div className="bg-white border border-teal/30 rounded-lg p-4">
          <p className="text-xs text-teal font-medium">Issue Response Time</p>
          <p className="text-ink font-semibold mt-1">{project.issueResponseTime}</p>
        </div>
        <div className="bg-white border border-teal/30 rounded-lg p-4">
          <p className="text-xs text-teal font-medium">Bus Factor Risk</p>
          <p className="text-ink font-semibold mt-1">{project.busFactorRisk}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-ink mb-2">Contributors</h2>
        <div className="flex flex-wrap gap-2">
          {project.contributors.map(c => (
            <span key={c} className="bg-ink text-white text-xs px-3 py-1 rounded-full">{c}</span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-ink mb-2">Open Issues</h2>
        <ul className="list-disc list-inside text-slate space-y-1">
          {project.openIssues.map(issue => <li key={issue}>{issue}</li>)}
        </ul>
      </div>

      <button className="mt-6 bg-sage text-ink font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity">
        Bookmark this project
      </button>
    </div>
  )
}