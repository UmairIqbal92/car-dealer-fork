import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/db';
import { createAdminUser } from '@/lib/auth';

export async function GET() {
  try {
    await initDatabase();
    await createAdminUser('admin', 'CarJunction2024!');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully' 
    });
  } catch (error) {
    console.error('Database init error:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
