// Central mock dataset used by the API layer when VITE_USE_MOCKS is true.
//
// Shape follows the agreed Project contract:
// {
//   id: number
//   name: string
//   description: string
//   repoUrl: string                  // GitHub repo link
//   priorityScore: number            // 0–100
//   commitVelocity: 'High' | 'Medium' | 'Low'
//   issueResponseTime: string        // e.g. "2 days avg"
//   busFactorRisk: 'High' | 'Medium' | 'Low'
//   archived: boolean                // from GitHub; excluded from risk classification if true
//   contributors: string[]           // GitHub usernames
//   openIssues: string[]             // issue titles (may become objects with ids later)
//   status: 'Healthy' | 'Needs Help' | 'At Risk'
// }

export const mockProjects = [
  {
    id: 1,
    name: 'ZamaPay',
    description: 'Mobile money reconciliation toolkit for township spaza shops.',
    repoUrl: 'https://github.com/zama-codes/zamapay',
    priorityScore: 82,
    commitVelocity: 'High',
    issueResponseTime: '1 day avg',
    busFactorRisk: 'Low',
    archived: false,
    contributors: ['thabo-dev', 'zama-codes', 'lerato-oss'],
    openIssues: ['Fix broken login redirect', 'Add dark mode toggle', 'Improve API error handling'],
    status: 'Healthy',
  },
  {
    id: 2,
    name: 'Kasi Courier',
    description: 'Last-mile delivery routing for informal settlement addresses.',
    repoUrl: 'https://github.com/thabo-dev/kasi-courier',
    priorityScore: 45,
    commitVelocity: 'Low',
    issueResponseTime: '3 weeks avg',
    busFactorRisk: 'High',
    archived: false,
    contributors: ['thabo-dev'],
    openIssues: ['Offline map caching', 'Reduce bundle size', 'Add delivery ETA estimates', 'Migrate to new maps API'],
    status: 'At Risk',
  },
  {
    id: 3,
    name: 'Siyavula Learn',
    description: 'Open maths practice engine aligned to the CAPS curriculum.',
    repoUrl: 'https://github.com/lerato-oss/siyavula-learn',
    priorityScore: 64,
    commitVelocity: 'Medium',
    issueResponseTime: '1 week avg',
    busFactorRisk: 'Medium',
    archived: false,
    contributors: ['lerato-oss', 'sipho-js'],
    openIssues: ['Low-bandwidth quiz mode', 'Translate UI to isiZulu'],
    status: 'Needs Help',
  },
  {
    id: 4,
    name: 'Umzali Weather',
    description: 'Hyperlocal weather alerts from community weather stations.',
    repoUrl: 'https://github.com/sipho-js/umzali-weather',
    priorityScore: 71,
    commitVelocity: 'Medium',
    issueResponseTime: '2 days avg',
    busFactorRisk: 'Low',
    archived: false,
    contributors: ['sipho-js', 'nomvula-r'],
    openIssues: ['Station battery drain fix'],
    status: 'Healthy',
  },
  {
    id: 5,
    name: 'Mzansi Data Portal',
    description: 'Scraper and API for public South African government datasets.',
    repoUrl: 'https://github.com/nomvula-r/mzansi-data-portal',
    priorityScore: 38,
    commitVelocity: 'Low',
    issueResponseTime: '2 months avg',
    busFactorRisk: 'High',
    archived: false,
    contributors: ['nomvula-r'],
    openIssues: ['Scraper blocked by CAPTCHA', 'Postgres migration script fails', 'Add dataset versioning'],
    status: 'At Risk',
  },
  {
    id: 6,
    name: 'Legacy Payroll',
    description: 'Old payroll exporter, superseded and no longer maintained.',
    repoUrl: 'https://github.com/example/legacy-payroll',
    priorityScore: 12,
    commitVelocity: 'Low',
    issueResponseTime: 'n/a',
    busFactorRisk: 'High',
    // Archived on GitHub — should be excluded from at-risk/abandoned classification.
    archived: true,
    contributors: ['example-user'],
    openIssues: [],
    status: 'At Risk',
  },
]

// Bookmarks are Projects plus a temporary `synced` flag.
// NOTE: `synced` is not part of the Project contract — it stands in for the
// offline sync layer until bookmarks are persisted for real.
export const mockBookmarks = [
  { ...mockProjects[2], synced: true },
  { ...mockProjects[4], synced: false },
]

// Skills detected from the signed-in contributor's GitHub history.
export const mockSkills = ['Python', 'React', 'Docker', 'PostgreSQL']

// Matches: projects whose open issues need the detected skills.
export const mockMatches = [mockProjects[0], mockProjects[4]]
