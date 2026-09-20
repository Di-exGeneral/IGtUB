import { useState } from 'react'

export default function AddProject() {
  const [repoUrl, setRepoUrl] = useState('')
  const [status, setStatus] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!repoUrl.trim()) {
      setStatus('error')
      return
    }
    // fetch('/api/projects/import', { method: 'POST', body: JSON.stringify({ repoUrl }) })
    setStatus('success')
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-ink mb-2">Add Your Project</h1>
      <p className="text-teal mb-6">Link a GitHub repository to list it on IGtUB.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">GitHub repo URL</label>
          <input
            type="text"
            value={repoUrl}
            onChange={e => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full border border-teal/40 rounded px-3 py-2 text-ink"
          />
          {status === 'error' && (
            <p className="text-sm text-red-600 mt-1">Enter a repo URL first</p>
          )}
        </div>

        <button type="submit" className="bg-sage text-ink font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity">
          Import Project
        </button>

        {status === 'success' && (
          <p className="text-sm text-teal">Project submitted. It will appear once processed.</p>
        )}
      </form>
    </div>
  )
}