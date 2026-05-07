export function CollegeCardSkeleton() {
  return (
    <div className="editorial-card p-0 overflow-hidden">
      <div className="skeleton h-3 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="skeleton h-5 w-24 rounded" />
          <div className="skeleton h-5 w-16 rounded" />
        </div>
        <div className="skeleton h-7 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-6 w-16 rounded" />
          <div className="skeleton h-6 w-16 rounded" />
          <div className="skeleton h-6 w-16 rounded" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-9 flex-1 rounded" />
          <div className="skeleton h-9 w-9 rounded" />
          <div className="skeleton h-9 w-9 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(12)].map((_, i) => <CollegeCardSkeleton key={i} />)}
    </div>
  );
}
