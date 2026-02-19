import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/*  GET /api/cron/cleanup                                              */
/*  Daily cron job: expire unpaid payment orders older than 24 hours.  */
/*  Protected by CRON_SECRET to prevent public access.                 */
/* ------------------------------------------------------------------ */

export async function GET(req: NextRequest) {
    try {
        // ---------- Verify cron secret ----------
        const authHeader = req.headers.get("authorization");
        const cronSecret = process.env.CRON_SECRET;

        if (!cronSecret) {
            console.error("Missing CRON_SECRET env variable");
            return NextResponse.json(
                { error: "Cron not configured" },
                { status: 500 }
            );
        }

        if (authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // ---------- Find and expire stale payments ----------
        const supabase = getSupabase();

        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data, error } = await supabase
            .from("payments")
            .update({ status: "expired" })
            .eq("status", "created")
            .lt("created_at", cutoff)
            .select("id");

        if (error) {
            console.error("Cron cleanup error:", error);
            return NextResponse.json(
                { error: "Cleanup query failed" },
                { status: 500 }
            );
        }

        const expiredCount = data?.length ?? 0;
        console.log(`🧹 Cron cleanup: expired ${expiredCount} stale payment(s)`);

        return NextResponse.json(
            {
                message: "Cleanup complete",
                expired_count: expiredCount,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Cron cleanup error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
