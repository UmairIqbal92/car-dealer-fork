import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const makesResult = await pool.query(`
      SELECT DISTINCT make FROM vehicles 
      WHERE status = 'available' AND make IS NOT NULL AND make != ''
      ORDER BY make ASC
    `);
    
    const modelsResult = await pool.query(`
      SELECT DISTINCT model FROM vehicles 
      WHERE status = 'available' AND model IS NOT NULL AND model != ''
      ORDER BY model ASC
    `);
    
    const bodyTypesResult = await pool.query(`
      SELECT DISTINCT body_type FROM vehicles 
      WHERE status = 'available' AND body_type IS NOT NULL AND body_type != ''
      ORDER BY body_type ASC
    `);
    
    return NextResponse.json({ 
      success: true, 
      makes: makesResult.rows.map(r => r.make),
      models: modelsResult.rows.map(r => r.model),
      bodyTypes: bodyTypesResult.rows.map(r => r.body_type)
    });
  } catch (error) {
    console.error('Get vehicle options error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
