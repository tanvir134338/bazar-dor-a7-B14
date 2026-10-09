"use client";

import { useState } from "react";
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

type SortProductsProps = {
  products: Product[];
};

export default function SortProducts({ products }: SortProductsProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") {
      return a.today - b.today;
    }

    if (sort === "high") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-end rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sort by</span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="default">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
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
    </div>
  );
}
