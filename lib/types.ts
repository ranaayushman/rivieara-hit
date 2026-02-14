/* ------------------------------------------------------------------ */
/*  Shared TypeScript types for the College Fest backend               */
/* ------------------------------------------------------------------ */

/** Shape of a row in the `registrations` table */
export interface Registration {
  id: string;
  name: string;
  department: string;
  year: string;
  phone: string;
  created_at: string;
}

/** Allowed payment statuses */
export type PaymentStatus = "auto_verified" | "pending" | "rejected";

/** Shape of a row in the `payments` table */
export interface Payment {
  id: string;
  registration_id: string;
  utr_number: string;
  screenshot_url: string;
  image_hash: string;
  payment_status: PaymentStatus;
  created_at: string;
}

/** Fields expected from the registration form */
export interface RegistrationFormFields {
  name: string;
  department: string;
  year: string;
  phone: string;
  utr: string;
  screenshot: File;
}

/** Standard JSON error response */
export interface ApiError {
  error: string;
}

/** Standard JSON success response for registration */
export interface RegistrationSuccess {
  message: string;
  registration_id: string;
  payment_status: PaymentStatus;
}

/* ------------------------------------------------------------------ */
/*  Admin types                                                        */
/* ------------------------------------------------------------------ */

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
  sub: string;      // admin id
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/* ------------------------------------------------------------------ */
/*  Event types                                                        */
/* ------------------------------------------------------------------ */

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
