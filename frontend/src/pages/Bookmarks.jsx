import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { ErrorMessage, EmptyState } from '../components/AsyncStates'
import { SkeletonGrid } from '../components/Skeleton'
import useFetch from '../lib/useFetch'
import { getBookmarks } from '../lib/api'

export default function Bookmarks() {
  const { data: bookmarks, loading, error, retry } = useFetch(getBookmarks)

  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Your Bookmarks</h1>
          <p className="text-slate mt-2">Projects you've saved to adopt.</p>
        </div>
        <Link to="/" className="btn-ghost text-sm px-4 py-2">+ Browse showcase</Link>
      </div>

      <div className="mt-10">
        {loading ? (
          <SkeletonGrid count={2} />
        ) : error ? (
          <ErrorMessage error={error} onRetry={retry} />
        ) : bookmarks && bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map(p => (
              <div key={p.id} className="relative group">
                <ProjectCard project={p} />
                {!p.synced && (
                  <span className="absolute -top-2.5 -right-2 badge bg-warning text-ink shadow-md">
                    ⏳ Pending sync
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No bookmarks yet — save a project to adopt it later."
            action={<Link to="/" className="btn-primary px-5 py-2.5">Explore projects</Link>}
          />
        )}
      </div>
    </div>
  )
}
