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

/* ── Sponsor ──────────────────────────────────────────────────────── */

export interface Sponsor {
  id: string;
  name: string;
  tier: string;          // free-text: "Title Sponsor", "Golden Food Partner", etc.
  logo_url: string;
  website_url: string | null;
  bg_color: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

/* ── Gallery ──────────────────────────────────────────────────────── */

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  images?: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

/* ── Schedule ────────────────────────────────────────────────────── */

export interface ScheduleItem {
  id: string;
  day_label: string;
  time: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

/* ── Activity ────────────────────────────────────────────────────── */

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

/* ── Site Settings ───────────────────────────────────────────────── */

export interface SiteSetting {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

/* ── Contact Inquiry ─────────────────────────────────────────────── */

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

/* ── Generic ──────────────────────────────────────────────────────── */

/** Standard JSON error response */
export interface ApiError {
  error: string;
}
