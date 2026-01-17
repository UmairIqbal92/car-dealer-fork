import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, logo } = await request.json();
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const result = await pool.query(
      'UPDATE categories SET name = $1, slug = $2, logo = $3 WHERE id = $4 RETURNING *',
      [name, slug, logo || null, parseInt(id)]
    );
    
    return NextResponse.json({ success: true, category: result.rows[0] });
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await pool.query('DELETE FROM categories WHERE id = $1', [parseInt(id)]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
