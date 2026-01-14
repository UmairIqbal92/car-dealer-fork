import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const result = await pool.query(
      `SELECT v.*, c.name as category_name 
       FROM vehicles v 
       LEFT JOIN categories c ON v.category_id = c.id 
       WHERE v.id = $1`,
      [parseInt(id)]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Vehicle not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, vehicle: result.rows[0] });
  } catch (error) {
    console.error('Get vehicle error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const result = await pool.query(
      `UPDATE vehicles SET
        name = $1,
        year = $2,
        price = $3,
        mileage = $4,
        color = $5,
        body_type = $6,
        fuel_type = $7,
        transmission = $8,
        drivetrain = $9,
        engine = $10,
        vin = $11,
        stock_number = $12,
        make = $13,
        model = $14,
        category_id = $15,
        description = $16,
        features = $17,
        images = $18,
        featured = $19,
        status = $20,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $21
      RETURNING *`,
      [
        data.name, data.year, data.price, data.mileage || 0,
        data.color || null, data.bodyType || null, data.fuelType || null,
        data.transmission || null, data.drivetrain || null, data.engine || null,
        data.vin || null, data.stockNumber || null,
        data.make, data.model, data.categoryId || null,
        data.description || null, data.features || [], data.images || [],
        data.featured || false, data.status || 'available',
        parseInt(id)
      ]
    );
    
    return NextResponse.json({ success: true, vehicle: result.rows[0] });
  } catch (error) {
    console.error('Update vehicle error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await pool.query('DELETE FROM vehicles WHERE id = $1', [parseInt(id)]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
