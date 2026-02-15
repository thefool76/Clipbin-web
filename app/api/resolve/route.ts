import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { ResolveResponse } from "@/lib/types";

const SHORT_CODE_PATTERN = /^[A-Za-z0-9_-]{4,64}$/;
const MAX_PASSWORD_LENGTH = 256;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { shortCode?: string; password?: string | null };
    const shortCode = body.shortCode?.trim();
    const password = body.password?.trim() || null;

    if (!shortCode) {
      return NextResponse.json({ error: "shortCode is required" }, { status: 400 });
    }

    if (!SHORT_CODE_PATTERN.test(shortCode)) {
      return NextResponse.json({ error: "Invalid shortCode format" }, { status: 400 });
    }

    if (password && password.length > MAX_PASSWORD_LENGTH) {
      return NextResponse.json({ error: "Password is too long" }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.rpc("resolve_clip", {
      p_short_code: shortCode,
      p_password: password,
      p_source: "web_public"
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const first = (data?.[0] ?? null) as ResolveResponse | null;
    if (!first) {
      return NextResponse.json({ error: "Empty response" }, { status: 500 });
    }

    return NextResponse.json(first, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
