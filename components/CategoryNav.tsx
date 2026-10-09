import Link from "next/link";

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type MobileCategory = {
  id: string;
  slug: string;
  icon: string;
  name: string;
};

export function getEnglishName(slug: string) {
  const names: Record<string, string> = {
    chal: "Rice",
    dal: "Lentils",
    tel: "Oil",
    sobji: "Vegetables",
    mach: "Fish",
    mangsho: "Meat",
    "dim-dui": "Eggs & Milk",
    mosla: "Spices",
  };

  return names[slug] || "Category";
}

export async function getCategories(): Promise<Category[]> {
  "use cache";

  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  if (!response.ok) {
    throw new Error(`Categories API failed: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error("Categories API did not return JSON.");
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return data as Category[];
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "categories" in data &&
    Array.isArray(data.categories)
  ) {
    return data.categories as Category[];
  }

  return [];
}

export default async function CategoryNav() {
  const categories = await getCategories();

  return (
    <nav aria-label="Product categories" className="border-t border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-3 py-2 sm:gap-4 sm:px-4 md:justify-center md:gap-6 md:py-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50"
          >
            <span>{category.icon}</span>
            <span>{getEnglishName(category.slug)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
