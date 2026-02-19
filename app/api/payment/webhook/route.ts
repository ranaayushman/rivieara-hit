import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyWebhookSignature } from "@/lib/razorpay";

/* ------------------------------------------------------------------ */
/*  POST /api/payment/webhook                                          */
/*  Razorpay webhook handler — verifies signature, updates payment.    */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) {
            console.error("Missing RAZORPAY_WEBHOOK_SECRET");
            return NextResponse.json(
                { error: "Webhook not configured" },
                { status: 500 }
            );
        }

        // ---------- Read raw body & signature ----------
        const rawBody = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        if (!signature) {
            return NextResponse.json(
                { error: "Missing webhook signature" },
                { status: 400 }
            );
        }

        // ---------- Verify HMAC SHA256 ----------
        const isValid = verifyWebhookSignature(rawBody, signature, secret);

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid webhook signature" },
                { status: 400 }
            );
        }

        // ---------- Parse event ----------
        const event = JSON.parse(rawBody);
        const eventType: string = event.event;

        if (eventType === "payment.captured") {
            const payment = event.payload?.payment?.entity;

            if (!payment) {
                return NextResponse.json(
                    { error: "Malformed webhook payload" },
                    { status: 400 }
                );
            }

            const orderId: string = payment.order_id;
            const paymentId: string = payment.id;

            // ---------- Update payment in DB ----------
            const supabase = getSupabase();

            const { error: updateError } = await supabase
                .from("payments")
                .update({
                    status: "paid",
                    razorpay_payment_id: paymentId,
                })
                .eq("razorpay_order_id", orderId);

            if (updateError) {
                console.error("Webhook DB update error:", updateError);
                return NextResponse.json(
                    { error: "Failed to update payment" },
                    { status: 500 }
                );
            }

            console.log(`✅ Payment captured: order=${orderId} payment=${paymentId}`);
        }

        // For any event type (including unhandled ones), acknowledge receipt
        return NextResponse.json({ status: "ok" }, { status: 200 });
    } catch (err) {
        console.error("Webhook handler error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
