import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";

function getSupabase() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY;
  if (!key) throw new Error("Missing service key");
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id, created_at")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .lte("created_at", existing.created_at);
      return NextResponse.json({ success: true, position: count || 1, alreadyRegistered: true });
    }

    const { data, error } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase(), name: name?.trim() || null, status: "pending" })
      .select("created_at")
      .single();

    if (error) {
      console.error("[Waitlist]", error);
      return NextResponse.json({ error: "Failed to join" }, { status: 500 });
    }

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .lte("created_at", data.created_at);

    return NextResponse.json({ success: true, position: count || 1 });
  } catch (e) {
    console.error("[Waitlist]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true });
    return NextResponse.json({ totalCount: count || 0 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


