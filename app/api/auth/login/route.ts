import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSupabase } from "@/lib/supabase";
import { signUserToken } from "@/lib/jwt";

/* ── POST /api/auth/login — login with email + password ────────── */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const supabase = getSupabase();

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email.trim().toLowerCase())
            .single();

        if (error || !user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // User registered via Google (no password)
        if (!user.password_hash) {
            return NextResponse.json(
                { error: "This account was created via Google. Please use Google Sign-In." },
                { status: 400 }
            );
        }

        const passwordValid = await bcrypt.compare(password, user.password_hash);
        if (!passwordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = signUserToken({
            sub: user.id,
            email: user.email,
            name: user.name,
        });

        return NextResponse.json({
            message: "Login successful",
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
