import { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'

const mockProjects = [
  { id: 1, name: 'Sample Project', description: 'Placeholder until backend is ready', priorityScore: 82, busFactorRisk: 'Low' },
  { id: 2, name: 'Another Project', description: 'Second placeholder card', priorityScore: 45, busFactorRisk: 'High' },
  { id: 3, name: 'Third Project', description: 'Third placeholder card', priorityScore: 64, busFactorRisk: 'Medium' },
]

export default function ShowcaseFeed() {
  const [projects, setProjects] = useState(mockProjects)

  useEffect(() => {
    // fetch('/api/projects').then(res => res.json()).then(setProjects)
  }, [])

  return (
    <div>
      <section className="bg-slate text-white px-6 py-12 text-center">
        <h1 className="text-3xl font-semibold">South African Open Source, Ranked by What Matters</h1>
        <p className="mt-3 text-white/80 max-w-xl mx-auto">
          Discover local projects by real activity and health, then get matched to the ones that need your skills.
        </p>
      </section>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
