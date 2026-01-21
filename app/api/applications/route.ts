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
    
    const vehicleId = data.vehicleOfInterest?.id || null;
    
    const result = await pool.query(
      `INSERT INTO applications (buyer_data, co_buyer_data, vehicle_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [JSON.stringify(data.buyerData), data.coBuyerData ? JSON.stringify(data.coBuyerData) : null, vehicleId]
    );
    
    let vehicleInfo = '';
    if (data.vehicleOfInterest) {
      vehicleInfo = `${data.vehicleOfInterest.year} ${data.vehicleOfInterest.make} ${data.vehicleOfInterest.model} - $${data.vehicleOfInterest.price?.toLocaleString()} (Stock: ${data.vehicleOfInterest.stockNumber})`;
    }
    
    await sendApplicationEmail({
      buyerData: data.buyerData,
      coBuyerData: data.coBuyerData,
      vehicleInfo,
      tradeIn: data.tradeIn
    });
    
    return NextResponse.json({ success: true, application: result.rows[0] });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
