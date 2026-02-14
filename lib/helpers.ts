import crypto from "crypto";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/** Allowed MIME types for payment screenshots */
export const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"];

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
