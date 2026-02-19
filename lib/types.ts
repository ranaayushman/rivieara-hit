/* ------------------------------------------------------------------ */
/*  Shared TypeScript types for the Riviera Fest backend               */
/* ------------------------------------------------------------------ */

/* ── Admin ────────────────────────────────────────────────────────── */

/** Shape of a row in the `admins` table */
export interface Admin {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
}

/** POST body for admin login */
export interface AdminLoginBody {
  email: string;
  password: string;
}

/** Payload stored inside the admin JWT */
export interface AdminJwtPayload {
  sub: string; // admin id
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/* ── User (Google OAuth) ──────────────────────────────────────────── */

/** Shape of a row in the `users` table */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
}

/** Payload stored inside the user JWT */
export interface UserJwtPayload {
  sub: string; // user id
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

/* ── Event ────────────────────────────────────────────────────────── */

/** Shape of a row in the `events` table */
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  banner_url: string | null;
  created_at: string;
}

/** Fields accepted when creating / updating an event */
export interface EventFormFields {
  title: string;
  description: string;
  date: string;
  venue: string;
  image?: File | null;
}

/* ── Payment (Razorpay) ──────────────────────────────────────────── */

/** Allowed payment statuses */
export type PaymentStatus = "created" | "paid" | "failed" | "expired";

/** Shape of a row in the `payments` table */
export interface RazorpayPayment {
  id: string;
  name: string;
  email: string;
  phone: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: number;
  status: PaymentStatus;
  created_at: string;
}

/** POST body for creating a payment order */
export interface CreateOrderBody {
  name: string;
  email: string;
  phone: string;
}

/* ── Generic ──────────────────────────────────────────────────────── */

/** Standard JSON error response */
export interface ApiError {
  error: string;
}
