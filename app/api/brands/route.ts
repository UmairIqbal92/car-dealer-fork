import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        c.id,
        c.name,
        c.slug,
        c.logo,
        COUNT(v.id) as vehicle_count
      FROM categories c
      LEFT JOIN vehicles v ON LOWER(v.make) = LOWER(c.name)
      GROUP BY c.id, c.name, c.slug, c.logo
      ORDER BY vehicle_count DESC, c.name ASC
      LIMIT 12
    `);
    
    return NextResponse.json({ 
      success: true, 
      brands: result.rows.map(row => ({
        ...row,
        vehicle_count: parseInt(row.vehicle_count) || 0
      }))
    });
  } catch (error) {
    console.error('Get brands error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
