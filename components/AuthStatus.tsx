"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { authClient } from "@/lib/auth-client";
import { FaSignOutAlt } from "react-icons/fa";
import { BsFillFilePersonFill } from "react-icons/bs";

export default function AuthStatus() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await authClient.signOut();
    setOpen(false);
    router.refresh();
  }

  if (isPending) {
    return <p>Checking session...</p>;
  }

  if (!session) {
    return (
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
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-2 font-medium text-gray-800"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
          {session.user.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <span>{session.user.name || "User"}</span>

        <IoIosArrowDropdownCircle className="text-lg text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
          <p className="font-semibold text-gray-800">
            {session.user.name || "User"}
          </p>

          <p className="mt-1 text-sm text-gray-500">{session.user.email}</p>

          <div className="my-3 h-px bg-gray-100" />

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <BsFillFilePersonFill />
            My Profile
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
