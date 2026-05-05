import { NextRequest, NextResponse } from "next/server";
import { verifyUserToken } from "@/lib/jwt";
import { getSupabase } from "@/lib/supabase";

/* ── GET /api/auth/me — get current user from JWT ──────────────── */
export async function GET(req: NextRequest) {
    const auth = await verifyUserToken(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = getSupabase();

    // Base columns that always exist; extended columns from migration-v3
    const BASE_COLS = "id, name, email, avatar_url, created_at";
    const EXTENDED_COLS = "id, name, email, avatar_url, college, phone, created_at";

    // --- Attempt 1: query by id with extended columns ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let user: any = null;
    let error: any = null;
    ({ data: user, error } = await supabase
        .from("users")
        .select(EXTENDED_COLS)
        .eq("id", auth.sub)
        .single());

    // If the error is about missing columns, retry with base columns only
    if (error && error.message && /column|undefined|does not exist/i.test(error.message)) {
        console.warn("[/api/auth/me] Extended columns not available, retrying with base columns:", error.message);
        const retry = await supabase
            .from("users")
            .select(BASE_COLS)
            .eq("id", auth.sub)
            .single();
        user = retry.data;
        error = retry.error;
    }

    if (error || !user) {
        console.error("[/api/auth/me] User lookup by id failed:", {
            sub: auth.sub,
            email: auth.email,
            error: error?.message || error,
        });

        // Fallback: lookup by email (some tokens may use email as subject)
        if (auth.email) {
            const { data: byEmail, error: emailErr } = await supabase
                .from("users")
                .select(BASE_COLS)
                .eq("email", auth.email)
                .single();

            if (emailErr) {
                console.error("[/api/auth/me] Email fallback also failed:", emailErr.message);
            }

            if (!emailErr && byEmail) {
                return NextResponse.json({ user: byEmail });
            }
        }

        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
}
