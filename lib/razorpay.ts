import crypto from "crypto";
import Razorpay from "razorpay";

/* ------------------------------------------------------------------ */
/*  Razorpay SDK instance (lazy-init)                                  */
/* ------------------------------------------------------------------ */

let _instance: Razorpay | null = null;

export function getRazorpayInstance(): Razorpay {
    if (_instance) return _instance;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
        throw new Error(
            "Missing Razorpay env vars. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local"
        );
    }

    _instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
    return _instance;
}

/* ------------------------------------------------------------------ */
/*  Webhook signature verification                                     */
/* ------------------------------------------------------------------ */

/**
 * Verify a Razorpay webhook signature using HMAC SHA256.
 * Returns `true` if the signature is valid.
 */
export function verifyWebhookSignature(
    body: string,
    signature: string,
    secret: string
): boolean {
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex");

    return crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(signature, "hex")
    );
}
