import { NextRequest, NextResponse } from 'next/server';
import { sendCarFinderEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const result = await sendCarFinderEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      make: data.make || '',
      model: data.model || '',
      yearMin: data.yearMin || '',
      yearMax: data.yearMax || '',
      priceMin: data.priceMin || '',
      priceMax: data.priceMax || '',
      message: data.message || ''
    });
    
    if (result.success) {
      return NextResponse.json({ success: true, message: 'Request submitted successfully' });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to submit request' }, { status: 500 });
    }
  } catch (error) {
    console.error('Car finder form error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
