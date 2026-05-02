import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ── GET /api/public/events — public: list active events ───────── */
export async function GET() {
    const sb = getSupabase();
    const { data, error } = await sb
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("date", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ events: data });
}
