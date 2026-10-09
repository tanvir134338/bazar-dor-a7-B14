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

const productNames: Record<string, string> = {
  "sorno-machi-chal": "Sorno Machi Rice",
  "mosur-dal": "Red Lentils",
  "mug-dal": "Mung Lentils",
  chola: "Chickpeas",
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

                <span className="font-medium">
                  {getEnglishName(product.slug)}
                </span>

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
