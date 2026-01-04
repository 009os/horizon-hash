import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '@/core/config/env';

const JWT_SECRET = env.jwtSecret;
const SESSION_DURATION_DAYS = 15;

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    // Validation
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'User ID, username, or email and password are required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Try to find user by userid, username, or email
    let user = null;
    let findError = null;

    // First try userid
    const { data: userByUserid, error: useridError } = await supabaseAdmin
      .from('users')
      .select('userid, username, email, password')
      .eq('userid', identifier)
      .limit(1);

    if (userByUserid && userByUserid.length > 0) {
      user = userByUserid[0];
    } else {
      // If not found by userid, try username
      const { data: userByUsername, error: usernameError } = await supabaseAdmin
        .from('users')
        .select('userid, username, email, password')
        .eq('username', identifier)
        .limit(1);
      
      if (userByUsername && userByUsername.length > 0) {
        user = userByUsername[0];
      } else {
        // If not found by username, try email
        const { data: userByEmail, error: emailError } = await supabaseAdmin
          .from('users')
          .select('userid, username, email, password')
          .eq('email', identifier.toLowerCase())
          .limit(1);
        
        if (userByEmail && userByEmail.length > 0) {
          user = userByEmail[0];
        } else {
          findError = emailError || usernameError || useridError;
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last_login
    await supabaseAdmin
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('userid', user.userid);

    // Generate JWT token
    const token = jwt.sign(
      {
        userid: user.userid,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: `${SESSION_DURATION_DAYS}d` }
    );

    const response = NextResponse.json(
      {
        success: true,
        user: {
          userid: user.userid,
          username: user.username,
          email: user.email,
        },
        token,
      },
      { status: 200 }
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
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

