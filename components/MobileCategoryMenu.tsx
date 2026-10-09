"use client";

import { useEffect, useRef, useState } from "react";
import MobileCategoryLinks from "./MobileCategoryLinks";

type Category = {
  id: string;
  slug: string;
  icon: string;
  name: string;
};

export default function MobileCategoryMenu({
  categories,
}: {
  categories: Category[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    function handleCloseMenu() {
      setMenuOpen(false);
    }

    window.addEventListener("close-category-menu", handleCloseMenu);

    return () => {
      window.removeEventListener("close-category-menu", handleCloseMenu);
    };
  }, []);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative md:hidden">
      <button
        type="button"
        aria-label={menuOpen ? "Close category menu" : "Open category menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-2xl text-gray-700 hover:bg-gray-50"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div className="absolute left-0 top-12 z-50 max-h-[70vh] w-60 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <MobileCategoryLinks categories={categories} />
        </div>
      )}
    </div>
  );
}
