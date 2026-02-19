import type { CreateOrderBody } from "./types";

/* ------------------------------------------------------------------ */
/*  Input validation helpers                                           */
/* ------------------------------------------------------------------ */

/** Basic email format check */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Basic phone number check (10–15 digits, optional leading +) */
export function isValidPhone(phone: string): boolean {
    return /^\+?\d{10,15}$/.test(phone);
}

/**
 * Validate the create-order request body.
 * Returns an error message string, or `null` if the input is valid.
 */
export function validatePaymentInput(body: CreateOrderBody): string | null {
    if (!body.name || body.name.trim().length < 2) {
        return "Name is required (minimum 2 characters).";
    }

    if (!body.email || !isValidEmail(body.email)) {
        return "A valid email address is required.";
    }

    if (!body.phone || !isValidPhone(body.phone)) {
        return "A valid phone number is required (10–15 digits).";
    }

    return null;
}
