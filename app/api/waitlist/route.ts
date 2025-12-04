import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey =
    process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseKey = serviceRoleKey || anonKey

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase waitlist storage is not configured")
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    console.log("[v0] Waitlist signup attempt:", { email, name })

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = name?.trim() || null

    const supabase = getSupabaseClient()

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

    const needsConfig = error instanceof Error && error.message.includes("Supabase waitlist storage")

    return NextResponse.json(
      {
        error: needsConfig
          ? "Waitlist storage is not configured. Please add Supabase credentials."
          : "Failed to join waitlist. Please try again.",
      },
      { status: needsConfig ? 503 : 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const readableKey =
      process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !readableKey) {
      return NextResponse.json(
        {
          signups: [],
          message: "Supabase not configured. Check server logs for waitlist signups.",
        },
        { status: 200 },
      )
    }

    const supabase = createClient(supabaseUrl, readableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

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
