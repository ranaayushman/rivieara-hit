import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSupabase } from "@/lib/supabase";
import { signUserToken } from "@/lib/jwt";

/* ── POST /api/auth/register — register with email + password ──── */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password, college, phone } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const supabase = getSupabase();

        // Check if user already exists
        const { data: existing } = await supabase
            .from("users")
            .select("id")
            .eq("email", email.trim().toLowerCase())
            .single();

        if (existing) {
            return NextResponse.json(
                { error: "An account with this email already exists" },
                { status: 409 }
            );
        }

        // Hash the password
        const password_hash = await bcrypt.hash(password, 12);

        // Create user
        const { data: user, error } = await supabase
            .from("users")
            .insert({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password_hash,
                college: college?.trim() || null,
                phone: phone?.trim() || null,
            })
            .select("id, email, name")
            .single();

        if (error || !user) {
            console.error("Registration error:", error);
            return NextResponse.json(
                { error: "Failed to create account" },
                { status: 500 }
            );
        }

        // Sign JWT
        const token = signUserToken({
            sub: user.id,
            email: user.email,
            name: user.name,
        });

        return NextResponse.json(
            { message: "Account created successfully", token, user },
            { status: 201 }
        );
    } catch (err) {
        console.error("Register error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
