import { Suspense } from "react";

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
    `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`,
  );

  const products: Product[] = await response.json();

  console.log(products);

  return (
    <main>
      <p>Category: {slug}</p>
      <p>Products found: {products.length}</p>

      {products.map((product) => (
        <div key={product.id}>
          <p>{product.nameBn}</p>
          <p>
            {product.today} / {product.unit}
          </p>
        </div>
      ))}
    </main>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<main>Loading...</main>}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
