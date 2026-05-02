import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ── POST /api/contact — public: submit contact inquiry ────────── */
export async function POST(req: NextRequest) {
    const sb = getSupabase();
    const body = await req.json();

    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "name, email, and message are required" },
            { status: 400 }
        );
    }

    const { data, error } = await sb
        .from("contact_inquiries")
        .insert({ name, email, phone: phone || null, message })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ inquiry: data, message: "Thank you! We'll get back to you soon." }, { status: 201 });
}
