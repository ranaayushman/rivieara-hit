import crypto from "crypto";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import type { AdminJwtPayload } from "./types";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/** Allowed MIME types for payment screenshots */
export const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"];

/** Allowed MIME types for event banner images */
export const ALLOWED_BANNER_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

/** Maximum file size in bytes (5 MB) */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/* ------------------------------------------------------------------ */
/*  Helper functions                                                   */
/* ------------------------------------------------------------------ */

/**
 * Generate a SHA-256 hex digest for a given buffer.
 * Used to detect duplicate screenshot uploads.
 */
export async function generateImageHash(buffer: Buffer): Promise<string> {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

/**
 * Validate that a file meets the accepted type and size constraints.
 * Returns an error message string, or `null` if the file is valid.
 */
export function validateFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return "Invalid file type. Only PNG and JPG images are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File too large. Maximum allowed size is 5 MB.";
  }

  return null;
}

/**
 * Build a unique, URL-safe file name for storage.
 * Format: `<timestamp>-<sanitised-original-name>`
 */
export function buildFileName(originalName: string): string {
  const sanitised = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${Date.now()}-${sanitised}`;
}

/* ------------------------------------------------------------------ */
/*  JWT / Auth helpers                                                 */
/* ------------------------------------------------------------------ */

/**
 * Return the JWT secret from env, or throw if missing.
 */
function getJwtSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_JWT_SECRET env variable");
  }
  return secret;
}

/**
 * Sign a JWT token for an authenticated admin.
 * Token expires in 24 hours.
 */
export function signAdminToken(payload: Omit<AdminJwtPayload, "iat" | "exp">): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "24h" });
}

/**
 * Verify the admin JWT from the Authorization header.
 * Returns the decoded payload or a NextResponse with 401.
 */
export async function verifyAdmin(
  req: NextRequest
): Promise<AdminJwtPayload | NextResponse> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or malformed Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AdminJwtPayload;
    return decoded;
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

/**
 * Validate an event banner file (type + size).
 * Returns an error message string, or null if valid.
 */
export function validateBannerFile(file: File): string | null {
  if (!ALLOWED_BANNER_MIME_TYPES.includes(file.type)) {
    return "Invalid file type. Only JPG, PNG, and WebP images are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File too large. Maximum allowed size is 5 MB.";
  }

  return null;
}
