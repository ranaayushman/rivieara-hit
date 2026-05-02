import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

/* ── GET  /api/admin/schedule — list all schedule items ────────── */
export async function GET(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const { data, error } = await sb
        .from("schedule_items")
        .select("*")
        .order("day_label", { ascending: true })
        .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ items: data });
}

/* ── POST /api/admin/schedule — create a schedule item ─────────── */
export async function POST(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const body = await req.json();

    const { day_label, time, title, description, sort_order } = body;
    if (!day_label || !time || !title) {
        return NextResponse.json({ error: "day_label, time, and title are required" }, { status: 400 });
    }

    const { data, error } = await sb
        .from("schedule_items")
        .insert({ day_label, time, title, description: description || null, sort_order: sort_order || 0 })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ item: data }, { status: 201 });
}
