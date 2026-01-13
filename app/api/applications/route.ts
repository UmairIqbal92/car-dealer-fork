import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { sendApplicationEmail } from '@/lib/email';

export async function GET() {
  try {
    const applications = await sql`
      SELECT a.*, v.name as vehicle_name, v.year as vehicle_year
      FROM applications a 
      LEFT JOIN vehicles v ON a.vehicle_id = v.id 
      ORDER BY a.created_at DESC
    `;
    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const result = await sql`
      INSERT INTO applications (buyer_data, co_buyer_data, vehicle_id)
      VALUES (${JSON.stringify(data.buyerData)}, ${data.coBuyerData ? JSON.stringify(data.coBuyerData) : null}, ${data.vehicleId || null})
      RETURNING *
    `;
    
    let vehicleInfo = '';
    if (data.vehicleId) {
      const vehicles = await sql`SELECT name, year FROM vehicles WHERE id = ${data.vehicleId}`;
      if (vehicles.length > 0) {
        vehicleInfo = `${vehicles[0].year} ${vehicles[0].name}`;
      }
    }
    
    await sendApplicationEmail({
      buyerData: data.buyerData,
      coBuyerData: data.coBuyerData,
      vehicleInfo
    });
    
    return NextResponse.json({ success: true, application: result[0] });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
