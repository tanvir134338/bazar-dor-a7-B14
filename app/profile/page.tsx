"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

function ProfileContent({
  user,
}: {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
}) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const originalName = user.name || "";
  const hasChanged = name.trim() !== originalName;

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Name cannot be empty.");
      setMessage("");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Name must contain at least 2 characters.");
      setMessage("");
      return;
    }

    if (!hasChanged) {
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await authClient.updateUser({
      name: trimmedName,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Failed to update your profile.");
      return;
    }

    setMessage("Profile updated successfully.");

    router.refresh();

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  async function handleSignOut() {
    setSigningOut(true);
    setError("");
    setMessage("");

    const { error } = await authClient.signOut();

    if (error) {
      setSigningOut(false);
      setError(error.message || "Failed to sign out.");
      return;
    }

    window.location.reload();
  }

  const firstLetter = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <main className="flex-1 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

          <p className="mt-1 text-sm text-gray-500">
            View and update your profile information.
          </p>
        </div>

        {/* Success message */}
        {message && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Profile summary */}
        <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {/* Avatar */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-700">
                  {firstLetter}
                </div>
              )}

              {/* User information */}
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-gray-900">
                  {user.name || "User"}
                </h2>

                <p className="truncate text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {signingOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </section>

        {/* Information */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Information
          </h2>

          <form onSubmit={handleUpdate}>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
                setMessage("");
              }}
              disabled={loading}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50"
            />

            <button
              type="submit"
              disabled={!hasChanged || loading}
              className="mt-4 w-full cursor-pointer rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-gray-500">Loading profile...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-gray-500">Redirecting to sign in...</p>
      </main>
    );
  }

  return <ProfileContent user={session.user} />;
}
