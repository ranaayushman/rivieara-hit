import { NextRequest, NextResponse } from "next/server";
import { verifyUserToken } from "@/lib/jwt";
import { getSupabase } from "@/lib/supabase";

/* ── GET /api/auth/me — get current user from JWT ──────────────── */
export async function GET(req: NextRequest) {
    const auth = await verifyUserToken(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = getSupabase();
    const { data: user, error } = await supabase
        .from("users")
        .select("id, name, email, avatar_url, college, phone, created_at")
        .eq("id", auth.sub)
        .single();

    if (error || !user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
}
