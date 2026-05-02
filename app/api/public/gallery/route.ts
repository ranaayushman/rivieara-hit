import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ── GET /api/public/gallery — public: list active albums + images */
export async function GET() {
    const sb = getSupabase();
    const { data, error } = await sb
        .from("gallery_albums")
        .select("*, gallery_images(*)")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Sort images within each album
    const albums = (data || []).map((album) => ({
        ...album,
        gallery_images: (album.gallery_images || []).sort(
            (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
        ),
    }));

    return NextResponse.json({ albums });
}
