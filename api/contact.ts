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

function formatWhatsAppLink(phone: string): string | null {
  const digits = phone.replace(/[^0-9]/g, '');
  if (!digits) return null;
  // If Nigerian local format (080...), replace leading 0 with 234
  if (digits.startsWith('0') && digits.length === 11) {
    return `https://wa.me/234${digits.slice(1)}`;
  }
  return `https://wa.me/${digits}`;
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  // CORS Preflight headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Health check & diagnostic status via GET
  if (req.method === 'GET') {
    const hasKey = Boolean(
      process.env.RESEND_API_KEY ||
      process.env.resend_Api_key ||
      process.env.resend_api_key ||
      process.env.RESEND_KEY
    );

    return res.status(200).json({
      status: 'active',
      service: 'Neotro Ltd Contact API',
      resendConfigured: hasKey,
      recipient: process.env.NOTIFICATION_EMAIL || 'info@neotroltd.com',
      from: process.env.FROM_EMAIL || 'Neotro Portal <inquiry@neotroltd.com>',
      timestamp: new Date().toISOString()
    });
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
    const resendApiKey =
      process.env.RESEND_API_KEY ||
      process.env.resend_Api_key ||
      process.env.resend_api_key ||
      process.env.RESEND_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@neotroltd.com';
    // Use verified domain neotroltd.com sender
    const fromEmail = process.env.FROM_EMAIL || 'Neotro Portal <inquiry@neotroltd.com>';

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY environment variable is not configured.');
      return res.status(503).json({
        success: false,
        message: 'Email service configuration pending (RESEND_API_KEY not set). Please email info@neotroltd.com directly.'
      });
    }

    const waLink = formatWhatsAppLink(phone);
    const submissionDate = new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Lagos',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // Executive Branded HTML Email Template
    const htmlEmail = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Neotro Ltd Inquiry</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F1F5F9; padding: 32px 16px;">
          <tr>
            <td align="center">
              
              <!-- Container Card -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04); border: 1px solid #E2E8F0;">
                
                <!-- Brand Header Lockup -->
                <tr>
                  <td style="background-color: #093824; padding: 28px 36px 24px 36px; border-bottom: 4px solid #10B981; text-align: center;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <!-- Official Africa Logo Lockup -->
                          <div style="background-color: #FFFFFF; display: inline-block; padding: 8px 12px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);">
                            <img 
                              src="https://raw.githubusercontent.com/NentyJnr/neotro-web/main/public/logos/neotro-official-logo.jpg" 
                              alt="Neotro Ltd Logo" 
                              width="88" 
                              height="88" 
                              style="display: block; width: 88px; height: 88px; object-fit: contain; border: 0;"
                            />
                          </div>
                          
                          <!-- Wordmark & Tagline -->
                          <div style="margin-top: 12px; font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #FFFFFF; text-transform: uppercase;">
                            NEOTRO <span style="font-size: 13px; font-weight: 400; color: #A7F3D0; letter-spacing: 0;">Ltd</span>
                          </div>
                          <div style="font-size: 12px; color: #D1FAE5; margin-top: 4px; font-weight: 500;">
                            Enterprise Digital Infrastructure &bull; Sovereign Software Systems
                          </div>
                          <div style="margin-top: 10px;">
                            <span style="display: inline-block; background-color: rgba(16, 185, 129, 0.25); border: 1px solid rgba(52, 211, 153, 0.5); color: #A7F3D0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 9999px;">
                              ● New Client Lead
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 36px 36px 28px 36px;">
                    
                    <!-- Intro Header -->
                    <div style="margin-bottom: 24px;">
                      <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #0B1F17; letter-spacing: -0.3px;">
                        New Institutional Consultation Request
                      </h1>
                      <div style="font-size: 12px; color: #64748B;">
                        Received on ${submissionDate} (Lagos, WAT)
                      </div>
                    </div>

                    <!-- Client Summary Card -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #E2E8F0;">
                          <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Contact Person</div>
                          <div style="font-size: 16px; font-weight: 700; color: #0F172A;">
                            ${escapeHtml(name)}
                          </div>
                          ${institution ? `
                          <div style="font-size: 13px; font-weight: 600; color: #059669; margin-top: 2px;">
                            ${escapeHtml(institution)}
                          </div>` : ''}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 20px 24px;">
                          <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="50%" valign="top" style="padding-right: 12px;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Official Email</div>
                                <div style="font-size: 14px; font-weight: 600;">
                                  <a href="mailto:${escapeHtml(email)}" style="color: #059669; text-decoration: none;">
                                    ${escapeHtml(email)}
                                  </a>
                                </div>
                              </td>
                              <td width="50%" valign="top" style="padding-left: 12px;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Phone / WhatsApp</div>
                                <div style="font-size: 14px; font-weight: 600;">
                                  ${phone ? `
                                  <a href="tel:${escapeHtml(phone)}" style="color: #0F172A; text-decoration: none;">
                                    ${escapeHtml(phone)}
                                  </a>` : '<span style="color: #94A3B8;">Not provided</span>'}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Primary Interest Badge Box -->
                    <div style="margin-bottom: 24px;">
                      <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Primary Solution / Platform</div>
                      <div style="display: inline-block; background-color: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; font-size: 13px; font-weight: 700; padding: 8px 16px; border-radius: 8px;">
                        ${escapeHtml(service)}
                      </div>
                    </div>

                    <!-- Requirements / Challenge Box -->
                    ${message ? `
                    <div style="margin-bottom: 28px;">
                      <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Operational Challenge &amp; Project Scope</div>
                      <div style="background-color: #F8FAFC; border-left: 4px solid #059669; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; border-radius: 0 8px 8px 0; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
${escapeHtml(message)}
                      </div>
                    </div>` : ''}

                    <!-- Quick Action Buttons -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top: 10px; margin-bottom: 10px;">
                      <tr>
                        <td align="left">
                          <a href="mailto:${escapeHtml(email)}?subject=Re:%20Neotro%20Ltd%20Consultation%20-%20${encodeURIComponent(service)}" style="display: inline-block; background-color: #093824; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 13px 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(9, 56, 36, 0.2);">
                            &larr; Reply via Email
                          </a>
                          ${waLink ? `
                          &nbsp;&nbsp;
                          <a href="${escapeHtml(waLink)}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 13px 20px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(37, 211, 102, 0.2);">
                            Chat on WhatsApp &rarr;
                          </a>` : ''}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Institutional Footer -->
                <tr>
                  <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px 36px; text-align: center; color: #64748B; font-size: 12px; line-height: 1.6;">
                    <div style="font-weight: 600; color: #0F172A; margin-bottom: 4px;">
                      Neotro Limited &bull; Institutional Web Portal
                    </div>
                    <div>18 Kokoro Street, Awoyaya, Lekki Corridor, Lagos, Nigeria</div>
                    <div style="margin-top: 6px; font-size: 11px; color: #94A3B8;">
                      Inquiries delivered to <span style="color: #059669; font-weight: 600;">${escapeHtml(notificationEmail)}</span> in accordance with NDPA 2023.
                    </div>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
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
      const errorJson: any = await response.json().catch(() => ({}));
      console.error('Resend delivery initial attempt:', errorJson);

      // Graceful fallback for Resend Sandbox mode (if domain is pending):
      const match = errorJson?.message?.match(/to your own email address \(([^)]+)\)/i);
      if (response.status === 403 && match && match[1]) {
        const allowedEmail = match[1];
        console.warn(`Resend sandbox active. Retrying delivery to registered account owner: ${allowedEmail}`);

        const sandboxNotice = `
          <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; color: #92400E; font-family: sans-serif;">
            <strong>⚠️ Resend Sandbox Notification:</strong> This inquiry was routed to your registered Resend account (<strong>${escapeHtml(allowedEmail)}</strong>). Target destination: <strong>${escapeHtml(notificationEmail)}</strong>.
          </div>
        `;

        const retryResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Neotro Portal <onboarding@resend.dev>',
            to: [allowedEmail],
            reply_to: email,
            subject: `[Neotro Inquiry] ${service} - ${name}${institution ? ` (${institution})` : ''}`,
            html: sandboxNotice + htmlEmail
          })
        });

        if (retryResponse.ok) {
          const retryData: any = await retryResponse.json().catch(() => ({}));
          return res.status(200).json({
            success: true,
            message: 'Inquiry received successfully. Our team will follow up within 4 hours.',
            id: retryData?.id,
            deliveredTo: allowedEmail,
            sandbox: true
          });
        }
      }

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
      id: resData?.id,
      deliveredTo: notificationEmail
    });
  } catch (error: any) {
    console.error('Unhandled API exception:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing inquiry. Please contact info@neotroltd.com.'
    });
  }
}
