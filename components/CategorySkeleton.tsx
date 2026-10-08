export default function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
        >
          <div className="mb-3 h-12 w-12 rounded-xl bg-gray-200" />

          <div className="mb-2 h-5 w-32 rounded bg-gray-200" />

          <div className="mb-6 h-4 w-20 rounded bg-gray-200" />

          <div className="h-4 w-24 rounded bg-gray-200" />

          <div className="mt-2 h-8 w-28 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
