import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

/* ── GET /api/admin/settings — get all settings ────────────────── */
export async function GET(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const { data, error } = await sb.from("site_settings").select("*");

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Convert array to object for easier consumption
    const settings: Record<string, unknown> = {};
    for (const row of data || []) {
        settings[row.key] = row.value;
    }

    return NextResponse.json({ settings });
}

/* ── PUT /api/admin/settings — update settings ─────────────────── */
export async function PUT(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const body = await req.json();

    // body = { hero: {...}, fest_info: {...}, contact: {...} }
    const results = [];

    for (const [key, value] of Object.entries(body)) {
        const { data, error } = await sb
            .from("site_settings")
            .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        results.push(data);
    }

    return NextResponse.json({ settings: results });
}
