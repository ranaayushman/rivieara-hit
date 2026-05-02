import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

interface RouteContext {
    params: Promise<{ imageId: string }>;
}

/* ── DELETE /api/admin/gallery/images/[imageId] — remove image ─── */
export async function DELETE(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { imageId } = await context.params;
    const sb = getSupabase();

    const { error } = await sb.from("gallery_images").delete().eq("id", imageId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
