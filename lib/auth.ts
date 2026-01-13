import bcrypt from 'bcryptjs';
import sql from './db';

const ADMIN_SESSION_KEY = 'admin_session';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createAdminUser(username: string, password: string) {
  const passwordHash = await hashPassword(password);
  try {
    await sql`
      INSERT INTO admin_users (username, password_hash)
      VALUES (${username}, ${passwordHash})
      ON CONFLICT (username) DO NOTHING
    `;
    return { success: true };
  } catch (error) {
    console.error('Create admin user error:', error);
    return { success: false, error };
  }
}

export async function validateAdminCredentials(username: string, password: string): Promise<boolean> {
  const users = await sql`
    SELECT password_hash FROM admin_users WHERE username = ${username}
  `;
  
  if (users.length === 0) {
    return false;
  }
  
  return verifyPassword(password, users[0].password_hash);
}

export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
