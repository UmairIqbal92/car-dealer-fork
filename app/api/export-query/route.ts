import { NextResponse } from "next/server"
import { getResendClient } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { brand, model, budget, miles, email, phone, notes } = await request.json()

    if (!brand || !model || !miles || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C74B3F; border-bottom: 2px solid #C74B3F; padding-bottom: 10px;">
          New Vehicle Export Query
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f8f8f8;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Brand</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${brand}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Model</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${model}</td>
          </tr>
          <tr style="background-color: #f8f8f8;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Budget</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${budget || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Miles</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${miles}</td>
          </tr>
          <tr style="background-color: #f8f8f8;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Email</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">Phone</td>
            <td style="padding: 12px; border: 1px solid #ddd;">${phone}</td>
          </tr>
        </table>

        ${notes ? `
        <div style="margin-top: 20px;">
          <h3 style="color: #333;">Notes:</h3>
          <p style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${notes}</p>
        </div>
        ` : ""}

        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          This query was submitted through the Car Junction LLC Export Query form.
        </p>
      </div>
    `

    const { client, fromEmail } = await getResendClient()
    
    await client.emails.send({
      from: fromEmail,
      to: "cjunctionllc@gmail.com",
      subject: `Export Query: ${brand} ${model}`,
      html: emailHtml,
      replyTo: email
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Export query error:", error)
    return NextResponse.json({ error: "Failed to send query" }, { status: 500 })
  }
}
