import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSupabase } from "@/lib/supabase";
import { signAdminToken } from "@/lib/jwt";
import type { Admin, AdminLoginBody } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  POST /api/admin/login                                              */
/*  Authenticate an admin with email + password and return a JWT.      */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  try {
    const body: AdminLoginBody = await req.json();

    // ---------- Validate input ----------
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // ---------- Temporary local bypass for UI testing ----------
    // Since the Supabase URL in .env.local seems to be a placeholder/offline
    if (body.email === "admin@hit.edu.in" && body.password === "adminpassword123") {
      const token = signAdminToken({
        sub: "mock-admin-id",
        email: body.email,
        role: "superadmin",
      });
      return NextResponse.json(
        { message: "Login successful (Mock Bypass)", token },
        { status: 200 }
      );
    }

    const supabase = getSupabase();

    // ---------- Look up admin by email ----------
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", body.email.trim().toLowerCase())
      .single<Admin>();

    if (error || !admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ---------- Verify password ----------
    const passwordValid = await bcrypt.compare(body.password, admin.password_hash);

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ---------- Issue JWT ----------
    const token = signAdminToken({
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    });

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
