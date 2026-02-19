import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { signUserToken } from "@/lib/jwt";

/* ------------------------------------------------------------------ */
/*  GET /api/auth/callback                                             */
/*  Google OAuth 2.0 callback — exchanges code for user info,          */
/*  upserts into the `users` table, and returns a signed JWT.          */
/* ------------------------------------------------------------------ */

interface GoogleTokenResponse {
    access_token: string;
    id_token: string;
    token_type: string;
}

interface GoogleUserInfo {
    sub: string;
    email: string;
    name: string;
    picture?: string;
    email_verified?: boolean;
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error) {
            return NextResponse.json(
                { error: `OAuth error: ${error}` },
                { status: 400 }
            );
        }

        if (!code) {
            return NextResponse.json(
                { error: "Missing authorization code" },
                { status: 400 }
            );
        }

        // ---------- Environment ----------
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return NextResponse.json(
                { error: "Google OAuth is not configured" },
                { status: 500 }
            );
        }

        const baseUrl =
            process.env.NEXT_PUBLIC_APP_URL ||
            (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : "http://localhost:3000");

        const redirectUri = `${baseUrl}/api/auth/callback`;

        // ---------- Exchange code for tokens ----------
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        if (!tokenRes.ok) {
            const errBody = await tokenRes.text();
            console.error("Token exchange failed:", errBody);
            return NextResponse.json(
                { error: "Failed to exchange authorization code" },
                { status: 400 }
            );
        }

        const tokens: GoogleTokenResponse = await tokenRes.json();

        // ---------- Fetch user info ----------
        const userInfoRes = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        );

        if (!userInfoRes.ok) {
            return NextResponse.json(
                { error: "Failed to fetch user info from Google" },
                { status: 400 }
            );
        }

        const userInfo: GoogleUserInfo = await userInfoRes.json();

        // ---------- Optional domain restriction ----------
        const allowedDomain = process.env.ALLOWED_USER_DOMAIN;
        if (allowedDomain && !userInfo.email.endsWith(`@${allowedDomain}`)) {
            return NextResponse.json(
                { error: `Only @${allowedDomain} email addresses are allowed` },
                { status: 403 }
            );
        }

        // ---------- Upsert user in Supabase ----------
        const supabase = getSupabase();

        const { data: user, error: upsertError } = await supabase
            .from("users")
            .upsert(
                {
                    email: userInfo.email,
                    name: userInfo.name,
                    avatar_url: userInfo.picture || null,
                },
                { onConflict: "email" }
            )
            .select("id, email, name")
            .single();

        if (upsertError || !user) {
            console.error("User upsert error:", upsertError);
            return NextResponse.json(
                { error: "Failed to create or update user" },
                { status: 500 }
            );
        }

        // ---------- Sign JWT ----------
        const token = signUserToken({
            sub: user.id,
            email: user.email,
            name: user.name,
        });

        // Redirect to frontend with the token as a query parameter.
        // The frontend should read the token and store it (e.g. localStorage).
        const frontendUrl = `${baseUrl}/auth/success?token=${encodeURIComponent(token)}`;

        return NextResponse.redirect(frontendUrl);
    } catch (err) {
        console.error("OAuth callback error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
