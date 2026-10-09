import CategoryNav, { getCategories, getEnglishName } from "./CategoryNav";
import MobileCategoryMenu from "./MobileCategoryMenu";
import AuthStatus from "./AuthStatus";
import Image from "next/image";
import Link from "next/link";
import PriceTicker from "@/components/PriceTicker";

const currentDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Dhaka",
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(new Date());

export default async function Navbar() {
  const categories = await getCategories();
  console.log("Categories received:", categories);
  const mobileCategories = categories.map((category) => ({
    id: category.id,
    slug: category.slug,
    icon: category.icon,
    name: getEnglishName(category.slug),
  }));

  return (
    <header className="border-b bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4">
        <div className="md:hidden">
          <MobileCategoryMenu categories={mobileCategories} />
        </div>

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3 md:col-start-1"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#d7fdd7] sm:h-11 sm:w-11">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor"
              width={30}
              height={30}
              className="h-7 w-7"
            />
          </div>

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-base font-bold text-black sm:text-2xl">
              Bazar Dor
            </h1>
            <p className="text-[10px] text-gray-500 sm:text-sm">
              <span className="sm:hidden">
                {new Intl.DateTimeFormat("en-US", {
                  timeZone: "Asia/Dhaka",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date())}
              </span>

              <span className="hidden sm:inline">{currentDate}</span>
            </p>
          </div>
        </Link>

        <div className="justify-self-end">
          <AuthStatus />
        </div>
      </div>

      <div className="hidden md:block">
        <CategoryNav />
      </div>

      <PriceTicker />
    </header>
  );
}
