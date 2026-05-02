import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";

/* ── GET  /api/admin/sponsors — list all sponsors ──────────────── */
export async function GET(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();
    const { data, error } = await sb
        .from("sponsors")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ sponsors: data });
}

/* ── POST /api/admin/sponsors — create a sponsor ───────────────── */
export async function POST(req: NextRequest) {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const sb = getSupabase();

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const tier = formData.get("tier") as string || "Sponsor";
    const website_url = formData.get("website_url") as string || null;
    const bg_color = formData.get("bg_color") as string || "#111111";
    const sort_order = parseInt(formData.get("sort_order") as string || "0", 10);
    const logo = formData.get("logo") as File | null;

    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    let logo_url = "";

    if (logo && logo.size > 0) {
        const ext = logo.name.split(".").pop();
        const path = `${Date.now()}-${name.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
        const buffer = Buffer.from(await logo.arrayBuffer());

        const { error: uploadErr } = await sb.storage
            .from("sponsor-logos")
            .upload(path, buffer, { contentType: logo.type, upsert: true });

        if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 });

        const { data: publicUrl } = sb.storage.from("sponsor-logos").getPublicUrl(path);
        logo_url = publicUrl.publicUrl;
    }

    if (!logo_url) {
        return NextResponse.json({ error: "Logo is required" }, { status: 400 });
    }

    const { data, error } = await sb
        .from("sponsors")
        .insert({ name, tier, logo_url, website_url, bg_color, sort_order })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ sponsor: data }, { status: 201 });
}
