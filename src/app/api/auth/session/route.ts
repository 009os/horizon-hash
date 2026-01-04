import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';
import { env } from '@/core/config/env';

const JWT_SECRET = env.jwtSecret;
const SESSION_DURATION_DAYS = 15;

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    try {
      // Verify and decode token
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userid: string;
        username: string;
        email: string;
        exp: number;
      };

      // Check if token is expired
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        // Token expired, clear cookie
        const response = NextResponse.json(
          { authenticated: false, expired: true },
          { status: 200 }
        );
        response.cookies.set('auth-token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 0,
          path: '/',
        });
        return response;
      }

      // Check last_login for 15-day inactivity requirement
      if (supabaseAdmin) {
        const { data: user, error } = await supabaseAdmin
          .from('users')
          .select('last_login')
          .eq('userid', decoded.userid)
          .single();

        if (!error && user && user.last_login) {
          const lastLogin = new Date(user.last_login);
          const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
          
          if (daysSinceLogin > SESSION_DURATION_DAYS) {
            // Session expired due to inactivity, clear cookie
            const response = NextResponse.json(
              { authenticated: false, expired: true, reason: 'inactivity' },
              { status: 200 }
            );
            response.cookies.set('auth-token', '', {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 0,
              path: '/',
            });
            return response;
          }
        }
      }

      return NextResponse.json(
        {
          authenticated: true,
          user: {
            userid: decoded.userid,
            username: decoded.username,
            email: decoded.email,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      // Invalid token, clear cookie
      const response = NextResponse.json(
        { authenticated: false, invalid: true },
        { status: 200 }
      );
      response.cookies.set('auth-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      });
      return response;
    }
  } catch (error: any) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

