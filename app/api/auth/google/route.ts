import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  GET /api/auth/google                                               */
/*  Redirects the browser to Google's OAuth 2.0 consent screen.        */
/* ------------------------------------------------------------------ */

export async function GET() {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        if (!clientId) {
            return NextResponse.json(
                { error: "Google OAuth is not configured" },
                { status: 500 }
            );
        }

        // Build the callback URL dynamically from the deployment URL
        const baseUrl =
            process.env.NEXT_PUBLIC_APP_URL ||
            (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : "http://localhost:3000");

        const redirectUri = `${baseUrl}/api/auth/callback`;

        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: "code",
            scope: "openid email profile",
            access_type: "offline",
            prompt: "consent",
        });

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

        return NextResponse.redirect(googleAuthUrl);
    } catch (err) {
        console.error("Google OAuth redirect error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
