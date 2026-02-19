"use client";

import { useState, useEffect, FormEvent } from "react";
import Script from "next/script";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface OrderResponse {
    order_id: string;
    amount: number;
    currency: string;
    key_id: string;
}

type Step = "form" | "processing" | "success" | "failed";

/* ------------------------------------------------------------------ */
/*  Extend Window for Razorpay                                         */
/* ------------------------------------------------------------------ */

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function TestPaymentPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState<Step>("form");
    const [error, setError] = useState<string | null>(null);
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [sdkReady, setSdkReady] = useState(false);

    const addLog = (msg: string) => {
        const ts = new Date().toLocaleTimeString();
        setLogs((prev) => [...prev, `[${ts}] ${msg}`]);
    };

    /* Auto-scroll logs to bottom */
    useEffect(() => {
        const el = document.getElementById("log-panel");
        if (el) el.scrollTop = el.scrollHeight;
    }, [logs]);

    /* ---------------------------------------------------------------- */
    /*  Submit handler                                                   */
    /* ---------------------------------------------------------------- */

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!sdkReady) {
            setError("Razorpay SDK is still loading. Please wait.");
            return;
        }

        /* ── Step 1: Create order via our backend ── */
        setStep("processing");
        addLog("📡 Calling POST /api/payment/create-order …");

        try {
            const res = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone }),
            });

            const data = await res.json();

            if (!res.ok) {
                addLog(`❌ Server returned ${res.status}: ${data.error}`);
                setError(data.error || "Failed to create order");
                setStep("failed");
                return;
            }

            const order: OrderResponse = data;
            setOrderId(order.order_id);
            addLog(`✅ Order created: ${order.order_id}`);
            addLog(
                `   Amount: ₹${(order.amount / 100).toFixed(2)} | Currency: ${order.currency}`
            );

            /* ── Step 2: Open Razorpay checkout ── */
            addLog("💳 Opening Razorpay checkout modal …");

            const options = {
                key: order.key_id,
                amount: order.amount,
                currency: order.currency,
                name: "Riviera Fest",
                description: "Fest Pass – Test Payment",
                order_id: order.order_id,
                prefill: { name, email, contact: phone },
                theme: { color: "#4f46e5" },

                handler: function (response: {
                    razorpay_payment_id: string;
                    razorpay_order_id: string;
                    razorpay_signature: string;
                }) {
                    addLog(`✅ Payment successful!`);
                    addLog(`   Payment ID : ${response.razorpay_payment_id}`);
                    addLog(`   Order ID   : ${response.razorpay_order_id}`);
                    addLog(`   Signature  : ${response.razorpay_signature.slice(0, 20)}…`);
                    addLog(`🔔 Razorpay will now call your webhook at POST /api/payment/webhook`);
                    setPaymentId(response.razorpay_payment_id);
                    setStep("success");
                },

                modal: {
                    ondismiss: function () {
                        addLog("⚠️ User closed Razorpay modal without paying");
                        setStep("form");
                    },
                },
            };

            const rzp = new window.Razorpay(options);

            rzp.on(
                "payment.failed",
                function (response: {
                    error: {
                        code: string;
                        description: string;
                        reason: string;
                    };
                }) {
                    addLog(`❌ Payment failed!`);
                    addLog(`   Code   : ${response.error.code}`);
                    addLog(`   Reason : ${response.error.reason}`);
                    addLog(`   Detail : ${response.error.description}`);
                    setError(response.error.description);
                    setStep("failed");
                }
            );

            rzp.open();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            addLog(`❌ Error: ${msg}`);
            setError(msg);
            setStep("failed");
        }
    };

    /* ---------------------------------------------------------------- */
    /*  Render                                                           */
    /* ---------------------------------------------------------------- */

    return (
        <>
            {/* Razorpay Checkout SDK */}
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => {
                    setSdkReady(true);
                    addLog("✅ Razorpay SDK loaded");
                }}
            />

            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 md:p-8">
                {/* Header */}
                <div className="max-w-5xl mx-auto mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        🧪 Razorpay Payment Test
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Test the full payment flow: fill form → create order → pay via
                        Razorpay → webhook updates DB.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                    {/* ── Left Column: Form / Status ── */}
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
                        {/* Flow Diagram */}
                        <div className="flex items-center gap-2 mb-6 text-xs overflow-x-auto pb-2">
                            {[
                                { label: "Fill Form", active: step === "form" },
                                { label: "Create Order", active: step === "processing" },
                                { label: "Razorpay Checkout", active: step === "processing" },
                                {
                                    label: "Result",
                                    active: step === "success" || step === "failed",
                                },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    {i > 0 && (
                                        <div className="w-6 h-px bg-gray-700 flex-shrink-0" />
                                    )}
                                    <span
                                        className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${s.active
                                                ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50"
                                                : "bg-gray-800 text-gray-500"
                                            }`}
                                    >
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Form State */}
                        {step === "form" && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Ayushman Rana"
                                        className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="ayushman@example.com"
                                        className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder="9876543210"
                                        className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={!sdkReady}
                                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                                >
                                    {sdkReady ? "Pay ₹499 – Test" : "Loading Razorpay SDK…"}
                                </button>

                                <p className="text-xs text-gray-600 text-center">
                                    Use Razorpay test card: 4111 1111 1111 1111 • Any future
                                    expiry • Any CVV
                                </p>
                            </form>
                        )}

                        {/* Processing State */}
                        {step === "processing" && (
                            <div className="flex flex-col items-center gap-4 py-10">
                                <div className="w-12 h-12 border-4 border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
                                <p className="text-gray-400">Processing payment…</p>
                            </div>
                        )}

                        {/* Success State */}
                        {step === "success" && (
                            <div className="text-center py-8 space-y-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold">Payment Successful!</h2>
                                <div className="text-sm text-gray-400 space-y-1">
                                    <p>
                                        Payment ID:{" "}
                                        <code className="text-indigo-400">{paymentId}</code>
                                    </p>
                                    <p>
                                        Order ID:{" "}
                                        <code className="text-indigo-400">{orderId}</code>
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                                    Razorpay will send a webhook to{" "}
                                    <code className="text-gray-400">
                                        POST /api/payment/webhook
                                    </code>{" "}
                                    to confirm the payment and update the DB status to
                                    &quot;paid&quot;.
                                </p>
                                <button
                                    onClick={() => {
                                        setStep("form");
                                        setLogs([]);
                                        setError(null);
                                        setPaymentId(null);
                                        setOrderId(null);
                                    }}
                                    className="mt-4 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Test Another Payment
                                </button>
                            </div>
                        )}

                        {/* Failed State */}
                        {step === "failed" && (
                            <div className="text-center py-8 space-y-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-red-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold">Payment Failed</h2>
                                {error && <p className="text-sm text-red-400">{error}</p>}
                                <button
                                    onClick={() => {
                                        setStep("form");
                                        setError(null);
                                    }}
                                    className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ── Right Column: Live Log ── */}
                    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                Live Log
                            </h2>
                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Monitoring
                            </span>
                        </div>

                        <div
                            id="log-panel"
                            className="flex-1 min-h-[300px] max-h-[500px] overflow-y-auto bg-gray-950/50 rounded-lg p-4 font-mono text-xs space-y-1 border border-gray-800/50"
                        >
                            {logs.length === 0 ? (
                                <p className="text-gray-600 italic">
                                    Fill the form and click &quot;Pay&quot; to see the flow
                                    here…
                                </p>
                            ) : (
                                logs.map((log, i) => (
                                    <div
                                        key={i}
                                        className={`leading-relaxed ${log.includes("❌")
                                                ? "text-red-400"
                                                : log.includes("✅")
                                                    ? "text-green-400"
                                                    : log.includes("⚠️")
                                                        ? "text-yellow-400"
                                                        : log.includes("📡") || log.includes("💳") || log.includes("🔔")
                                                            ? "text-indigo-400"
                                                            : "text-gray-400"
                                            }`}
                                    >
                                        {log}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Flow Explanation */}
                        <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-800/50">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                How It Works
                            </h3>
                            <ol className="text-xs text-gray-500 space-y-2 list-decimal list-inside">
                                <li>
                                    Frontend sends <code className="text-gray-400">POST /api/payment/create-order</code> with user info
                                </li>
                                <li>
                                    Backend creates a Razorpay order (₹499) &amp; saves it to DB with status <code className="text-gray-400">&quot;created&quot;</code>
                                </li>
                                <li>
                                    Razorpay checkout modal opens for the user to pay
                                </li>
                                <li>
                                    On success, Razorpay sends a webhook to <code className="text-gray-400">POST /api/payment/webhook</code>
                                </li>
                                <li>
                                    Webhook verifies signature &amp; updates DB status to <code className="text-gray-400">&quot;paid&quot;</code>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
