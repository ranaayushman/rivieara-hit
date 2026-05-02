import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

interface RouteContext {
    params: Promise<{ id: string }>;
}

/* ── PATCH /api/admin/contact/[id] — mark as read/unread ───────── */
export async function PATCH(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();
    const body = await req.json();

    const { data, error } = await sb
        .from("contact_inquiries")
        .update({ is_read: body.is_read ?? true })
        .eq("id", id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ inquiry: data });
}

/* ── DELETE /api/admin/contact/[id] — delete inquiry ───────────── */
export async function DELETE(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();

    const { error } = await sb.from("contact_inquiries").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
