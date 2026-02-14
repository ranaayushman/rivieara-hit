import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { generateImageHash, validateFile, buildFileName } from "@/lib/helpers";
import type { ApiError, RegistrationSuccess } from "@/lib/types";

/**
 * POST /api/register-payment
 *
 * Accepts multipart form-data with:
 *   name, department, year, phone, utr, screenshot (file)
 *
 * Flow:
 *   1. Validate required fields & file constraints (type + size)
 *   2. Check for duplicate UTR number
 *   3. Hash the screenshot and check for duplicate image
 *   4. Upload screenshot to Supabase Storage
 *   5. Insert registration row
 *   6. Insert payment row with status "auto_verified"
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<RegistrationSuccess | ApiError>> {
  try {
    const formData = await req.formData();

    // ── Extract fields ──────────────────────────────────────────────
    const name = formData.get("name") as string | null;
    const department = formData.get("department") as string | null;
    const year = formData.get("year") as string | null;
    const phone = formData.get("phone") as string | null;
    const utr = formData.get("utr") as string | null;
    const screenshot = formData.get("screenshot") as File | null;

    // ── 1. Validate required fields ─────────────────────────────────
    if (!name || !department || !year || !phone || !utr || !screenshot) {
      return NextResponse.json(
        { error: "Missing required fields: name, department, year, phone, utr, screenshot" },
        { status: 400 }
      );
    }

    // ── 2. Validate file type & size ────────────────────────────────
    const fileError = validateFile(screenshot);
    if (fileError) {
      return NextResponse.json({ error: fileError }, { status: 400 });
    }

    const supabase = getSupabase();

    // ── 3. Check for duplicate UTR ──────────────────────────────────
    const { data: existingUTR } = await supabase
      .from("payments")
      .select("id")
      .eq("utr_number", utr)
      .maybeSingle();

    if (existingUTR) {
      return NextResponse.json(
        { error: "Duplicate UTR detected. This transaction reference has already been used." },
        { status: 409 }
      );
    }

    // ── 4. Generate image hash & check for duplicate screenshot ─────
    const buffer = Buffer.from(await screenshot.arrayBuffer());
    const imageHash = await generateImageHash(buffer);

    const { data: existingHash } = await supabase
      .from("payments")
      .select("id")
      .eq("image_hash", imageHash)
      .maybeSingle();

    if (existingHash) {
      return NextResponse.json(
        { error: "Duplicate screenshot detected. This image has already been submitted." },
        { status: 409 }
      );
    }

    // ── 5. Upload screenshot to Supabase Storage ────────────────────
    const fileName = buildFileName(screenshot.name);

    const { error: uploadError } = await supabase.storage
      .from("payment-screenshots")
      .upload(fileName, buffer, {
        contentType: screenshot.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Screenshot upload failed. Please try again." },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("payment-screenshots")
      .getPublicUrl(fileName);

    // ── 6. Insert registration record ───────────────────────────────
    const { data: registration, error: regError } = await supabase
      .from("registrations")
      .insert({ name, department, year, phone })
      .select("id")
      .single();

    if (regError || !registration) {
      console.error("Registration insert error:", regError);
      return NextResponse.json(
        { error: "Failed to create registration." },
        { status: 500 }
      );
    }

    // ── 7. Insert payment record ────────────────────────────────────
    const { error: payError } = await supabase.from("payments").insert({
      registration_id: registration.id,
      utr_number: utr,
      screenshot_url: publicUrlData.publicUrl,
      image_hash: imageHash,
      payment_status: "auto_verified",
    });

    if (payError) {
      console.error("Payment insert error:", payError);
      return NextResponse.json(
        { error: "Failed to record payment." },
        { status: 500 }
      );
    }

    // ── Success ─────────────────────────────────────────────────────
    return NextResponse.json(
      {
        message: "Registration successful",
        registration_id: registration.id,
        payment_status: "auto_verified",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unhandled error in /api/register-payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
