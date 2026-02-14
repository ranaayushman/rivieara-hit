"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/admin-auth";
import PageHeader from "../_components/PageHeader";
import StatCard from "../_components/StatCard";
import QuickActionCard from "../_components/QuickActionCard";
import LoadingState from "../_components/LoadingState";
import { CalendarIcon, PlusIcon, CreditCardIcon } from "../_components/Icons";

interface Stats {
    totalEvents: number;
    upcomingEvents: number;
    pastEvents: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/admin/events", {
                    headers: authHeaders(),
                });

                if (!res.ok) return;

                const data = await res.json();
                const events: { date: string }[] = data.events ?? [];
                const now = new Date();

                setStats({
                    totalEvents: events.length,
                    upcomingEvents: events.filter((e) => new Date(e.date) >= now).length,
                    pastEvents: events.filter((e) => new Date(e.date) < now).length,
                });
            } catch {
                // silently fail — stats are non-critical
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return (
        <div>
            <PageHeader title="Dashboard" />

            {/* Stats cards */}
            {loading ? (
                <LoadingState text="Loading stats…" />
            ) : stats ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCard label="Total Events" value={stats.totalEvents} color="indigo" />
                    <StatCard label="Upcoming" value={stats.upcomingEvents} color="green" />
                    <StatCard label="Past" value={stats.pastEvents} color="gray" />
                </div>
            ) : (
                <p className="text-gray-500">Could not load stats.</p>
            )}

            {/* Quick actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <QuickActionCard
                    href="/admin/events"
                    icon={<CalendarIcon />}
                    iconBg="bg-indigo-50 text-indigo-600"
                    title="Manage Events"
                    description="Create, edit or delete fest events"
                />
                <QuickActionCard
                    href="/admin/events/new"
                    icon={<PlusIcon />}
                    iconBg="bg-green-50 text-green-600"
                    title="Add New Event"
                    description="Create a new fest event with banner"
                />
                <QuickActionCard
                    href="/admin/payments"
                    icon={<CreditCardIcon />}
                    iconBg="bg-purple-50 text-purple-600"
                    title="View Payments"
                    description="Review payment screenshots & status"
                />
            </div>
        </div>
    );
}
