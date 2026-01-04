import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '@/core/config/env';

const JWT_SECRET = env.jwtSecret;
const SESSION_DURATION_DAYS = 15;

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      console.error('Supabase admin client not available. Check SUPABASE_SERVICE_ROLE_KEY environment variable.');
      return NextResponse.json(
        { error: 'Server configuration error: Supabase admin client not available' },
        { status: 500 }
      );
    }

    // Check if email already exists
    const { data: existingUsers, error: checkError } = await supabaseAdmin
      .from('users')
      .select('email')
      .eq('email', email.toLowerCase())
      .limit(1);

    if (checkError) {
      console.error('Error checking existing email:', checkError);
      // Check if table doesn't exist
      if (checkError.message?.includes('relation') || checkError.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database table not found. Please run the SQL schema to create the users table.', details: checkError.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: 'Error checking existing user', details: checkError.message },
        { status: 500 }
      );
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const { data: existingUsernames, error: usernameCheckError } = await supabaseAdmin
      .from('users')
      .select('username')
      .eq('username', username)
      .limit(1);

    if (usernameCheckError) {
      console.error('Error checking existing username:', usernameCheckError);
      return NextResponse.json(
        { error: 'Error checking existing username', details: usernameCheckError.message },
        { status: 500 }
      );
    }

    if (existingUsernames && existingUsernames.length > 0) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Generate unique userid by finding the maximum userid and incrementing
    const { data: allUsers, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('userid')
      .order('userid', { ascending: false })
      .limit(1);

    let newUserid = '1'; // Default to 1 if no users exist

    if (!fetchError && allUsers && allUsers.length > 0) {
      // Get the highest userid and increment
      const maxUserid = allUsers[0].userid;
      const maxNum = parseInt(maxUserid, 10);
      if (!isNaN(maxNum)) {
        newUserid = (maxNum + 1).toString();
      } else {
        // If userid is not a number, start from 1
        newUserid = '1';
      }
    }

    // Ensure the generated userid is unique (retry if collision)
    let attempts = 0;
    let finalUserid = newUserid;
    while (attempts < 10) {
      const { data: checkUserid, error: checkError } = await supabaseAdmin
        .from('users')
        .select('userid')
        .eq('userid', finalUserid)
        .limit(1);

      if (checkError || !checkUserid || checkUserid.length === 0) {
        // userid is available
        break;
      }

      // userid exists, increment and try again
      const currentNum = parseInt(finalUserid, 10);
      finalUserid = (isNaN(currentNum) ? 1 : currentNum + 1).toString();
      attempts++;
    }

    if (attempts >= 10) {
      return NextResponse.json(
        { error: 'Failed to generate unique user ID. Please try again.' },
        { status: 500 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        userid: finalUserid,
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        last_login: new Date().toISOString(),
      })
      .select('userid, username, email')
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to create user', details: insertError.message },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userid: newUser.userid,
        username: newUser.username,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: `${SESSION_DURATION_DAYS}d` }
    );

    const response = NextResponse.json(
      {
        success: true,
        user: {
          userid: newUser.userid,
          username: newUser.username,
          email: newUser.email,
        },
        token,
      },
      { status: 201 }
    );

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60, // 15 days in seconds
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

