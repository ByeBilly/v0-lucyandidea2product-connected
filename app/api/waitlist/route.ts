import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    console.log("[Waitlist] Signup attempt:", { email, name })

    if (!email || !email.includes("@")) {
      console.log("[Waitlist] Invalid email:", email)
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = name?.trim() || null

    // Use the robust admin client creation from lib/supabase/admin.ts
    console.log("[Waitlist] Creating Supabase client...")
    const supabase = await createClient()
    console.log("[Waitlist] Supabase client created successfully")

    // Return existing entry if the email is already on the waitlist
    console.log("[Waitlist] Checking for existing entry:", normalizedEmail)
    const { data: existingEntry, error: existingError } = await supabase
      .from("waitlist")
      .select("id, created_at")
      .eq("email", normalizedEmail)
      .maybeSingle()

    if (existingError && existingError.code !== "PGRST116") {
      console.error("[Waitlist] Database lookup error:", existingError)
      throw existingError
    }

    if (existingEntry) {
      console.log("[Waitlist] Duplicate detected:", normalizedEmail)

      return NextResponse.json(
        {
          success: true,
          message: "You're already on the waitlist!",
          position: null,
        },
        { status: 200 },
      )
    }

    // Insert into waitlist
    console.log("[Waitlist] Inserting new entry...")
    const { data: insertData, error: insertError } = await supabase
      .from("waitlist")
      .insert({ email: normalizedEmail, name: normalizedName, status: "pending" })
      .select()
      .single()

    if (insertError) {
      console.error("[Waitlist] Insert error:", insertError)
      throw insertError
    }

    console.log("[Waitlist] Successfully inserted:", insertData)

    // Get position in waitlist
    console.log("[Waitlist] Calculating position...")
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .lte("created_at", insertData.created_at)

    console.log("[Waitlist] Position calculated:", count)

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist!",
        position: count || null,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[Waitlist] Signup error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      error,
    })

    const errorMessage = error instanceof Error ? error.message : "Failed to join waitlist. Please try again."

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("[Waitlist] Fetching waitlist entries...")
    
    // Use the robust admin client creation from lib/supabase/admin.ts
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      console.error("[Waitlist] Fetch error:", error)
      throw error
    }

    console.log("[Waitlist] Successfully fetched", data?.length || 0, "entries")
    return NextResponse.json({ signups: data }, { status: 200 })
  } catch (error) {
    console.error("[Waitlist] Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 })
  }
}
