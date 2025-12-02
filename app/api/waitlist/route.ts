import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Check if database is configured
    if (!process.env.POSTGRES_URL) {
      // Log signup for now
      console.log("[v0] Waitlist signup (DB not configured):", { email, name, timestamp: new Date().toISOString() })

      return NextResponse.json(
        {
          success: true,
          message: "Successfully joined the waitlist! We'll contact you soon.",
          position: null,
        },
        { status: 200 },
      )
    }

    // Database is configured, proceed with normal flow
    const { db } = await import("@/lib/db/drizzle")
    const { sql } = await import("drizzle-orm")

    const result = await db.execute(sql`
      WITH new_signup AS (
        INSERT INTO waitlist (email, name, status, created_at)
        VALUES (${email}, ${name || null}, 'pending', NOW())
        ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
        RETURNING id, created_at
      )
      SELECT 
        new_signup.id,
        (SELECT COUNT(*) FROM waitlist WHERE created_at <= new_signup.created_at) as position
      FROM new_signup
    `)

    const position = result.rows[0]?.position || null

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist!",
        position,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Waitlist signup error:", error)
    return NextResponse.json({ error: "Failed to join waitlist. Please try again." }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if database is configured
    if (!process.env.POSTGRES_URL) {
      return NextResponse.json(
        {
          signups: [],
          message: "Database not configured. Check server logs for waitlist signups.",
        },
        { status: 200 },
      )
    }

    const { db } = await import("@/lib/db/drizzle")
    const { sql } = await import("drizzle-orm")

    const result = await db.execute(sql`
      SELECT id, email, name, status, created_at
      FROM waitlist
      ORDER BY created_at DESC
      LIMIT 100
    `)

    return NextResponse.json({ signups: result.rows }, { status: 200 })
  } catch (error) {
    console.error("[v0] Waitlist fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 })
  }
}
