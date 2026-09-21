// Single API layer for the whole app. Pages import these functions and never
// call fetch directly, so switching between mock data and the real backend is
// purely a config change.
//
// - When VITE_USE_MOCKS is not "false" (the default until the backend is live),
//   every function returns promise-based mock data with artificial latency, so
//   loading/error/empty states behave exactly as they will in production.
// - When VITE_USE_MOCKS=false, requests go to VITE_API_URL (or the dev proxy —
//   see vite.config.js — if the base URL is empty).
//
// The exported functions below double as the backend contract spec.

import { mockProjects, mockBookmarks, mockSkills, mockMatches } from './mockData'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'
const API_BASE = import.meta.env.VITE_API_URL || ''

const MOCK_LATENCY_MS = 400
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`API ${res.status} on ${path}: ${body || res.statusText}`)
  }
  return res.status === 204 ? null : res.json()
}

// ---- Projects ----

// GET /api/projects — full Project[]
export function getProjects() {
  if (USE_MOCKS) return delay(MOCK_LATENCY_MS).then(() => mockProjects)
  return request('/api/projects')
}

// GET /api/projects/:id — single Project, 404 if unknown id
export function getProject(id) {
  if (USE_MOCKS) {
    return delay(MOCK_LATENCY_MS).then(() => {
      const project = mockProjects.find(p => p.id === Number(id))
      if (!project) throw new Error(`Project ${id} not found`)
      return project
    })
  }
  return request(`/api/projects/${id}`)
}

// GET /api/projects?status=at-risk — abandoned / at-risk listing (Project[])
export function getAbandonedProjects() {
  if (USE_MOCKS) {
    return delay(MOCK_LATENCY_MS).then(() =>
      mockProjects.filter(p => !p.archived && (p.busFactorRisk === 'High' || p.priorityScore < 50))
    )
  }
  return request('/api/projects?status=at-risk')
}

// ---- Bookmarks ----

// GET /api/bookmarks — Project[] plus a temporary `synced` flag (see mockData)
export function getBookmarks() {
  if (USE_MOCKS) return delay(MOCK_LATENCY_MS).then(() => mockBookmarks)
  return request('/api/bookmarks')
}

// ---- Contributor matching ----

// GET /api/skills — skills detected from the contributor's GitHub history (string[])
export function getSkills() {
  if (USE_MOCKS) return delay(MOCK_LATENCY_MS).then(() => mockSkills)
  return request('/api/skills')
}

// GET /api/matches — projects matched to the contributor's skills (Project[])
export function getMatches() {
  if (USE_MOCKS) return delay(MOCK_LATENCY_MS).then(() => mockMatches)
  return request('/api/matches')
}

// ---- Import ----

// POST /api/projects/import { repoUrl } — import is slow (clone + git analysis),
// so callers should show a submitting state and later poll or stream progress.
export function importProject(repoUrl) {
  if (USE_MOCKS) return delay(1200).then(() => ({ ok: true, repoUrl }))
  return request('/api/projects/import', {
    method: 'POST',
    body: JSON.stringify({ repoUrl }),
  })
}
