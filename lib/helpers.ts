/* ------------------------------------------------------------------ */
/*  Shared helper utilities                                            */
/* ------------------------------------------------------------------ */

/** Allowed MIME types for event banner images */
export const ALLOWED_BANNER_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

/** Maximum file size in bytes (5 MB) */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

/**
 * Build a unique, URL-safe file name for storage.
 * Format: `<timestamp>-<sanitised-original-name>`
 */
export function buildFileName(originalName: string): string {
  const sanitised = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${Date.now()}-${sanitised}`;
}
