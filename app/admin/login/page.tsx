"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/admin-auth";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
            {/* Background Elements */}
            <div className="bg-glow"></div>
            <div className="bg-noise"></div>
            <div className="bg-grid"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md px-4 relative z-10"
            >
                {/* Branding */}
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
                        className="mx-auto w-16 h-16 bg-[#ef4444]/10 rounded-2xl border border-[#ef4444]/20 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                    >
                        <ShieldCheck className="w-8 h-8 text-[#ef4444]" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Riviera <span className="text-[#ef4444]">Admin</span></h1>
                    <p className="text-sm text-[#a1a1aa] mt-2 font-medium">
                        Secure Access Portal
                    </p>
                </div>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                    className="glass-card p-8 space-y-6 relative overflow-hidden"
                >
                    {/* Decorative gradient orb inside card */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ef4444]/10 rounded-full blur-3xl pointer-events-none"></div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-start gap-2"
                        >
                            <span className="mt-0.5">⚠️</span>
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#a1a1aa] mb-1.5" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-[#71717a]" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-[#ef4444]/50 focus:ring-1 focus:ring-[#ef4444]/50 transition-colors"
                                    placeholder="admin@riviera.edu"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#a1a1aa] mb-1.5" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#71717a]" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:border-[#ef4444]/50 focus:ring-1 focus:ring-[#ef4444]/50 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary justify-center group"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating...
                            </span>
                        ) : (
                            <>
                                Sign In to Admin
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
