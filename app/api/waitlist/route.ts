import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db/drizzle"
import { sql } from "drizzle-orm"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Insert into waitlist table
    await db.execute(sql`
      INSERT INTO waitlist (email, name, status, created_at)
      VALUES (${email}, ${name || null}, 'pending', NOW())
      ON CONFLICT (email) DO NOTHING
    `)

    return NextResponse.json({ success: true, message: "Successfully joined the waitlist!" }, { status: 200 })
  } catch (error) {
    console.error("Waitlist signup error:", error)
    return NextResponse.json({ error: "Failed to join waitlist. Please try again." }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple admin view - should add auth later
    const result = await db.execute(sql`
      SELECT id, email, name, status, created_at
      FROM waitlist
      ORDER BY created_at DESC
      LIMIT 100
    `)

    return NextResponse.json({ signups: result.rows }, { status: 200 })
  } catch (error) {
    console.error("Waitlist fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 })
  }
}
