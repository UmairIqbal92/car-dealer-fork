import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendApplicationEmail } from '@/lib/email';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT a.*, v.name as vehicle_name, v.year as vehicle_year
      FROM applications a 
      LEFT JOIN vehicles v ON a.vehicle_id = v.id 
      ORDER BY a.created_at DESC
    `);
    return NextResponse.json({ success: true, applications: result.rows });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const result = await pool.query(
      `INSERT INTO applications (buyer_data, co_buyer_data, vehicle_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [JSON.stringify(data.buyerData), data.coBuyerData ? JSON.stringify(data.coBuyerData) : null, data.vehicleId || null]
    );
    
    let vehicleInfo = '';
    if (data.vehicleId) {
      const vehicleResult = await pool.query('SELECT name, year FROM vehicles WHERE id = $1', [data.vehicleId]);
      if (vehicleResult.rows.length > 0) {
        vehicleInfo = `${vehicleResult.rows[0].year} ${vehicleResult.rows[0].name}`;
      }
    }
    
    await sendApplicationEmail({
      buyerData: data.buyerData,
      coBuyerData: data.coBuyerData,
      vehicleInfo
    });
    
    return NextResponse.json({ success: true, application: result.rows[0] });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
