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

async function getProducts(): Promise<Product[]> {
  "use cache";

  try {
    const response = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
    );

    if (!response.ok) {
      throw new Error(`Products API failed: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (
      !Array.isArray(data) ||
      !data.every(
        (product) =>
          typeof product.id === "number" &&
          typeof product.slug === "string" &&
          typeof product.image === "string" &&
          typeof product.unit === "string" &&
          typeof product.today === "number" &&
          typeof product.change?.dir === "string" &&
          typeof product.change?.pct === "number",
      )
    ) {
      throw new Error("Invalid products data");
    }

    return data as Product[];
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}

export default async function AllProducts() {
  const products = await getProducts();

  return (
    <section id="all-products" className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-2 text-2xl font-bold">All Products</h2>

      <p className="mb-5 text-gray-600">
        Check today&apos;s prices for all essential products.
      </p>

      {products.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <p className="font-medium text-gray-800">
            Products are temporarily unavailable.
          </p>
          <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
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
      )}
    </section>
  );
}
