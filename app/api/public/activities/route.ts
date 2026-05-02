import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ── GET /api/public/activities — public: list active activities ── */
export async function GET() {
    const sb = getSupabase();
    const { data, error } = await sb
        .from("activities")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ activities: data });
}
