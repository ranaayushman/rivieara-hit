import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ── GET /api/public/settings — public: get site settings ──────── */
export async function GET() {
    const sb = getSupabase();
    const { data, error } = await sb.from("site_settings").select("*");

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const settings: Record<string, unknown> = {};
    for (const row of data || []) {
        settings[row.key] = row.value;
    }

    return NextResponse.json({ settings });
}
