import Link from "next/link";
type ProductCardProps = {
  slug: string;
  image: string;
  price: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
};

const productNames: Record<string, string> = {
  "sorno-machi-chal": "Sorno Machi Rice",
  "miniket-chal": "Miniket Rice",
  "nazir-chal": "Nazir Rice",
  "batam-size-chal": "Batam Size Rice",
  "mosur-dal": "Red Lentils",
  "mug-dal": "Mung Lentils",
  "chola-dal": "Chickpeas",
  "aman-dal-khosasila": "Aman Dal",
  "sorishar-tel": "Mustard Oil",
  "pam-tel": "Palm Oil",
  "ghani-banga-sorishar-tel": "Cold-Pressed Mustard Oil",
  alu: "Potato",
  peyaj: "Onion",
  "kaccha-moric": "Green Chili",
  begun: "Eggplant",
  dhenders: "Okra",
  "rui-mach": "Rohu Fish",
  "telapiya-mach": "Tilapia Fish",
  "ilish-mach": "Hilsa Fish",
  "katla-mach": "Katla Fish",
  "chingri-mach": "Shrimp",
};

function getEnglishName(slug: string) {
  return productNames[slug] || slug;
}

export default function ProductCard({
  slug,
  image,
  price,
  unit,
  change,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-3xl">
        {image}
      </div>

      <h2 className="text-lg font-semibold">{getEnglishName(slug)}</h2>

      <p className="text-sm text-gray-500">per {unit}</p>

      <div className="mt-6">
        <p className="text-sm text-gray-500">Today&apos;s price</p>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-2xl font-bold">
            {price} <span className="text-base font-normal">BDT</span>
          </p>

          <p
            className={`rounded-full px-3 py-1 text-sm ${
              change.dir === "up"
                ? "bg-red-50 text-red-600"
                : change.dir === "down"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {change.dir === "up" && "▲"}
            {change.dir === "down" && "▼"}
            {change.dir === "flat" && "—"} {Math.abs(change.pct)}%
          </p>
        </div>
      </div>
    </Link>
  );
}
