export function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse p-2">
      {/* Title skeleton */}
      <div className="h-6 w-1/3 bg-white/5 rounded-md mb-8" />

      {/* Block 1 (Summary style) */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-white/5 rounded-md" />
        <div className="h-4 w-5/6 bg-white/5 rounded-md" />
        <div className="h-4 w-4/6 bg-white/5 rounded-md" />
      </div>

      {/* Block 2 (List style) */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded bg-white/5" />
          <div className="h-4 w-2/3 bg-white/5 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded bg-white/5" />
          <div className="h-4 w-3/4 bg-white/5 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded bg-white/5" />
          <div className="h-4 w-1/2 bg-white/5 rounded-md" />
        </div>
      </div>
    </div>
  );
}
