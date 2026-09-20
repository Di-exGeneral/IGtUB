import { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'

const mockSkills = ['Python', 'React', 'Docker', 'PostgreSQL']

const mockMatches = [
  { id: 4, name: 'Matched Project A', description: 'Needs a Python backend contributor', priorityScore: 74, busFactorRisk: 'Medium' },
  { id: 5, name: 'Matched Project B', description: 'React frontend help wanted', priorityScore: 61, busFactorRisk: 'Medium' },
]

export default function ContributorDashboard() {
  const [skills, setSkills] = useState(mockSkills)
  const [matches, setMatches] = useState(mockMatches)

  useEffect(() => {
    // fetch('/api/skills').then(res => res.json()).then(setSkills)
    // fetch('/api/matches').then(res => res.json()).then(setMatches)
  }, [])

  return (
    <div>
      <section className="bg-slate text-white px-6 py-10">
        <h1 className="text-2xl font-semibold">Your Matches</h1>
        <p className="mt-2 text-white/80">Based on the skills detected from your GitHub activity.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="bg-sage text-ink text-xs font-medium px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <div className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Projects that need your skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </div>
  )
}
