import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const vehicles = await sql`
      SELECT v.*, c.name as category_name 
      FROM vehicles v 
      LEFT JOIN categories c ON v.category_id = c.id 
      WHERE v.id = ${parseInt(id)}
    `;
    
    if (vehicles.length === 0) {
      return NextResponse.json({ success: false, error: 'Vehicle not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, vehicle: vehicles[0] });
  } catch (error) {
    console.error('Get vehicle error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const result = await sql`
      UPDATE vehicles SET
        name = ${data.name},
        year = ${data.year},
        price = ${data.price},
        mileage = ${data.mileage || 0},
        color = ${data.color || null},
        body_type = ${data.bodyType || null},
        fuel_type = ${data.fuelType || null},
        transmission = ${data.transmission || null},
        drivetrain = ${data.drivetrain || null},
        engine = ${data.engine || null},
        vin = ${data.vin || null},
        stock_number = ${data.stockNumber || null},
        make = ${data.make},
        model = ${data.model},
        category_id = ${data.categoryId || null},
        description = ${data.description || null},
        features = ${data.features || []},
        images = ${data.images || []},
        featured = ${data.featured || false},
        status = ${data.status || 'available'},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, vehicle: result[0] });
  } catch (error) {
    console.error('Update vehicle error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await sql`DELETE FROM vehicles WHERE id = ${parseInt(id)}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
