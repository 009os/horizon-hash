import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

/**
 * Change password: requires current password so only the account owner can reset.
 * Accepts email/username + current password + new password; verifies current password, then updates DB.
 */
export async function POST(request: NextRequest) {
  try {
    const { identifier, currentPassword, newPassword } = await request.json();

    if (!identifier || typeof identifier !== 'string') {
      return NextResponse.json(
        { error: 'Email or username is required' },
        { status: 400 }
      );
    }

    if (!currentPassword || typeof currentPassword !== 'string') {
      return NextResponse.json(
        { error: 'Current password is required' },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== 'string') {
      return NextResponse.json(
        { error: 'New password is required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      return NextResponse.json(
        { error: 'Email or username is required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Find user by userid, username, or email – must select password to verify
    let user: { userid: string; username: string; email: string; password: string } | null = null;

    const { data: byUserid } = await supabaseAdmin
      .from('users')
      .select('userid, username, email, password')
      .eq('userid', trimmedIdentifier)
      .limit(1);

    if (byUserid && byUserid.length > 0) {
      user = byUserid[0];
    } else {
      const { data: byUsername } = await supabaseAdmin
        .from('users')
        .select('userid, username, email, password')
        .eq('username', trimmedIdentifier)
        .limit(1);

      if (byUsername && byUsername.length > 0) {
        user = byUsername[0];
      } else {
        const { data: byEmail } = await supabaseAdmin
          .from('users')
          .select('userid, username, email, password')
          .eq('email', trimmedIdentifier.toLowerCase())
          .limit(1);

        if (byEmail && byEmail.length > 0) {
          user = byEmail[0];
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with that email or username' },
        { status: 404 }
      );
    }

    const currentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!currentPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ password: hashedPassword })
      .eq('userid', user.userid);

    if (updateError) {
      console.error('Forgot password update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update password. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password updated. You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
