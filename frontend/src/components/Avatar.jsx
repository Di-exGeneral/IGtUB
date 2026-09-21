// Initials avatars with deterministic gradients derived from the username.

const GRADIENTS = [
  'from-sage to-teal',
  'from-teal to-slate',
  'from-healthy to-sage',
  'from-warning to-danger',
  'from-slate to-teal',
  'from-teal to-ink',
]

function hash(str) {
  let h = 0
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

export function Avatar({ name, size = 'md' }) {
  const gradient = GRADIENTS[hash(name) % GRADIENTS.length]
  const dims = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-10 h-10 text-xs'
  return (
    <span
      title={name}
      className={`${dims} inline-flex items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white font-semibold ring-2 ring-white shrink-0`}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  )
}

export function AvatarStack({ names = [], max = 4, size = 'sm' }) {
  const shown = names.slice(0, max)
  const rest = names.length - shown.length
  return (
    <div className="flex -space-x-2">
      {shown.map(n => <Avatar key={n} name={n} size={size} />)}
      {rest > 0 && (
        <span className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-teal/15 text-teal text-[10px] font-semibold ring-2 ring-white">
          +{rest}
        </span>
      )}
    </div>
  )
}
