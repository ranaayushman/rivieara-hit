"use client";

const TOKEN_KEY = "admin_token";

/** Save the JWT to localStorage */
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/** Retrieve the JWT from localStorage */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Remove the JWT (logout) */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** Build an Authorization header object */
export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
