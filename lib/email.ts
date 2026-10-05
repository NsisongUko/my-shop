import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY!,
});

export async function sendConfirmationEmail(to: string, orderId: number) {
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'ProductKit';

  if (!senderEmail) {
    console.warn('Brevo sender email not configured, skipping email');
    return;
  }

  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: `Order Confirmation #${orderId}`,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7c3aed;">Thank you for your order! 🎉</h1>
          <p>Your order <strong>#${orderId}</strong> has been received.</p>
          <p>We'll send you a download link or shipping update shortly.</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            — The ProductKit Team
          </p>
        </div>
      `,
      textContent: `Thank you for your order! Your order ID is ${orderId}.`,
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [{ email: to }],
    });

    console.log('✓ Confirmation email sent. Message ID:', result.messageId);
  } catch (error) {
    console.error('Brevo send failed:', error);
    throw error;
  }
}