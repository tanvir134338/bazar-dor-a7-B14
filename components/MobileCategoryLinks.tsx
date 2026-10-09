"use client";

import Link from "next/link";

type Category = {
  id: string;
  slug: string;
  icon: string;
  name: string;
};
export default function MobileCategoryLinks({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="flex flex-col gap-1">
      {categories.map((category) => (
        <Link
          onClick={() => window.dispatchEvent(new Event("close-category-menu"))}
          key={category.id}
          href={`/category/${category.slug}`}
          className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-green-50"
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
