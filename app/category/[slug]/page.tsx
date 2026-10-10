import { Suspense } from "react";
import SortProducts from "@/components/SortProducts";
import CategorySkeleton from "@/components/CategorySkeleton";
import Link from "next/link";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
};

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryNames: Record<string, string> = {
  chal: "Rice",
  dal: "Lentils",
  tel: "Oil",
  sobji: "Vegetables",
  mach: "Fish",
  mangsho: "Meat",
  dim: "Eggs & Milk",
  moshla: "Spices",
};

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;

  let products: Product[];

  try {
    const response = await fetch(
      `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    );

    if (!response.ok) {
      throw new Error(`Products API failed: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid products API response");
    }

    products = data as Product[];
  } catch (error) {
    console.error("Failed to load category products:", error);

    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">Unable to Load Category</h1>

          <p className="mt-2 text-gray-500">Please try again later.</p>
        </div>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">Category not found</h1>

          <p className="mt-2 text-gray-500">
            No products found for this category.
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

  const categoryName = categoryNames[slug] ?? products[0]?.categoryNameBn;

  const categoryIcon = products[0]?.categoryIcon;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6">
        <span className="text-4xl">{categoryIcon}</span>

        <div>
          <h1 className="text-2xl font-bold">{categoryName}</h1>

          <p className="text-sm text-gray-500">
            {products.length} products available
          </p>
        </div>
      </div>

      <SortProducts products={products} />
    </main>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-4 py-6">
          <CategorySkeleton />
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
