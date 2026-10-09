type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change?: {
    dir: string;
    pct: number;
  };
};

const productNames: Record<string, string> = {
  "sorno-machi-chal": "Sorno Machi Rice",
  "mosur-dal": "Red Lentils",
  "mug-dal": "Mung Lentils",
  "chola-dal": "Chickpeas",
};

function getEnglishName(slug: string) {
  if (productNames[slug]) {
    return productNames[slug];
  }

  const words = slug.split("-");

  const translatedWords = words.map((word) => {
    if (word === "chal") return "Rice";
    if (word === "dal") return "Lentils";
    if (word === "tel") return "Oil";
    if (word === "sobji") return "Vegetables";
    if (word === "mach") return "Fish";
    if (word === "mangsho") return "Meat";
    if (word === "dim") return "Eggs";
    if (word === "dudh") return "Milk";
    if (word === "mosla") return "Spices";

    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return translatedWords.join(" ");
}

async function getProducts(): Promise<Product[]> {
  "use cache";

  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!response.ok) {
    throw new Error(`Products API failed: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "products" in data &&
    Array.isArray(data.products)
  ) {
    return data.products as Product[];
  }

  throw new Error("Products API response does not contain a products array.");
}

export default async function PriceTicker() {
  const products = await getProducts();

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-gray-50">
      <div
        className="flex w-max"
        style={{
          animation: "ticker-scroll 70s linear infinite",
        }}
      >
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center gap-5 whitespace-nowrap px-3 py-2.5 sm:gap-8 sm:px-4 sm:py-3"
          >
            {products.map((product) => {
              const direction = product.change?.dir ?? "flat";
              const percentage = Math.abs(product.change?.pct ?? 0);

              return (
                <div
                  key={`${group}-${product.id}`}
                  className="flex shrink-0 items-center gap-1.5 text-xs sm:gap-2 sm:text-sm"
                >
                  <span>{product.image}</span>

                  <span className="font-medium">
                    {getEnglishName(product.slug)}
                  </span>

                  <span className="text-gray-600">
                    {product.today} BDT / {product.unit}
                  </span>

                  <span
                    className={
                      direction === "up"
                        ? "text-red-600"
                        : direction === "down"
                          ? "text-green-600"
                          : "text-gray-500"
                    }
                  >
                    {direction === "up" && "▲"}
                    {direction === "down" && "▼"}
                    {direction === "flat" && "—"} {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
