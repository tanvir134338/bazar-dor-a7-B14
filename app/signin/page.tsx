"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  // Notify users when they need to sign in to view product details.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("redirected") === "product") {
      toast("Sign in to view product details.", {
        icon: "🔒",
      });

      window.history.replaceState({}, "", "/signin");
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      const message = "Please enter your email and password.";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        const message = error.message || "Invalid email or password.";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Signed in successfully!");

      router.push("/");
      router.refresh();
    } catch {
      const message = "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setError("");
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        const message = error.message || `Unable to sign in with ${provider}.`;

        setError(message);
        toast.error(message);
        setSocialLoading("");
      }
    } catch {
      const message = `Unable to sign in with ${provider}. Please try again.`;

      setError(message);
      toast.error(message);
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-[70vh] flex-col items-center px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

        <p className="mt-2 text-sm text-gray-500">
          Sign in to access your Bazar Dor account.
        </p>
      </div>

      <div className="w-full max-w-96 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 disabled:opacity-60"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={loading || !!socialLoading}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FcGoogle className="text-lg" />
            {socialLoading === "google"
              ? "Connecting..."
              : "Continue with Google"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={loading || !!socialLoading}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaGithub className="text-lg" />
            {socialLoading === "github"
              ? "Connecting..."
              : "Continue with GitHub"}
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-green-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-5 text-sm text-gray-500 transition hover:text-green-600"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
