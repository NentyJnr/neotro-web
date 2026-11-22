declare const process: {
  env: Record<string, string | undefined>;
};

export interface ServerlessRequest {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[]>;
}

export interface ServerlessResponse {
  status: (code: number) => ServerlessResponse;
  json: (data: any) => ServerlessResponse;
  send?: (data: any) => ServerlessResponse;
  end: () => any;
  setHeader: (name: string, value: string | string[]) => ServerlessResponse;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  // CORS Preflight headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST requests are supported.'
    });
  }

  try {
    const rawBody = req.body;
    const body = typeof rawBody === 'string' ? JSON.parse(rawBody) : (rawBody || {});

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const institution = String(body.institution || body.organization || body.company || '').trim();
    const service = String(body.service || body.sector || body.systemInterest || 'General Inquiry').trim();
    const message = String(body.message || body.problemDescription || body.requirements || '').trim();

    // Field Validation
    if (!name || !email) {
      return res.status(422).json({
        success: false,
        message: 'Name and official email are required fields.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Email Configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@neotroltd.com';
    // When using unverified domain in testing, Resend permits onboarding@resend.dev sending to account owner
    // Once neotroltd.com domain is added in Resend, set FROM_EMAIL to e.g. "Neotro Portal <inquiry@neotroltd.com>"
    const fromEmail = process.env.FROM_EMAIL || 'Neotro Portal <onboarding@resend.dev>';

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY environment variable is not configured.');
      return res.status(503).json({
        success: false,
        message: 'Email service configuration pending (RESEND_API_KEY not set). Please email info@neotroltd.com directly.'
      });
    }

    // Build Formatted HTML Email
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Neotro Ltd Inquiry</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f8; color: #0b1f17; padding: 24px; margin: 0; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06); }
          .header { background: #093824; color: #ffffff; padding: 28px 32px; border-bottom: 3px solid #10b981; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #a7f3d0; }
          .body { padding: 32px; }
          .row { margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px; }
          .row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
          .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 5px; }
          .value { font-size: 15px; color: #0f172a; font-weight: 500; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
          .badge { display: inline-block; padding: 3px 10px; border-radius: 9999px; background: #dcfce7; color: #093824; font-size: 12px; font-weight: 600; }
          .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 32px; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>New Client / Institutional Inquiry</h1>
            <p>Submitted through Neotro Ltd Official Web Portal</p>
          </div>
          <div class="body">
            <div class="row">
              <div class="label">Full Name</div>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            <div class="row">
              <div class="label">Official Email</div>
              <div class="value">
                <a href="mailto:${escapeHtml(email)}" style="color: #059669; text-decoration: none; font-weight: 600;">
                  ${escapeHtml(email)}
                </a>
              </div>
            </div>
            ${phone ? `
            <div class="row">
              <div class="label">Phone / WhatsApp</div>
              <div class="value">
                <a href="tel:${escapeHtml(phone)}" style="color: #059669; text-decoration: none;">
                  ${escapeHtml(phone)}
                </a>
              </div>
            </div>` : ''}
            ${institution ? `
            <div class="row">
              <div class="label">Institution / Organization</div>
              <div class="value">${escapeHtml(institution)}</div>
            </div>` : ''}
            <div class="row">
              <div class="label">Primary System Interest</div>
              <div class="value"><span class="badge">${escapeHtml(service)}</span></div>
            </div>
            ${message ? `
            <div class="row">
              <div class="label">Operational Challenge / Requirements</div>
              <div class="message-box">${escapeHtml(message)}</div>
            </div>` : ''}
          </div>
          <div class="footer">
            Neotro Ltd Institutional Software Showcase &bull; Inquiries routed to ${escapeHtml(notificationEmail)}
          </div>
        </div>
      </body>
      </html>
    `;

    // Dispatch via Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notificationEmail],
        reply_to: email,
        subject: `[Neotro Inquiry] ${service} - ${name}${institution ? ` (${institution})` : ''}`,
        html: htmlEmail
      })
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      console.error('Resend delivery failure:', errorJson);
      return res.status(502).json({
        success: false,
        message: 'Email gateway delivery failed. Please reach out to info@neotroltd.com directly.',
        error: errorJson
      });
    }

    const resData: any = await response.json().catch(() => ({}));
    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully. Our team will follow up within 4 hours.',
      id: resData?.id
    });
  } catch (error: any) {
    console.error('Unhandled API exception:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing inquiry. Please contact info@neotroltd.com.'
    });
  }
}
