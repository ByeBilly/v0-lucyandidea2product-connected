import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "missing",
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    serviceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
    hasPrivateKey: !!process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY,
    privateKeyLength: process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY?.length || 0,
    nodeEnv: process.env.NODE_ENV,
  });
}

