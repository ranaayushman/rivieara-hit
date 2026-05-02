import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ── GET /api/public/schedule — public: get schedule ───────────── */
export async function GET() {
    const sb = getSupabase();
    const { data, error } = await sb
        .from("schedule_items")
        .select("*")
        .order("day_label", { ascending: true })
        .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Group by day
    const grouped: Record<string, typeof data> = {};
    for (const item of data || []) {
        if (!grouped[item.day_label]) grouped[item.day_label] = [];
        grouped[item.day_label].push(item);
    }

    return NextResponse.json({ schedule: grouped, items: data });
}
