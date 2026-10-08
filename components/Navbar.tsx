import CategoryNav from "./CategoryNav";
import Image from "next/image";
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
        <div className="flex items-center gap-3">
          <Image src="/logo-icon.png" alt="Bazar Dor" width={45} height={45} />

          <div>
            <h1 className="text-2xl font-bold text-black">Bazar Dor</h1>

            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="font-medium text-gray-700">Sign In</button>

          <button className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white">
            Sign Up
          </button>
        </div>
      </div>
      <CategoryNav />
    </header>
  );
}
