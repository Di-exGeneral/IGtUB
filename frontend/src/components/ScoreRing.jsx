// SVG donut gauge showing a project's priority score out of 100,
// colored by health status.

const STATUS_COLORS = {
  healthy: '#4C9A6A',
  warning: '#D9A441',
  danger: '#C4553B',
}

export default function ScoreRing({ score, status = 'healthy', size = 48, textColor = '#151C26' }) {
  const stroke = Math.max(4, size * 0.11)
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(score, 100))
  const offset = c * (1 - clamped / 100)
  const color = STATUS_COLORS[status] || STATUS_COLORS.healthy

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0" role="img" aria-label={`Priority score ${score} out of 100`}>
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(63,108,119,0.15)" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
        fill={textColor}
        fontSize={size * 0.3} fontWeight="700"
        fontFamily="Sora, Inter, sans-serif"
      >
        {score}
      </text>
    </svg>
  )
}
