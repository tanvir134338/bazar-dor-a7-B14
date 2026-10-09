import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
};

async function getProducts() {
  "use cache";

  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  const products: Product[] = await response.json();

  return products;
}

export default async function RisersSection() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-5 text-2xl font-bold">
        <span className="text-red-600">▲</span> Today&apos;s Price Increased
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {risers.map((product) => (
          <ProductCard
            key={product.id}
            slug={product.slug}
            image={product.image}
            price={product.today}
            unit={product.unit}
            change={product.change}
          />
        ))}
      </div>
    </section>
  );
}
