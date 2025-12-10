import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const isDevelopment = process.env.NODE_ENV === "development";

function getSupabase() {
  // Log environment variable status (without exposing the key)
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  console.log("[Waitlist] Environment check:", {
    hasServiceKey: !!serviceKey,
    serviceKeyLength: serviceKey?.length || 0,
    serviceKeySource: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SUPABASE_SERVICE_ROLE_KEY" : process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY ? "NEXT_PRIVATE_SUPABASE_SERVICE_KEY" : "none",
    hasSupabaseUrl: !!supabaseUrl,
    supabaseUrl: supabaseUrl || "missing",
  });

  if (!serviceKey) {
    const error = "Missing Supabase service key - check SUPABASE_SERVICE_ROLE_KEY or NEXT_PRIVATE_SUPABASE_SERVICE_KEY";
    console.error("[Waitlist]", error);
    throw new Error(error);
  }

  if (!supabaseUrl) {
    const error = "Missing NEXT_PUBLIC_SUPABASE_URL";
    console.error("[Waitlist]", error);
    throw new Error(error);
  }

  // Use createClient directly for API routes (bypasses RLS with service role key)
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    
    console.log("[Waitlist] POST request received:", { 
      email: email ? `${email.substring(0, 3)}***` : "missing",
      hasName: !!name,
    });

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const supabase = getSupabase();

    // Try to insert directly - handle duplicates if they exist
    // This is more efficient and avoids RLS check issues
    const { data, error } = await supabase
      .from("waitlist")
      .insert({ 
        email: email.toLowerCase(), 
        name: name?.trim() || null, 
        status: "pending" 
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("[Waitlist] Insert error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        fullError: isDevelopment ? error : undefined,
      });

      // Handle duplicate key error - email already exists
      if (error.code === "23505" || error.message?.includes("duplicate") || error.message?.includes("unique")) {
        console.log("[Waitlist] Email already exists, fetching position");
        
        // Fetch the existing entry to get position
        const { data: existing, error: fetchError } = await supabase
          .from("waitlist")
          .select("created_at")
          .eq("email", email.toLowerCase())
          .single();

        if (fetchError) {
          console.error("[Waitlist] Error fetching existing entry:", fetchError);
          return NextResponse.json(
            { error: "Email already registered" },
            { status: 409 }
          );
        }

        // Calculate position
        const { count } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true })
          .lte("created_at", existing.created_at);

        return NextResponse.json({
          success: true,
          message: "Email already registered",
          position: count || 1,
          alreadyRegistered: true,
        });
      }

      const errorMessage = isDevelopment
        ? `Insert failed: ${error.message} (code: ${error.code})`
        : "Failed to join waitlist";

      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    console.log("[Waitlist] Successfully inserted:", data ? "entry created" : "no data returned");

    // Calculate position
    const { count, error: countError } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .lte("created_at", data.created_at);

    if (countError) {
      console.error("[Waitlist] Error calculating position:", countError);
      // Still return success, but without position
      return NextResponse.json({ 
        success: true, 
        message: "Successfully joined waitlist",
        position: null 
      });
    }

    console.log("[Waitlist] Success - position:", count || 1);

    return NextResponse.json({ 
      success: true, 
      position: count || 1 
    });
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("[Waitlist] Unexpected error:", {
      message: error.message,
      stack: isDevelopment ? error.stack : undefined,
      name: error.name,
    });

    const errorMessage = isDevelopment
      ? `Server error: ${error.message}`
      : "An unexpected error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("[Waitlist] GET error:", error);
      return NextResponse.json(
        { 
          error: isDevelopment ? `Failed: ${error.message}` : "Server error" 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ totalCount: count || 0 });
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("[Waitlist] GET unexpected error:", error);
    return NextResponse.json(
      { 
        error: isDevelopment ? `Error: ${error.message}` : "Server error" 
      },
      { status: 500 }
    );
  }
}
