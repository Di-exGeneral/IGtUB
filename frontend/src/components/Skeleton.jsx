// Shimmering placeholder blocks shown while data loads.

function SkeletonCard() {
  return (
    <div className="card p-5" aria-hidden="true">
      <div className="flex items-start justify-between">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton w-12 h-12 !rounded-full" />
      </div>
      <div className="skeleton h-3.5 w-full mt-4" />
      <div className="skeleton h-3.5 w-4/5 mt-2" />
      <div className="flex items-center justify-between mt-5">
        <div className="skeleton h-6 w-24 !rounded-full" />
        <div className="skeleton h-5 w-16" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="container-page py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}
