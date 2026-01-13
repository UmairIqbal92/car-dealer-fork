import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const bodyType = searchParams.get('bodyType');
    const yearMin = searchParams.get('yearMin');
    const yearMax = searchParams.get('yearMax');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const mileageMax = searchParams.get('mileageMax');
    const fuelType = searchParams.get('fuelType');
    const transmission = searchParams.get('transmission');
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured');
    const brand = searchParams.get('brand');
    
    let vehicles = await sql`
      SELECT v.*, c.name as category_name 
      FROM vehicles v 
      LEFT JOIN categories c ON v.category_id = c.id 
      WHERE v.status = 'available'
      ORDER BY v.created_at DESC
    `;
    
    const effectiveMake = make || brand;
    if (effectiveMake) {
      vehicles = vehicles.filter((v: any) => 
        v.make?.toLowerCase() === effectiveMake.toLowerCase()
      );
    }
    if (model) {
      vehicles = vehicles.filter((v: any) => 
        v.model?.toLowerCase() === model.toLowerCase()
      );
    }
    if (bodyType) {
      vehicles = vehicles.filter((v: any) => 
        v.body_type?.toLowerCase() === bodyType.toLowerCase()
      );
    }
    if (yearMin) {
      vehicles = vehicles.filter((v: any) => v.year >= parseInt(yearMin));
    }
    if (yearMax) {
      vehicles = vehicles.filter((v: any) => v.year <= parseInt(yearMax));
    }
    if (priceMin) {
      vehicles = vehicles.filter((v: any) => parseFloat(v.price) >= parseFloat(priceMin));
    }
    if (priceMax) {
      vehicles = vehicles.filter((v: any) => parseFloat(v.price) <= parseFloat(priceMax));
    }
    if (mileageMax) {
      vehicles = vehicles.filter((v: any) => v.mileage <= parseInt(mileageMax));
    }
    if (fuelType) {
      vehicles = vehicles.filter((v: any) => 
        v.fuel_type?.toLowerCase() === fuelType.toLowerCase()
      );
    }
    if (transmission) {
      vehicles = vehicles.filter((v: any) => 
        v.transmission?.toLowerCase() === transmission.toLowerCase()
      );
    }
    if (categoryId) {
      vehicles = vehicles.filter((v: any) => v.category_id === parseInt(categoryId));
    }
    if (featured === 'true') {
      vehicles = vehicles.filter((v: any) => v.featured === true);
    }
    
    return NextResponse.json({ success: true, vehicles });
  } catch (error) {
    console.error('Get vehicles error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const result = await sql`
      INSERT INTO vehicles (
        name, year, price, mileage, color, body_type, fuel_type, 
        transmission, drivetrain, engine, vin, stock_number, 
        make, model, category_id, description, features, images, featured, status
      )
      VALUES (
        ${data.name}, ${data.year}, ${data.price}, ${data.mileage || 0},
        ${data.color || null}, ${data.bodyType || null}, ${data.fuelType || null},
        ${data.transmission || null}, ${data.drivetrain || null}, ${data.engine || null},
        ${data.vin || null}, ${data.stockNumber || null},
        ${data.make}, ${data.model}, ${data.categoryId || null},
        ${data.description || null}, ${data.features || []}, ${data.images || []},
        ${data.featured || false}, ${data.status || 'available'}
      )
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, vehicle: result[0] });
  } catch (error) {
    console.error('Create vehicle error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
