import { Suspense } from "react";

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
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;

  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  const products: Product[] = await response.json();

  const product = products.find((item) => item.slug === slug);

  console.log(product);

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>

          <p className="mt-2 text-gray-500">No product found for this item.</p>
        </div>
      </main>
    );
  }

  const lowestPrice = Math.min(...product.markets.map((market) => market.min));

  const highestPrice = Math.max(...product.markets.map((market) => market.max));

  const averagePrice =
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Product Header */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 text-5xl">
              {product.image}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{product.nameBn}</h1>

              <p className="mt-1 text-sm text-gray-500">
                per {product.unit} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Compared to yesterday
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 px-6 py-4 text-center sm:min-w-32">
            <p className="text-sm text-gray-500">Today&apos;s price</p>

            <p className="mt-1 text-3xl font-bold">
              {product.today}
              <span className="ml-1 text-sm font-normal">BDT</span>
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${
                product.change.dir === "up"
                  ? "text-green-600"
                  : product.change.dir === "down"
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up" && "▲"}
              {product.change.dir === "down" && "▼"}
              {product.change.dir === "flat" && "—"}{" "}
              {Math.abs(product.change.pct)}%
            </p>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold">Price Summary</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Lowest Price</p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {lowestPrice.toFixed(0)} BDT
            </p>

            <p className="mt-1 text-sm text-gray-500">Lowest market price</p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Highest Price</p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {highestPrice.toFixed(0)} BDT
            </p>

            <p className="mt-1 text-sm text-gray-500">Highest market price</p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Average Price</p>

            <p className="mt-2 text-2xl font-bold">
              {averagePrice.toFixed(0)} BDT
            </p>

            <p className="mt-1 text-sm text-gray-500">Average market price</p>
          </div>
        </div>
      </div>

      {/* Market-wise Prices */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold">Market-wise Prices</h2>

        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-175 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Market</th>

                <th className="px-4 py-3 text-left font-semibold">Division</th>

                <th className="px-4 py-3 text-right font-semibold">Minimum</th>

                <th className="px-4 py-3 text-right font-semibold">Maximum</th>

                <th className="px-4 py-3 text-right font-semibold">Average</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market) => {
                const average = (market.min + market.max) / 2;

                return (
                  <tr
                    key={`${market.market}-${market.division}`}
                    className="border-t border-gray-200"
                  >
                    <td className="px-4 py-3">{market.market}</td>

                    <td className="px-4 py-3">{market.division}</td>

                    <td className="px-4 py-3 text-right">{market.min} BDT</td>

                    <td className="px-4 py-3 text-right">{market.max} BDT</td>

                    <td className="px-4 py-3 text-right font-semibold">
                      {average.toFixed(0)} BDT
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<main>Loading...</main>}>
      <ProductContent params={params} />
    </Suspense>
  );
}
