import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ── GET /api/public/sponsors — public: list active sponsors ───── */
export async function GET() {
    const sb = getSupabase();
    const { data, error } = await sb
        .from("sponsors")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ sponsors: data });
}
