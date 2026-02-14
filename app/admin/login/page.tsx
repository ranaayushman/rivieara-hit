"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/admin-auth";
import ErrorBanner from "../_components/ErrorBanner";
import FieldWrapper from "../_components/FieldWrapper";

/* ------------------------------------------------------------------ */
/*  /admin/login — Admin sign-in page                                  */
/* ------------------------------------------------------------------ */

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }

            saveToken(data.token);
            router.replace("/admin/dashboard");
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm">
                {/* Branding */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-indigo-600">Riviera Admin</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Sign in to manage your fest
                    </p>
                </div>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5"
                >
                    <ErrorBanner message={error} />

                    <FieldWrapper label="Email" htmlFor="email">
                        <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-style"
                            placeholder="admin@riviera.edu"
                        />
                    </FieldWrapper>

                    <FieldWrapper label="Password" htmlFor="password">
                        <input
                            id="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-style"
                            placeholder="••••••••"
                        />
                    </FieldWrapper>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2.5 text-sm font-semibold
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}
