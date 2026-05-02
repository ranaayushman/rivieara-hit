import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

interface RouteContext {
    params: Promise<{ id: string }>;
}

/* ── PUT /api/admin/activities/[id] — update an activity ───────── */
export async function PUT(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();
    const body = await req.json();

    const { data, error } = await sb
        .from("activities")
        .update({
            title: body.title,
            description: body.description,
            icon_name: body.icon_name || "Code",
            sort_order: body.sort_order ?? 0,
            is_active: body.is_active ?? true,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ activity: data });
}

/* ── DELETE /api/admin/activities/[id] — delete an activity ────── */
export async function DELETE(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();

    const { error } = await sb.from("activities").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
