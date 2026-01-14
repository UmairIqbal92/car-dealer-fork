import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendInquiryEmail } from '@/lib/email';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT i.*, v.name as vehicle_name, v.year as vehicle_year
      FROM inquiries i 
      LEFT JOIN vehicles v ON i.vehicle_id = v.id 
      ORDER BY i.created_at DESC
    `);
    return NextResponse.json({ success: true, inquiries: result.rows });
  } catch (error) {
    console.error('Get inquiries error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const result = await pool.query(
      `INSERT INTO inquiries (first_name, last_name, email, phone, message, vehicle_id, inquiry_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [data.firstName, data.lastName, data.email, data.phone, data.message || null, data.vehicleId || null, data.inquiryType || 'general']
    );
    
    let vehicleName = '';
    if (data.vehicleId) {
      const vehicleResult = await pool.query('SELECT name, year FROM vehicles WHERE id = $1', [data.vehicleId]);
      if (vehicleResult.rows.length > 0) {
        vehicleName = `${vehicleResult.rows[0].year} ${vehicleResult.rows[0].name}`;
      }
    }
    
    await sendInquiryEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: data.message || '',
      vehicleName,
      inquiryType: data.inquiryType || 'general'
    });
    
    return NextResponse.json({ success: true, inquiry: result.rows[0] });
  } catch (error) {
    console.error('Create inquiry error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
