import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const result = await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message
    });
    
    if (result.success) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
