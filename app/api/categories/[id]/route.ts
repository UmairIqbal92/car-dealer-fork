import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name } = await request.json();
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const result = await sql`
      UPDATE categories SET name = ${name}, slug = ${slug}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, category: result[0] });
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await sql`DELETE FROM categories WHERE id = ${parseInt(id)}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
