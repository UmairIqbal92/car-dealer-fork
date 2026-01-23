import { Resend } from 'resend';

export async function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@carjunction.com';

  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

export async function sendInquiryEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  vehicleName?: string;
  inquiryType: string;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    const vehicleInfo = data.vehicleName ? `\nVehicle of Interest: ${data.vehicleName}` : '';
    
    await client.emails.send({
      from: fromEmail,
      to: 'cjunctionllc@gmail.com',
      subject: `New ${data.inquiryType} Inquiry from ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Inquiry from Car Junction Website</h2>
        <p><strong>Type:</strong> ${data.inquiryType}</p>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        ${data.vehicleName ? `<p><strong>Vehicle:</strong> ${data.vehicleName}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message || 'No message provided'}</p>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: 'cjunctionllc@gmail.com',
      subject: `Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendCarFinderEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  message: string;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    const result = await client.emails.send({
      from: fromEmail,
      to: 'cjunctionllc@gmail.com',
      subject: `Car Finder Request from ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Car Finder Request</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <h3>Vehicle Preferences:</h3>
        <p><strong>Make:</strong> ${data.make || 'Any'}</p>
        <p><strong>Model:</strong> ${data.model || 'Any'}</p>
        <p><strong>Year Range:</strong> ${data.yearMin || 'Any'} - ${data.yearMax || 'Any'}</p>
        <p><strong>Price Range:</strong> $${data.priceMin || '0'} - $${data.priceMax || 'Any'}</p>
        <p><strong>Additional Details:</strong></p>
        <p>${data.message || 'None provided'}</p>
      `
    });
    
    console.log('Email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendApplicationEmail(data: {
  buyerData: any;
  coBuyerData?: any;
  vehicleInfo?: string;
  tradeIn?: string | null;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: 'cjunctionllc@gmail.com',
      subject: `New Credit Application from ${data.buyerData.firstName} ${data.buyerData.lastName}`,
      html: `
        <h2>New Credit Application</h2>
        <h3>Buyer Information:</h3>
        <p><strong>Name:</strong> ${data.buyerData.firstName} ${data.buyerData.lastName}</p>
        <p><strong>Email:</strong> ${data.buyerData.email}</p>
        <p><strong>Phone:</strong> ${data.buyerData.cellPhone}</p>
        <p><strong>Address:</strong> ${data.buyerData.streetAddress}, ${data.buyerData.city}, ${data.buyerData.state} ${data.buyerData.zipCode}</p>
        ${data.vehicleInfo ? `<h3>Vehicle of Interest:</h3><p>${data.vehicleInfo}</p>` : ''}
        ${data.tradeIn ? `<h3>Trade-In Vehicle:</h3><p style="white-space: pre-wrap;">${data.tradeIn}</p>` : ''}
        ${data.coBuyerData ? `
          <h3>Co-Buyer Information:</h3>
          <p><strong>Name:</strong> ${data.coBuyerData.firstName} ${data.coBuyerData.lastName}</p>
          <p><strong>Email:</strong> ${data.coBuyerData.email}</p>
        ` : ''}
        <p><em>Full application details saved in database.</em></p>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}
