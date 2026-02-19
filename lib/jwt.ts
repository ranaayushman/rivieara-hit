import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import type { AdminJwtPayload, UserJwtPayload } from "./types";

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                    */
/* ------------------------------------------------------------------ */

function getJwtSecret(): string {
    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret) {
        throw new Error("Missing ADMIN_JWT_SECRET env variable");
    }
    return secret;
}

/* ------------------------------------------------------------------ */
/*  Admin JWT                                                           */
/* ------------------------------------------------------------------ */

/**
 * Sign a JWT token for an authenticated admin.
 * Token expires in 24 hours.
 */
export function signAdminToken(
    payload: Omit<AdminJwtPayload, "iat" | "exp">
): string {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: "24h" });
}

/**
 * Verify the admin JWT from the Authorization header.
 * Returns the decoded payload or a NextResponse with 401.
 */
export async function verifyAdminToken(
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

/* ------------------------------------------------------------------ */
/*  User JWT (Google OAuth users)                                      */
/* ------------------------------------------------------------------ */

/**
 * Sign a JWT token for a Google-authenticated user.
 * Token expires in 7 days.
 */
export function signUserToken(
    payload: Omit<UserJwtPayload, "iat" | "exp">
): string {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

/**
 * Verify the user JWT from the Authorization header.
 * Returns the decoded payload or a NextResponse with 401.
 */
export async function verifyUserToken(
    req: NextRequest
): Promise<UserJwtPayload | NextResponse> {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { error: "Missing or malformed Authorization header" },
            { status: 401 }
        );
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, getJwtSecret()) as UserJwtPayload;
        return decoded;
    } catch {
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
        );
    }
}
