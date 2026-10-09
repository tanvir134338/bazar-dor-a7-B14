import { Suspense } from "react";
import SortProducts from "@/components/SortProducts";
import CategorySkeleton from "@/components/CategorySkeleton";

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

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;

  const response = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`,
  );

  const products: Product[] = await response.json();

  console.log(products);

  const categoryName = products[0]?.categoryNameBn;
  const categoryIcon = products[0]?.categoryIcon;

  if (products.length === 0) {
    return (
      <main>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">Category not found</h1>

          <p className="mt-2 text-gray-500">
            No products found for this category.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
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
        <main className="mx-auto max-w-6xl px-4 py-6">
          <CategorySkeleton />
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
