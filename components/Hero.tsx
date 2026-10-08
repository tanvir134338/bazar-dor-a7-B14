"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const date = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date());

      setCurrentDate(date);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex min-h-80 flex-col gap-8 rounded-3xl border border-gray-200 bg-white px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">
          <div className="flex-1">
            <p className="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {currentDate}
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Today&apos;s Market Prices at a Glance
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
              Check the latest prices of rice, lentils, oil, vegetables, fish,
              meat, eggs and other essential products.
            </p>

            <button className="mt-6 rounded-lg bg-green-600 px-5 py-3 font-medium text-white">
              View All Products
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Image
              src="/bazar-hero.png"
              alt="Fresh market products"
              width={420}
              height={300}
              className="h-auto w-full max-w-105 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
