import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/helpers";
import type { Payment, PaymentStatus, ApiError } from "@/lib/types";

/** Allowed values for the payment_status filter */
const VALID_STATUSES: PaymentStatus[] = [
  "auto_verified",
  "pending",
  "rejected",
];

/**
 * GET /api/admin/payments
 *
 * Returns all payment records, optionally filtered by `payment_status`.
 *
 * Query parameters:
 *   ?payment_status=auto_verified   – filter by status
 *
 * Response: JSON array of payment rows joined with registration data.
 */
export async function GET(
  req: NextRequest
) {
  try {
    // ---------- Auth check ----------
    const auth = await verifyAdmin(req);
    if (auth instanceof NextResponse) return auth;

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("payment_status") as PaymentStatus | null;

    // Validate the filter value if provided
    if (statusFilter && !VALID_STATUSES.includes(statusFilter)) {
      return NextResponse.json(
        {
          error: `Invalid payment_status filter. Allowed values: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Build query — select payments with related registration info
    let query = supabase
      .from("payments")
      .select(
        `
        id,
        registration_id,
        utr_number,
        screenshot_url,
        image_hash,
        payment_status,
        created_at,
        registrations (
          name,
          department,
          year,
          phone
        )
      `
      )
      .order("created_at", { ascending: false });

    // Apply optional status filter
    if (statusFilter) {
      query = query.eq("payment_status", statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Admin payments query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch payments." },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch (error) {
    console.error("Unhandled error in /api/admin/payments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
