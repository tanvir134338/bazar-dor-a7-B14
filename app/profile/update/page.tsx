"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function UpdateProfileForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, []);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      const errorMessage = "Name cannot be empty.";
      setError(errorMessage);
      setMessage("");
      toast.error(errorMessage);
      return;
    }

    if (trimmedName.length < 2) {
      const errorMessage = "Name must contain at least 2 characters.";
      setError(errorMessage);
      setMessage("");
      toast.error(errorMessage);
      return;
    }

    if (trimmedName === initialName) {
      const errorMessage = "Please enter a different name.";
      setError(errorMessage);
      setMessage("");
      toast.error(errorMessage);
      return;
    }

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
      messageTimer.current = null;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        const errorMessage =
          result.error.message || "Failed to update your profile.";

        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      const successMessage = "Profile updated successfully.";

      setMessage(successMessage);
      toast.success(successMessage);

      messageTimer.current = setTimeout(() => {
        setMessage("");
        messageTimer.current = null;
      }, 3000);
    } catch {
      const errorMessage = "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/profile"
          className="mb-6 inline-block text-sm font-medium text-green-700 hover:text-green-800"
        >
          ← Back to Profile
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>

          <p className="mt-2 text-sm text-gray-500">
            Change your account name below.
          </p>

          {message && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="mt-6">
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

                if (messageTimer.current) {
                  clearTimeout(messageTimer.current);
                  messageTimer.current = null;
                }
              }}
              disabled={loading}
              placeholder="Enter your name"
              autoComplete="name"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50"
            />

            <button
              type="submit"
              disabled={loading || !name.trim() || name.trim() === initialName}
              className="mt-5 w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {loading ? "Updating..." : "Update Information"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please sign in to update your profile.");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-gray-500">
          {isPending ? "Loading profile..." : "Redirecting to sign in..."}
        </p>
      </main>
    );
  }

  return <UpdateProfileForm initialName={session.user.name || ""} />;
}
