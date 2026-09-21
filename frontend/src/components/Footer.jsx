import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60 mt-20">
      <div className="container-page py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="#8FBF9F" />
              <path d="M8 12.5l3 3 5-6" stroke="#151C26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display font-semibold text-white text-lg">IGtUB</span>
          </div>
          <p className="text-sm mt-3 max-w-xs leading-relaxed">
            South African open source, ranked by real project health and matched to
            contributors by genuine skill fit.
          </p>
        </div>

        <div>
          <p className="text-white text-sm font-semibold mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-sage transition-colors">Showcase</Link></li>
            <li><Link to="/abandoned" className="hover:text-sage transition-colors">Find Abandoned</Link></li>
            <li><Link to="/dashboard" className="hover:text-sage transition-colors">Dashboard</Link></li>
            <li><Link to="/add" className="hover:text-sage transition-colors">Add a Project</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-semibold mb-3">Team</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://github.com/Di-exGeneral" target="_blank" rel="noreferrer" className="hover:text-sage transition-colors">
                Tlotliso Ledwaba
              </a>
            </li>
            <li>
              <a href="https://github.com/DE-night-sheperd" target="_blank" rel="noreferrer" className="hover:text-sage transition-colors">
                Excellent Mashego
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Built for South African open source 🇿🇦</span>
          <span>© {new Date().getFullYear()} IGtUB</span>
        </div>
      </div>
    </footer>
  )
}
