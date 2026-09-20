import { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'

const mockAbandoned = [
  { id: 8, name: 'Stalled Project A', description: 'No commits in 6 months', priorityScore: 38, busFactorRisk: 'High' },
  { id: 9, name: 'Stalled Project B', description: 'Single maintainer, inactive', priorityScore: 41, busFactorRisk: 'High' },
]

export default function AbandonedProjects() {
  const [projects, setProjects] = useState(mockAbandoned)

  useEffect(() => {
    // fetch('/api/projects?status=at-risk').then(res => res.json()).then(setProjects)
  }, [])

  return (
    <div>
      <section className="bg-slate text-white px-6 py-10">
        <h1 className="text-2xl font-semibold">Projects That Need You</h1>
        <p className="mt-2 text-white/80">These South African projects show signs of stalling. Your contribution could keep them alive.</p>
      </section>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}