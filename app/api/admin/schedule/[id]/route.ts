import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

interface RouteContext {
    params: Promise<{ id: string }>;
}

/* ── PUT /api/admin/schedule/[id] — update a schedule item ─────── */
export async function PUT(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();
    const body = await req.json();

    const { data, error } = await sb
        .from("schedule_items")
        .update({
            day_label: body.day_label,
            time: body.time,
            title: body.title,
            description: body.description || null,
            sort_order: body.sort_order ?? 0,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ item: data });
}

/* ── DELETE /api/admin/schedule/[id] — delete a schedule item ──── */
export async function DELETE(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();

    const { error } = await sb.from("schedule_items").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
