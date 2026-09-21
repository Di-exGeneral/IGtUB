import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Showcase', end: true },
  { to: '/abandoned', label: 'Find Abandoned' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/bookmarks', label: 'Bookmarks' },
]

export function Logo({ light = true }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:rotate-6">
        <rect x="3" y="3" width="18" height="18" rx="6" fill="#8FBF9F" />
        <path d="M8 12.5l3 3 5-6" stroke="#151C26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-display font-bold text-lg tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        IGtUB
      </span>
    </Link>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`

  return (
    <header className="sticky top-0 z-40 bg-ink/90 backdrop-blur-md border-b border-white/5">
      {/* Full-bleed nav: logo pinned far left, links pinned far right.
          Deliberately NOT using container-page, which centers content. */}
      <nav className="h-16 flex items-center px-6 md:px-10">
        <Logo />

        {/* Desktop — everything pinned to the right edge */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/add" className="btn-on-dark text-sm px-4 py-2">
            Add Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-white/80 hover:text-white"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-ink px-6 py-5 space-y-4">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `block text-sm ${isActive ? 'text-sage font-medium' : 'text-white/70'}`}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/add" onClick={() => setOpen(false)} className="btn-on-dark text-sm px-4 py-2 w-full">
            Add Project
          </Link>
        </div>
      )}
    </header>
  )
}
