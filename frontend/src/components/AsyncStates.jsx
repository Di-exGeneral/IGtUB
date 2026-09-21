// Shared loading / error / empty states for async pages.

export function Loading({ label = 'Loading…' }) {
  return (
    <div className="container-page py-16">
      <div className="flex items-center gap-3 text-teal">
        <span className="inline-block w-5 h-5 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  )
}

export function ErrorMessage({ error, onRetry }) {
  return (
    <div className="container-page py-10">
      <div className="card border-danger/30 p-6 max-w-md">
        <p className="font-display font-semibold text-danger">Something went wrong</p>
        <p className="text-sm text-slate mt-1">{error?.message || 'Could not load data.'}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-ghost text-sm px-3 py-1.5 mt-4">
            Try again
          </button>
        )}
      </div>
    </div>
  )
}

export function EmptyState({ message, action }) {
  return (
    <div className="container-page py-16 text-center">
      <p className="text-slate">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
