type Product = {
  id: number;
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

export default async function PriceTicker() {
  const products = await getProducts();

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-gray-50">
      <div
        className="flex w-max"
        style={{
          animation: "ticker-scroll 70s linear infinite",
        }}
      >
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center gap-8 whitespace-nowrap px-4 py-3"
          >
            {products.map((product) => (
              <div
                key={`${group}-${product.id}`}
                className="flex shrink-0 items-center gap-2 text-sm"
              >
                <span>{product.image}</span>

                <span className="font-medium">{product.nameBn}</span>

                <span className="text-gray-600">
                  {product.today} BDT / {product.unit}
                </span>

                <span
                  className={
                    product.change.dir === "up"
                      ? "text-red-600"
                      : product.change.dir === "down"
                        ? "text-green-600"
                        : "text-gray-500"
                  }
                >
                  {product.change.dir === "up" && "▲"}
                  {product.change.dir === "down" && "▼"}
                  {product.change.dir === "flat" && "—"}{" "}
                  {Math.abs(product.change.pct)}%
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
