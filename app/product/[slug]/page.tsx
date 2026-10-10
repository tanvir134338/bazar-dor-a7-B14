import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

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
  "khasir-mangsho": "Mutton",
  "murgi-r-mangsho": "Chicken",
};

const categoryNames: Record<string, string> = {
  chal: "Rice",
  dal: "Lentils",
  tel: "Oil",
  sobji: "Vegetables",
  mach: "Fish",
  mangsho: "Meat",
  "dim-dui": "Eggs & Milk",
  mosla: "Spices",
};

const marketNames: Record<string, string> = {
  "কারওয়ান বাজার": "Karwan Bazar",
  "কারওয়ান বাজার": "Karwan Bazar",
  "গ্রীন মার্কেট, মিরপুর": "Green Market, Mirpur",
  "গ্রিন মার্কেট, মিরপুর": "Green Market, Mirpur",
  "চৌদগ্রাম বাজার": "Chouddo Graam Bazar",
  "চৌদ্দ গ্রাম বাজার": "Chouddo Graam Bazar",
  "আমতলী বাজার": "Amtoli Bazar",
  "সদর বাজার": "Sadar Bazar",
  "বাসারহাট বাজার": "Basarhat Bazar",
  "বাজারহাট বাজার": "Bazarhat Bazar",
  বাজারহাট: "Bazarhat",
  "মাঠ বাজার": "Math Bazar",
  "চৌর বাজার": "Chowr Bazar",
  "ডবলগেট বাজার": "Double Gate Bazar",
  আমবাজার: "Am Bazar",
  "চৌরাস্তা বাজার": "Chou Rasta Bazar",
};

const divisionNames: Record<string, string> = {
  ঢাকা: "Dhaka",
  চট্টগ্রাম: "Chattogram",
  রাজশাহী: "Rajshahi",
  খুলনা: "Khulna",
  বরিশাল: "Barishal",
  সিলেট: "Sylhet",
  রংপুর: "Rangpur",
  ময়মনসিংহ: "Mymensingh",
  ময়মনসিংহ: "Mymensingh",
};

function getEnglishMarketName(name: string) {
  return marketNames[name] || name;
}

function getEnglishDivisionName(name: string) {
  return divisionNames[name] || name;
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;

  // Check the user's Better Auth session on the server.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect unauthenticated users to sign in with a redirect reason.
  if (!session) {
    redirect("/signin?redirected=product");
  }

  let products: Product[];

  try {
    const response = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
    );

    if (!response.ok) {
      throw new Error("Products API request failed");
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid products response");
    }

    products = data as Product[];
  } catch {
    return (
      <main className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-5 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to Load Product
          </h1>

          <p className="mt-2 text-gray-500">
            We couldn&apos;t load product information right now. Please try
            again later.
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

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-5 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            No product was found for this item. It may not exist or may have
            been removed.
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

  const productName =
    productNames[product.slug] ||
    product.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const categoryName = categoryNames[product.category] || product.category;

  const lowestPrice =
    product.markets.length > 0
      ? Math.min(...product.markets.map((market) => market.min))
      : product.today;

  const highestPrice =
    product.markets.length > 0
      ? Math.max(...product.markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    product.markets.length > 0
      ? product.markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / product.markets.length
      : product.today;

  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-8 lg:px-8">
      {/* Product Header */}
      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-4xl sm:h-20 sm:w-20 sm:text-5xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                {productName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Per {product.unit} · {categoryName}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Compared to yesterday
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 px-5 py-4 sm:min-w-40 sm:text-center">
            <p className="text-sm text-gray-500">Today&apos;s Price</p>

            <p className="mt-1 text-2xl font-bold sm:text-3xl">
              {product.today}
              <span className="ml-1 text-sm font-normal">BDT</span>
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
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
      </section>

      {/* Price Summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl font-bold">Price Summary</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Lowest Price</p>
            <p className="mt-2 text-xl font-bold text-green-600 sm:text-2xl">
              {lowestPrice.toFixed(0)} BDT
            </p>
            <p className="mt-1 text-sm text-gray-500">Lowest market price</p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Highest Price</p>
            <p className="mt-2 text-xl font-bold text-red-600 sm:text-2xl">
              {highestPrice.toFixed(0)} BDT
            </p>
            <p className="mt-1 text-sm text-gray-500">Highest market price</p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Average Price</p>
            <p className="mt-2 text-xl font-bold sm:text-2xl">
              {averagePrice.toFixed(0)} BDT
            </p>
            <p className="mt-1 text-sm text-gray-500">Average market price</p>
          </div>
        </div>
      </section>

      {/* Market-wise Prices */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl font-bold">Market-wise Prices</h2>

        {product.markets.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            Market-wise prices are currently unavailable.
          </p>
        ) : (
          <>
            {/* Mobile layout */}
            <div className="mt-4 space-y-3 sm:hidden">
              {product.markets.map((market) => {
                const average = (market.min + market.max) / 2;

                return (
                  <article
                    key={`${market.market}-${market.division}`}
                    className="rounded-xl border border-gray-200 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="min-w-0 text-sm font-semibold">
                        {getEnglishMarketName(market.market)}
                      </h3>

                      <span className="shrink-0 text-right text-xs text-gray-500">
                        {getEnglishDivisionName(market.division)}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Minimum</p>
                        <p className="mt-1 text-sm font-semibold">
                          {market.min}
                          <span className="ml-1 text-[10px] font-normal">
                            BDT
                          </span>
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Maximum</p>
                        <p className="mt-1 text-sm font-semibold">
                          {market.max}
                          <span className="ml-1 text-[10px] font-normal">
                            BDT
                          </span>
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Average</p>
                        <p className="mt-1 text-sm font-semibold">
                          {average.toFixed(0)}
                          <span className="ml-1 text-[10px] font-normal">
                            BDT
                          </span>
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Tablet and desktop table */}
            <div className="mt-4 hidden overflow-x-auto rounded-xl border border-gray-200 sm:block">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Market
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Division
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Minimum
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Maximum
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Average
                    </th>
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
                        <td className="px-4 py-3">
                          {getEnglishMarketName(market.market)}
                        </td>
                        <td className="px-4 py-3">
                          {getEnglishDivisionName(market.division)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {market.min} BDT
                        </td>
                        <td className="px-4 py-3 text-right">
                          {market.max} BDT
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {average.toFixed(0)} BDT
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-4 py-8">
          Loading product...
        </main>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
