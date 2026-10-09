import Link from "next/link";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

function getEnglishName(slug: string) {
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

export default async function CategoryNav() {
  "use cache";

  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  const categories: Category[] = await response.json();

  return (
    <nav className="border-t border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-4 py-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            {category.icon} {getEnglishName(category.slug)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
