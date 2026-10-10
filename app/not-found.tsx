import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold">404</p>

        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>

        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
