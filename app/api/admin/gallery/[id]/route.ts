import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

interface RouteContext {
    params: Promise<{ id: string }>;
}

/* ── PUT /api/admin/gallery/[id] — update an album ─────────────── */
export async function PUT(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();
    const body = await req.json();

    const { data, error } = await sb
        .from("gallery_albums")
        .update({
            title: body.title,
            description: body.description || null,
            sort_order: body.sort_order ?? 0,
            is_active: body.is_active ?? true,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ album: data });
}

/* ── DELETE /api/admin/gallery/[id] — delete album + images ────── */
export async function DELETE(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await context.params;
    const sb = getSupabase();

    const { error } = await sb.from("gallery_albums").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}

/* ── POST /api/admin/gallery/[id] — add images to album ────────── */
export async function POST(req: NextRequest, context: RouteContext) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { id: album_id } = await context.params;
    const sb = getSupabase();
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files.length) {
        return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }

    const uploaded: Record<string, unknown>[] = [];

    for (const file of files) {
        const ext = file.name.split(".").pop();
        const path = `${album_id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        const { error: uploadErr } = await sb.storage
            .from("gallery-images")
            .upload(path, buffer, { contentType: file.type, upsert: true });

        if (uploadErr) continue;

        const { data: publicUrl } = sb.storage.from("gallery-images").getPublicUrl(path);

        const { data: insertedRow, error: insertErr } = await sb
            .from("gallery_images")
            .insert({
                album_id,
                image_url: publicUrl.publicUrl,
                caption: file.name.replace(/\.[^.]+$/, ""),
                sort_order: uploaded.length,
            })
            .select()
            .single();

        if (!insertErr && insertedRow) uploaded.push(insertedRow);
    }

    // Set first image as cover if album has no cover
    if (uploaded.length > 0) {
        const { data: album } = await sb
            .from("gallery_albums")
            .select("cover_url")
            .eq("id", album_id)
            .single();

        if (album && !album.cover_url) {
            await sb.from("gallery_albums")
                .update({ cover_url: uploaded[0].image_url })
                .eq("id", album_id);
        }
    }

    return NextResponse.json({ images: uploaded, count: uploaded.length }, { status: 201 });
}
