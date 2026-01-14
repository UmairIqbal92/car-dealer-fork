import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    return NextResponse.json({ success: true, categories: result.rows });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const result = await pool.query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
      [name, slug]
    );
    
    return NextResponse.json({ success: true, category: result.rows[0] });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
