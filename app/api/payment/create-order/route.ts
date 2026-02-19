import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getRazorpayInstance } from "@/lib/razorpay";
import { validatePaymentInput } from "@/lib/validators";
import type { CreateOrderBody } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  POST /api/payment/create-order                                     */
/*  Create a Razorpay order and save it in the payments table.         */
/* ------------------------------------------------------------------ */

/** Fest pass amount in paise (e.g. ₹499 = 49900) */
const FEST_AMOUNT_PAISE = 49900;

export async function POST(req: NextRequest) {
    try {
        const body: CreateOrderBody = await req.json();

        // ---------- Validate input ----------
        const inputError = validatePaymentInput(body);
        if (inputError) {
            return NextResponse.json({ error: inputError }, { status: 400 });
        }

        // ---------- Create Razorpay order ----------
        const razorpay = getRazorpayInstance();

        const order = await razorpay.orders.create({
            amount: FEST_AMOUNT_PAISE,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
            notes: {
                name: body.name,
                email: body.email,
                phone: body.phone,
            },
        });

        // ---------- Save to DB ----------
        const supabase = getSupabase();

        const { error: insertError } = await supabase.from("payments").insert({
            name: body.name.trim(),
            email: body.email.trim().toLowerCase(),
            phone: body.phone.trim(),
            razorpay_order_id: order.id,
            amount: FEST_AMOUNT_PAISE,
            status: "created",
        });

        if (insertError) {
            console.error("Payment insert error:", insertError);
            return NextResponse.json(
                { error: "Failed to save payment record" },
                { status: 500 }
            );
        }

        // ---------- Return order details to frontend ----------
        return NextResponse.json(
            {
                order_id: order.id,
                amount: FEST_AMOUNT_PAISE,
                currency: "INR",
                key_id: process.env.RAZORPAY_KEY_ID,
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("Create order error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
