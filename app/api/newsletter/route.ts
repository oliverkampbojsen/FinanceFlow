import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send welcome email
    await resend.emails.send({
      from: 'FinanceFlow <newsletter@financeflow24.com>',
      to: email,
      subject: 'Welcome to FinanceFlow Newsletter! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 40px auto;
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo {
                font-size: 32px;
                font-weight: bold;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 10px;
              }
              .content {
                color: #333;
                line-height: 1.6;
              }
              .content h1 {
                color: #667eea;
                font-size: 24px;
                margin-bottom: 20px;
              }
              .button {
                display: inline-block;
                margin: 30px 0;
                padding: 15px 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 10px;
                font-weight: bold;
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #999;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">📈 FinanceFlow</div>
                <p style="color: #666;">AI-Powered Financial Intelligence</p>
              </div>

              <div class="content">
                <h1>Welcome to FinanceFlow! 🎉</h1>

                <p>Thanks for subscribing to our newsletter! We're excited to have you on board.</p>

                <p>You'll receive:</p>
                <ul>
                  <li>💡 Financial tips and best practices</li>
                  <li>🚀 Product updates and new features</li>
                  <li>📊 Market insights and trends</li>
                  <li>🎁 Exclusive offers for subscribers</li>
                </ul>

                <div style="text-align: center;">
                  <a href="https://financeflow24.com/" class="button">Get Started with FinanceFlow</a>
                </div>

                <p>We respect your privacy and will never share your email with anyone.</p>
              </div>

              <div class="footer">
                <p>You're receiving this because you signed up for the FinanceFlow newsletter.</p>
                <p>© 2026 FinanceFlow. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
