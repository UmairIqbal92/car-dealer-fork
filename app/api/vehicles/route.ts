import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
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
    
    let result;
    try {
      result = await pool.query(
        `SELECT v.*, c.name as category_name 
         FROM vehicles v 
         LEFT JOIN categories c ON v.category_id = c.id 
         WHERE v.status = $1
         ORDER BY v.created_at DESC`,
        ['available']
      );
    } catch (queryError) {
      console.error('Query error:', queryError);
      result = { rows: [] };
    }
    
    let vehicles = result.rows || [];
    
    if (search) {
      const searchTerms = search.toLowerCase().split(/\s+/).filter(Boolean);
      vehicles = vehicles.filter((v: any) => {
        const searchableText = [
          v.make,
          v.model,
          v.name,
          v.year?.toString(),
          v.color,
          v.body_type,
          v.fuel_type,
          v.transmission,
          v.description
        ].filter(Boolean).join(' ').toLowerCase();
        
        return searchTerms.some(term => searchableText.includes(term));
      });
    }
    
    const effectiveMake = make || brand;
    if (effectiveMake) {
      vehicles = vehicles.filter((v: any) => 
        v.make?.toLowerCase().includes(effectiveMake.toLowerCase())
      );
    }
    if (model) {
      vehicles = vehicles.filter((v: any) => 
        v.model?.toLowerCase().includes(model.toLowerCase())
      );
    }
    if (bodyType) {
      vehicles = vehicles.filter((v: any) => 
        v.body_type?.toLowerCase().includes(bodyType.toLowerCase())
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
        v.fuel_type?.toLowerCase().includes(fuelType.toLowerCase())
      );
    }
    if (transmission) {
      vehicles = vehicles.filter((v: any) => 
        v.transmission?.toLowerCase().includes(transmission.toLowerCase())
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
    
    const result = await pool.query(
      `INSERT INTO vehicles (
        name, year, price, mileage, color, body_type, fuel_type, 
        transmission, drivetrain, engine, vin, stock_number, 
        make, model, category_id, description, features, images, featured, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING *`,
      [
        data.name, data.year, data.price, data.mileage || 0,
        data.color || null, data.bodyType || null, data.fuelType || null,
        data.transmission || null, data.drivetrain || null, data.engine || null,
        data.vin || null, data.stockNumber || null,
        data.make, data.model, data.categoryId || null,
        data.description || null, data.features || [], data.images || [],
        data.featured || false, data.status || 'available'
      ]
    );
    
    return NextResponse.json({ success: true, vehicle: result.rows[0] });
  } catch (error) {
    console.error('Create vehicle error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
