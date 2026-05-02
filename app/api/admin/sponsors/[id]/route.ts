import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

interface RouteContext {
    params: Promise<{ id: string }>;
}

/* ── PUT /api/admin/sponsors/[id] — update a sponsor ───────────── */
export async function PUT(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const tier = formData.get("tier") as string;
    const website_url = formData.get("website_url") as string || null;
    const bg_color = formData.get("bg_color") as string || "#111111";
    const sort_order = parseInt(formData.get("sort_order") as string || "0", 10);
    const is_active = formData.get("is_active") !== "false";
    const logo = formData.get("logo") as File | null;

    const updates: Record<string, unknown> = {
        name, tier, website_url, bg_color, sort_order, is_active,
    };

    if (logo && logo.size > 0) {
        const ext = logo.name.split(".").pop();
        const path = `${Date.now()}-${(name || "sponsor").replace(/\s+/g, "-").toLowerCase()}.${ext}`;
        const buffer = Buffer.from(await logo.arrayBuffer());

        const { error: uploadErr } = await sb.storage
            .from("sponsor-logos")
            .upload(path, buffer, { contentType: logo.type, upsert: true });

        if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 });

        const { data: publicUrl } = sb.storage.from("sponsor-logos").getPublicUrl(path);
        updates.logo_url = publicUrl.publicUrl;
    }

    const { data, error } = await sb
        .from("sponsors")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ sponsor: data });
}

/* ── DELETE /api/admin/sponsors/[id] — delete a sponsor ────────── */
export async function DELETE(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();

    const { error } = await sb.from("sponsors").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
