"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const isDesktop = window.matchMedia("(min-width: 640px)").matches;

      const date = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        ...(isDesktop
          ? { weekday: "long", month: "long" }
          : { month: "short" }),
        day: "numeric",
        year: "numeric",
      }).format(new Date());

      setCurrentDate(date);
    };

    updateDate();

    window.addEventListener("resize", updateDate);

    return () => {
      window.removeEventListener("resize", updateDate);
    };
  }, []);

  return <p className="text-[10px] text-gray-500 sm:text-sm">{currentDate}</p>;
}
