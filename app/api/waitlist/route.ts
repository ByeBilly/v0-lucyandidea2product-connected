import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    console.log("[v0] Waitlist signup attempt:", { email, name })

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = name?.trim() || null

    // Use the robust admin client creation from lib/supabase/admin.ts
    const supabase = await createClient()

    // Return existing entry if the email is already on the waitlist
    const { data: existingEntry, error: existingError } = await supabase
      .from("waitlist")
      .select("id, created_at")
      .eq("email", normalizedEmail)
      .maybeSingle()

    if (existingError && existingError.code !== "PGRST116") {
      console.error("[v0] Supabase waitlist lookup error:", existingError)
      throw existingError
    }

    if (existingEntry) {
      console.log("[v0] Waitlist duplicate detected:", normalizedEmail)

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
    const { data: insertData, error: insertError } = await supabase
      .from("waitlist")
      .insert({ email: normalizedEmail, name: normalizedName, status: "pending" })
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Supabase insert error:", insertError)
      throw insertError
    }

    console.log("[v0] Successfully inserted:", insertData)

    // Get position in waitlist
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .lte("created_at", insertData.created_at)

    console.log("[v0] Waitlist position:", count)

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist!",
        position: count || null,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Waitlist signup error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      error,
    })

    return NextResponse.json(
      {
        error: "Failed to join waitlist. Please try again.",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Use the robust admin client creation from lib/supabase/admin.ts
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      console.error("[v0] Waitlist fetch error:", error)
      throw error
    }

    return NextResponse.json({ signups: data }, { status: 200 })
  } catch (error) {
    console.error("[v0] Waitlist fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 })
  }
}
