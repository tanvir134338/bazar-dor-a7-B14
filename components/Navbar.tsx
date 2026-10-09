import CategoryNav from "./CategoryNav";
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

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded bg-[#d7fdd7]">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor"
              width={30}
              height={30}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-black">Bazar Dor</h1>

            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/signin" className="font-medium text-gray-700">
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <CategoryNav />

      <PriceTicker />
    </header>
  );
}
