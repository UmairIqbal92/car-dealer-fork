import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const categories = await sql`
      SELECT * FROM categories ORDER BY name ASC
    `;
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const result = await sql`
      INSERT INTO categories (name, slug)
      VALUES (${name}, ${slug})
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, category: result[0] });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
