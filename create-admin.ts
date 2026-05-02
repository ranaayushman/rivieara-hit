import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const email = "admin@hit.edu.in";
  const plainPassword = "adminpassword123";
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const { data, error } = await supabase
    .from("admins")
    .upsert({
      email: email,
      password_hash: passwordHash,
      role: "superadmin"
    }, { onConflict: "email" })
    .select();

  if (error) {
    console.error("Error creating admin:", error);
  } else {
    console.log("Successfully created admin!");
    console.log("Email:", email);
    console.log("Password:", plainPassword);
  }
}

createAdmin();
