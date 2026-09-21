import { useState } from 'react'
import { importProject } from '../lib/api'

const GITHUB_REPO_PATTERN = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/

export default function AddProject() {
  const [repoUrl, setRepoUrl] = useState('')
  const [status, setStatus] = useState(null) // null | 'error' | 'submitting' | 'success' | 'failed'

  async function handleSubmit(e) {
    e.preventDefault()
    if (!GITHUB_REPO_PATTERN.test(repoUrl.trim())) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    try {
      await importProject(repoUrl.trim())
      setStatus('success')
    } catch {
      setStatus('failed')
    }
  }

  const submitting = status === 'submitting'

  return (
    <div className="container-page py-14 max-w-4xl">
      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* ---- Explainer panel ---- */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-ink">Add Your Project</h1>
          <p className="text-slate mt-3 leading-relaxed">
            Link a GitHub repository and IGtUB will analyse its real health — commits, issue
            response, and bus factor — then list it where contributors can find it.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate">
            {[
              'Ranked by genuine project health, not stars',
              'Matched to contributors by skill fit',
              'Free to list, forever',
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="#8FBF9F" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#151C26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Form panel ---- */}
        <form onSubmit={handleSubmit} className="md:col-span-3 card p-7 space-y-5 md:sticky md:top-24">
          <div>
            <label htmlFor="repoUrl" className="field-label">GitHub repo URL</label>
            <input
              id="repoUrl"
              type="text"
              value={repoUrl}
              onChange={e => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              disabled={submitting}
              className="field-input"
            />
            {status === 'error' && (
              <p className="text-sm text-danger mt-2">
                Enter a valid GitHub repo URL (https://github.com/user/repo)
              </p>
            )}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
            {submitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                Importing… analysing repo health
              </>
            ) : (
              'Import Project'
            )}
          </button>

          {status === 'success' && (
            <p className="text-sm text-healthy bg-healthy/10 rounded-xl px-4 py-3 font-medium">
              ✓ Project submitted. It will appear once processed.
            </p>
          )}
          {status === 'failed' && (
            <p className="text-sm text-danger bg-danger/10 rounded-xl px-4 py-3 font-medium">
              Import failed. Please try again.
            </p>
          )}

          <p className="text-xs text-slate leading-relaxed">
            We clone and analyse your repository locally to compute its Priority Score. Nothing
            is modified in your repo.
          </p>
        </form>
      </div>
    </div>
  )
}
