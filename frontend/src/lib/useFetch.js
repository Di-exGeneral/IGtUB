import { useEffect, useState } from 'react'

// Small data-fetching hook. Returns { data, loading, error, retry }.
//
// Usage:
//   const { data, loading, error, retry } = useFetch(getProjects)
//   const { data } = useFetch(() => getProject(id), [id])
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  // Go back to "loading" whenever the inputs (deps or retry attempt) change.
  // The reset happens during render, guarded by a key comparison — React's
  // recommended pattern for adjusting state when inputs change. This keeps the
  // effect body free of synchronous setState calls, which cause cascading
  // renders (react-hooks/set-state-in-effect).
  const key = `${JSON.stringify(deps)}|${attempt}`
  const [prevKey, setPrevKey] = useState(key)
  if (key !== prevKey) {
    setPrevKey(key)
    setLoading(true)
    setError(null)
    setData(null)
  }

  useEffect(() => {
    let cancelled = false

    fetcher()
      .then(result => {
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
    // `fetcher` is intentionally excluded from deps: callers pass inline
    // closures that would retrigger the effect every render. `key` covers
    // everything the fetch actually depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return { data, loading, error, retry: () => setAttempt(a => a + 1) }
}
