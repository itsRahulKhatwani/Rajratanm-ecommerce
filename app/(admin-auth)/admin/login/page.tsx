"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { LockKeyhole, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1B2A] px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#0D2137] rounded-xl p-8 border border-[#C9A84C]/30 shadow-2xl">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold text-[#C9A84C] mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Raj Ratanm
            </h1>
            <p className="text-[#F5F0E8]/60 text-sm font-medium tracking-wide">
              Admin Portal
            </p>
          </div>

          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
              <LockKeyhole className="w-6 h-6 text-[#C9A84C]" />
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#F5F0E8]/70 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@rajratanm.com"
                className="w-full px-4 py-3 rounded-lg bg-[#1a2a3a] border border-[#C9A84C]/20 text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/50 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#F5F0E8]/70 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-[#1a2a3a] border border-[#C9A84C]/20 text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/50 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#C9A84C] text-[#0D1B2A] font-semibold text-sm hover:bg-[#D4B96A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 px-4 py-3 rounded-lg bg-[#C97D7D]/15 border border-[#C97D7D]/30 text-[#D4999A] text-sm text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
