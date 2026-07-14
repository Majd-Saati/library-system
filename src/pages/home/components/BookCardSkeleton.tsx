export function BookCardSkeleton() {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_12px_30px_-18px_rgba(27,79,114,0.45)] ring-1 ring-border dark:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55)]"
      aria-hidden="true"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-brand-light">
        <div className="absolute inset-0 animate-pulse bg-linear-to-br from-brand-light via-surface to-brand-light" />
        <div className="absolute start-3 top-3 h-6 w-16 animate-pulse rounded-full bg-surface/80" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-4/5 animate-pulse rounded-md bg-brand-light" />
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-brand-light/80" />
          <div className="mt-3 h-7 w-20 animate-pulse rounded-md bg-accent-light" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 animate-pulse rounded-xl bg-accent-light" />
          <div className="h-10 animate-pulse rounded-xl bg-brand-light" />
        </div>
      </div>
    </article>
  )
}

interface BookGridSkeletonProps {
  count?: number
}

export function BookGridSkeleton({ count = 8 }: BookGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="status"
      aria-label="Loading books"
    >
      {Array.from({ length: count }, (_, index) => (
        <BookCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading books…</span>
    </div>
  )
}
