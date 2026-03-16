import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactPayload;

    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 },
      );
    }

    // Length checks
    if (name.length > 120 || email.length > 254 || message.length > 3000) {
      return NextResponse.json(
        { error: 'Input exceeds maximum length.' },
        { status: 400 },
      );
    }

    const sanitized = {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone).slice(0, 30) : '',
      service: service ? sanitize(service).slice(0, 100) : '',
      message: sanitize(message),
      timestamp: new Date().toISOString(),
    };

    // Always log to Vercel function logs as backup
    console.log('[CONTACT FORM]', JSON.stringify(sanitized));

    // Send email via Resend if API key is configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'TapTech Site <onboarding@resend.dev>',
          to: process.env.CONTACT_EMAIL || 'taptechinstall@gmail.com',
          subject: `New Lead: ${sanitized.name} - ${sanitized.service || 'No package selected'}`,
          html: `
            <h2>New TapTech Lead</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px;">
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${sanitized.name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${sanitized.email}">${sanitized.email}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${sanitized.phone || 'Not provided'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Package</td><td style="padding:8px;border-bottom:1px solid #eee;">${sanitized.service || 'Not selected'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;">${sanitized.message}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Submitted</td><td style="padding:8px;">${sanitized.timestamp}</td></tr>
            </table>
          `,
        }),
      });

      if (!emailRes.ok) {
        const errBody = await emailRes.text();
        console.error('[RESEND ERROR]', errBody);
        // Still return success — the log captured it
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[CONTACT FORM ERROR]', err);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 },
    );
  }
}
