import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

/* ── GET  /api/admin/activities — list all activities ──────────── */
export async function GET(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const { data, error } = await sb
        .from("activities")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ activities: data });
}

/* ── POST /api/admin/activities — create an activity ───────────── */
export async function POST(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const body = await req.json();

    const { title, description, icon_name, sort_order } = body;
    if (!title || !description) {
        return NextResponse.json({ error: "title and description are required" }, { status: 400 });
    }

    const { data, error } = await sb
        .from("activities")
        .insert({
            title,
            description,
            icon_name: icon_name || "Code",
            sort_order: sort_order || 0,
        })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ activity: data }, { status: 201 });
}
