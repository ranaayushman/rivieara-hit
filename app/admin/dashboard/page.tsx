"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/admin-auth";
import PageHeader from "../_components/PageHeader";
import LoadingState from "../_components/LoadingState";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Users, Image, Clock, Zap, CreditCard, MessageSquare, Settings, ArrowRight, Plus } from "lucide-react";

interface DashboardStats {
    events: number;
    albums: number;
    scheduleItems: number;
}

const statCards = [
    { key: "events", label: "Events", icon: CalendarDays, href: "/admin/events", color: "text-blue-400", bg: "bg-blue-500/10" },
    { key: "albums", label: "Albums", icon: Image, href: "/admin/gallery", color: "text-purple-400", bg: "bg-purple-500/10" },
    { key: "scheduleItems", label: "Schedule Items", icon: Clock, href: "/admin/schedule", color: "text-green-400", bg: "bg-green-500/10" },
];

const quickActions = [
    { label: "Add Event", href: "/admin/events", icon: CalendarDays },
    { label: "Upload Photos", href: "/admin/gallery", icon: Image },
    { label: "Edit Schedule", href: "/admin/schedule", icon: Clock },
];

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAll() {
            const headers = authHeaders();
            try {
                const [eventsRes, galleryRes, scheduleRes] = await Promise.allSettled([
                    fetch("/api/admin/events", { headers }),
                    fetch("/api/admin/gallery", { headers }),
                    fetch("/api/admin/schedule", { headers }),
                ]);

                const getCount = async (res: PromiseSettledResult<Response>, key: string) => {
                    if (res.status !== "fulfilled" || !res.value.ok) return 0;
                    const d = await res.value.json();
                    if (key === "events") return (d.events || []).length;
                    if (key === "albums") return (d.albums || []).length;
                    if (key === "schedule") return (d.items || []).length;
                    return 0;
                };

                setStats({
                    events: await getCount(eventsRes, "events"),
                    albums: await getCount(galleryRes, "albums"),
                    scheduleItems: await getCount(scheduleRes, "schedule"),
                });
            } catch { /* */ }
            finally { setLoading(false); }
        }
        fetchAll();
    }, []);

    return (
        <div>
            <PageHeader title="Dashboard" />

            {loading ? <LoadingState text="Loading stats..." /> : stats ? (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                        {statCards.map((card, i) => {
                            const Icon = card.icon;
                            const value = stats[card.key as keyof DashboardStats] ?? 0;
                            return (
                                <motion.div key={card.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link href={card.href} className="glass-card p-5 block hover:border-red-500/30 transition-all group">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                                                <Icon size={20} className={card.color} />
                                            </div>
                                        </div>
                                        <p className="text-3xl font-bold text-white">{value}</p>
                                        <p className="text-xs text-zinc-500 mt-1">{card.label}</p>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <Link key={action.label} href={action.href} className="glass-card p-4 flex items-center gap-4 hover:border-red-500/30 transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                        <Icon size={18} className="text-red-400" />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors flex-1">{action.label}</span>
                                    <ArrowRight size={16} className="text-zinc-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                                </Link>
                            );
                        })}
                    </div>
                </>
            ) : <p className="text-zinc-500">Could not load stats.</p>}
        </div>
    );
}
