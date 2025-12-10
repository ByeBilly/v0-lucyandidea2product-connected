import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";

function createAdminClient() {
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY;

  if (!serviceKey) {
    throw new Error("Missing Supabase service key");
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: existingUser, error: checkError } = await supabase
      .from("waitlist")
      .select("id, created_at")
      .eq("email", email.toLowerCase())
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("[Waitlist] Check error:", checkError);
      return NextResponse.json(
        { error: "Failed to check waitlist" },
        { status: 500 }
      );
    }

    if (existingUser) {
      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .lte("created_at", existingUser.created_at);

      return NextResponse.json({
        success: true,
        message: "Already registered",
        position: count || 1,
        alreadyRegistered: true,
      });
    }

    const { data, error: insertError } = await supabase
      .from("waitlist")
      .insert({
        email: email.toLowerCase(),
        name: name?.trim() || null,
        status: "pending",
      })
      .select("id, created_at")
      .single();

    if (insertError) {
      console.error("[Waitlist] Insert error:", insertError);
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .lte("created_at", data.created_at);

    return NextResponse.json({
      success: true,
      message: "Successfully joined waitlist",
      position: count || 1,
    });
  } catch (error) {
    console.error("[Waitlist] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { count: totalCount } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const { data: recentSignups } = await supabase
      .from("waitlist")
      .select("email, name, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    return NextResponse.json({
      totalCount: totalCount || 0,
      recentSignups: recentSignups || [],
    });
  } catch (error) {
    console.error("[Waitlist] GET Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

