import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    console.log("[v0] Waitlist signup attempt:", { email, name })

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.log("[v0] Waitlist signup (Supabase not configured):", {
        email,
        name,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: true,
          message: "Successfully joined the waitlist! We'll contact you soon.",
          position: null,
        },
        { status: 200 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Insert into waitlist
    const { data: insertData, error: insertError } = await supabase
      .from("waitlist")
      .insert({ email, name, status: "pending" })
      .select()
      .single()

    if (insertError) {
      // Check if it's a duplicate email error
      if (insertError.code === "23505") {
        console.log("[v0] Duplicate email:", email)
        return NextResponse.json(
          {
            success: true,
            message: "You're already on the waitlist!",
            position: null,
          },
          { status: 200 },
        )
      }

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
    return NextResponse.json({ error: "Failed to join waitlist. Please try again." }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          signups: [],
          message: "Supabase not configured. Check server logs for waitlist signups.",
        },
        { status: 200 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

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
