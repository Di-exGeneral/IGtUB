import { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'

const mockBookmarks = [
  { id: 6, name: 'Bookmarked Project A', description: 'Saved for later', priorityScore: 70, busFactorRisk: 'Low', synced: true },
  { id: 7, name: 'Bookmarked Project B', description: 'Saved while offline', priorityScore: 58, busFactorRisk: 'Medium', synced: false },
]

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(mockBookmarks)

  useEffect(() => {
    // fetch('/api/bookmarks').then(res => res.json()).then(setBookmarks)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-ink mb-1">Your Bookmarks</h1>
      <p className="text-teal mb-6">Projects you've saved to adopt.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.map(p => (
          <div key={p.id} className="relative">
            <ProjectCard project={p} />
            {!p.synced && (
              <span className="absolute top-2 right-2 bg-white/90 text-ink text-xs font-medium px-2 py-1 rounded">
                Pending sync
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
