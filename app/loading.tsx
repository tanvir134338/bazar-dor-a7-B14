export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero skeleton */}
      <section className="mb-10 animate-pulse">
        <div className="rounded-2xl bg-gray-100 p-6 sm:p-10">
          <div className="mb-4 h-4 w-32 rounded bg-gray-200" />
          <div className="mb-3 h-8 w-full max-w-lg rounded bg-gray-200" />
          <div className="mb-2 h-4 w-full max-w-md rounded bg-gray-200" />
          <div className="mt-6 h-10 w-36 rounded-lg bg-gray-200" />
        </div>
      </section>

      {/* Risers and fallers skeleton */}
      {[1, 2].map((section) => (
        <section key={section} className="mb-10 animate-pulse">
          <div className="mb-5 h-6 w-48 rounded bg-gray-200" />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-gray-200" />
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mb-2 h-5 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* All products skeleton */}
      <section className="animate-pulse">
        <div className="mb-5 h-6 w-40 rounded bg-gray-200" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-gray-100 p-4">
              <div className="mb-4 h-14 w-14 rounded-lg bg-gray-200" />
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mb-2 h-5 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
