import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateAdminCredentials, hashPassword } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    
    if (!session?.value) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { currentPassword, newPassword, username } = await request.json();
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const adminUsername = username || 'admin';
    const isValid = await validateAdminCredentials(adminUsername, currentPassword);
    
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 401 });
    }

    const newPasswordHash = await hashPassword(newPassword);
    
    await pool.query(
      'UPDATE admin_users SET password_hash = $1 WHERE username = $2',
      [newPasswordHash, adminUsername]
    );

    return NextResponse.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ success: false, error: 'Failed to change password' }, { status: 500 });
  }
}
