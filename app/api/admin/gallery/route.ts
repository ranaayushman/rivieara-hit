import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

/* ── GET  /api/admin/gallery — list all albums with images ─────── */
export async function GET(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const { data: albums, error } = await sb
        .from("gallery_albums")
        .select("*, gallery_images(*)")
        .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ albums });
}

/* ── POST /api/admin/gallery — create an album ─────────────────── */
export async function POST(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const body = await req.json();

    const { title, description, sort_order } = body;
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const { data, error } = await sb
        .from("gallery_albums")
        .insert({ title, description: description || null, sort_order: sort_order || 0 })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ album: data }, { status: 201 });
}
