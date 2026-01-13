import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

export async function getResendClient() {
  const { apiKey } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: connectionSettings.settings.from_email
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
    
    await client.emails.send({
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
    
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendApplicationEmail(data: {
  buyerData: any;
  coBuyerData?: any;
  vehicleInfo?: string;
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
        ${data.vehicleInfo ? `<h3>Interested Vehicle:</h3><p>${data.vehicleInfo}</p>` : ''}
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
