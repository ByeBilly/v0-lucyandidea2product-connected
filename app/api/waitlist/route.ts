import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Admin client for API routes
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY as string
);

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== 'string') {
      return jsonError('Email is required and must be a valid string', 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonError('Please provide a valid email address', 400);
    }

    if (name && typeof name !== 'string') {
      return jsonError('Name must be a string if provided', 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('waitlist')
      .select('id, created_at')
      .eq('email', normalizedEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Check error:', checkError);
      return jsonError('Failed to check waitlist status', 500);
    }

    if (existingUser) {
      const { count, error: posErr } = await supabaseAdmin
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', existingUser.created_at);

      if (posErr) return jsonError('Failed to calculate position', 500);

      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        position: count || 1,
      });
    }

    const { data, error: insertErr } = await supabaseAdmin
      .from('waitlist')
      .insert({
        email: normalizedEmail,
        name: name?.trim() || null,
        status: 'pending',
      })
      .select('id, created_at')
      .single();

    if (insertErr) {
      if (insertErr.code === '23505') {
        return jsonError('This email is already registered', 409);
      }
      return jsonError('Failed to join waitlist', 500);
    }

    const { count, error: countErr } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lte('created_at', data.created_at);

    if (countErr) return jsonError('Successfully joined waitlist', 200);

    return NextResponse.json({
      success: true,
      position: count || 1,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return jsonError('An unexpected error occurred', 500);
  }
}

export async function GET() {
  try {
    const { count: totalCount, error: countErr } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (countErr) return jsonError('Failed to get waitlist statistics', 500);

    const { data: recentSignups, error: recentErr } = await supabaseAdmin
      .from('waitlist')
      .select('email, name, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (recentErr) {
      return jsonError('Failed to get recent signups', 500);
    }

    return NextResponse.json({
      totalCount: totalCount || 0,
      recentSignups: recentSignups || [],
    });
  } catch (error) {
    console.error('Unexpected GET error:', error);
    return jsonError('An unexpected error occurred', 500);
  }
}
