import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="bg-ink text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="font-semibold text-lg">IGtUB</Link>
      <div className="flex gap-6 text-sm items-center">
        <Link to="/" className="hover:text-sage transition-colors">Showcase</Link>
        <Link to="/abandoned" className="hover:text-sage transition-colors">Find Abandoned</Link>
        <Link to="/dashboard" className="hover:text-sage transition-colors">Dashboard</Link>
        <Link to="/bookmarks" className="hover:text-sage transition-colors">Bookmarks</Link>
        <Link to="/add" className="bg-sage text-ink font-medium px-3 py-1.5 rounded hover:opacity-90 transition-opacity">
          Add Project
        </Link>
      </div>
    </nav>
  )
}
