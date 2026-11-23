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

// Embedded base64 Neotro emblem logo for inline MIME CID email attachment
const NEOTRO_LOGO_BASE64 = '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';

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
                              src="cid:neotro-logo" 
                              alt="Neotro Ltd Logo" 
                              width="88" 
                              height="88" 
                              style="display: block; width: 88px; height: 88px; object-fit: contain; border: 0; font-family: sans-serif; font-size: 13px; font-weight: bold; color: #093824; text-align: center; line-height: 88px;"
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

                    <!-- Primary Interest Badge Box (if specified) -->
                    ${(service && service !== 'General Inquiry' && service !== 'Custom Project Inquiry') ? `
                    <div style="margin-bottom: 24px;">
                      <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Primary Solution / Platform</div>
                      <div style="display: inline-block; background-color: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; font-size: 13px; font-weight: 700; padding: 8px 16px; border-radius: 8px;">
                        ${escapeHtml(service)}
                      </div>
                    </div>` : ''}

                    <!-- Requirements / Challenge Box -->
                    ${message ? `
                    <div style="margin-bottom: 28px;">
                      <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">What Client Wants to Build / Project Scope</div>
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

    const emailSubject = (service && service !== 'General Inquiry' && service !== 'Custom Project Inquiry')
      ? `[Neotro Inquiry] ${service} - ${name}${institution ? ` (${institution})` : ''}`
      : `[Neotro Inquiry] ${name}${institution ? ` (${institution})` : ''} - Project Requirements`;

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
        subject: emailSubject,
        html: htmlEmail,
        attachments: [
          {
            filename: 'neotro-official-logo.jpg',
            content: NEOTRO_LOGO_BASE64,
            content_id: 'neotro-logo',
            contentId: 'neotro-logo',
            content_type: 'image/jpeg'
          }
        ]
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
            html: sandboxNotice + htmlEmail,
          attachments: [
            {
              filename: 'neotro-official-logo.jpg',
              content: NEOTRO_LOGO_BASE64,
              content_id: 'neotro-logo',
              contentId: 'neotro-logo',
              content_type: 'image/jpeg'
            }
          ]
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
