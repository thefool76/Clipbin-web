import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "invalid email format" }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("testing_emails").insert({
      email,
      source: "website_home"
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "email already on testing list" }, { status: 409 });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Successfully registered for testing." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
