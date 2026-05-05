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
        // Try fallback: lookup by email if id lookup failed (some tokens use email as subject)
        try {
            if (auth.email) {
                const { data: byEmail, error: emailErr } = await supabase
                    .from("users")
                    .select("id, name, email, avatar_url, college, phone, created_at")
                    .eq("email", auth.email)
                    .single();
                if (!emailErr && byEmail) {
                    return NextResponse.json({ user: byEmail });
                }
            }
        } catch (e) {
            console.error("Fallback user lookup error:", e);
        }

        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
}
