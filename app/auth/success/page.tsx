"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

/* ------------------------------------------------------------------ */
/*  Inner component that reads the token from the URL search params    */
/* ------------------------------------------------------------------ */

function AuthSuccessInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setStatus("error");
            return;
        }

        // Store the JWT so the frontend can use it for authenticated requests
        localStorage.setItem("token", token);

        // Fetch user profile and store it so the Navbar can display it immediately
        (async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const body = await res.json();
                    if (body?.user) {
                        localStorage.setItem("user", JSON.stringify(body.user));
                    }
                }
            } catch {
                // Token is stored; Navbar will retry on its own
            }

            // Notify any mounted Navbar instances that auth state changed
            window.dispatchEvent(new Event("auth-change"));

            setStatus("success");

            // Redirect to home after a brief delay so the user sees the success state
            const timer = setTimeout(() => router.replace("/"), 2000);
            // We don't return the cleanup here since we're inside an async IIFE
            // The redirect is fire-and-forget
        })();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <div className="text-center space-y-6 p-10 rounded-2xl bg-gray-900/60 border border-gray-800 shadow-2xl backdrop-blur-md max-w-md w-full mx-4">
                {status === "loading" && (
                    <>
                        <div className="mx-auto w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin" />
                        <p className="text-gray-400 text-lg">Signing you in…</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">
                            Welcome to Riviera!
                        </h1>
                        <p className="text-gray-400">
                            Login successful — redirecting you now…
                        </p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="mx-auto w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Login Failed</h1>
                        <p className="text-gray-400">
                            No authentication token was received.
                        </p>
                        <button
                            onClick={() => router.replace("/api/auth/google")}
                            className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                        >
                            Try Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Page wrapper — Suspense is required for useSearchParams in App     */
/*  Router when the page does not have a `loading.tsx`.                */
/* ------------------------------------------------------------------ */

export default function AuthSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
                    <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin" />
                </div>
            }
        >
            <AuthSuccessInner />
        </Suspense>
    );
}
