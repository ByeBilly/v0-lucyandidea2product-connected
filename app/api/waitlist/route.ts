import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export const dynamic = 'force-dynamic';

// Create admin client directly (can't import from "use server" modules)
function createAdminClient() {
  // Support both env var names for service key
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY;
  
  if (!serviceKey) {
    throw new Error('Missing Supabase service key - set SUPABASE_SERVICE_ROLE_KEY or NEXT_PRIVATE_SUPABASE_SERVICE_KEY');
  }
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // Do not set any cookies
        },
      },
    }
  );
}

/**
 * POST /api/waitlist
 * Add a user to the waitlist
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const { email, name } = await request.json();

    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required and must be a valid string' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate optional name field
    if (name && typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name must be a string if provided' },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabase = createAdminClient();

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('waitlist')
      .select('id, created_at')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found"
      console.error('[Waitlist API] Error checking existing email:', checkError);
      return NextResponse.json(
        { error: 'Failed to check waitlist status' },
        { status: 500 }
      );
    }

    if (existingUser) {
      // User already exists, return their current position
      const { count, error: countError } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', existingUser.created_at);

      if (countError) {
        console.error('[Waitlist API] Error calculating position:', countError);
        return NextResponse.json(
          { error: 'Failed to calculate position' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Email already registered',
        position: count || 1,
        alreadyRegistered: true,
      });
    }

    // Insert new waitlist entry
    const { data, error: insertError } = await supabase
      .from('waitlist')
      .insert({
        email: email.toLowerCase(),
        name: name?.trim() || null,
        status: 'pending',
      })
      .select('id, created_at')
      .single();

    if (insertError) {
      console.error('[Waitlist API] Error inserting waitlist entry:', insertError);

      // Handle duplicate key error (in case of race condition)
      if (insertError.code === '23505') {
        // unique_violation
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    // Calculate position in waitlist
    const { count, error: countError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lte('created_at', data.created_at);

    if (countError) {
      console.error('[Waitlist API] Error calculating position:', countError);
      // Still return success, but without position
      return NextResponse.json({
        success: true,
        message: 'Successfully joined waitlist',
        position: null,
      });
    }

    console.log(`[Waitlist API] New signup: ${email}, position: ${count}`);

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist',
      position: count || 1,
    });
  } catch (error) {
    console.error('[Waitlist API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/waitlist
 * Get waitlist statistics (admin only)
 * Note: This endpoint could be protected with authentication in production
 */
export async function GET() {
  try {
    const supabase = createAdminClient();

    // Get total count
    const { count: totalCount, error: countError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('[Waitlist API] Error getting count:', countError);
      return NextResponse.json(
        { error: 'Failed to get waitlist statistics' },
        { status: 500 }
      );
    }

    // Get recent signups (last 10)
    const { data: recentSignups, error: recentError } = await supabase
      .from('waitlist')
      .select('email, name, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (recentError) {
      console.error('[Waitlist API] Error getting recent signups:', recentError);
      return NextResponse.json(
        { error: 'Failed to get recent signups' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      totalCount: totalCount || 0,
      recentSignups: recentSignups || [],
    });
  } catch (error) {
    console.error('[Waitlist API] Unexpected error in GET:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
