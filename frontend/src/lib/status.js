// Maps score + bus factor to a health status with semantic color.
// Shared by ProjectCard and ProjectDetail.
export function getStatus(score, busFactorRisk) {
  if (busFactorRisk === 'High' || score < 50) {
    return { label: 'At Risk', className: 'bg-danger/10 text-danger' }
  }
  if (busFactorRisk === 'Medium' || score < 70) {
    return { label: 'Needs Help', className: 'bg-warning/10 text-warning' }
  }
  return { label: 'Healthy', className: 'bg-healthy/10 text-healthy' }
}
