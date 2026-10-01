import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!,
});

export async function sendConfirmationEmail(to: string, orderId: number) {
  const domain = process.env.MAILGUN_DOMAIN!;
  await mg.messages.create(domain, {
    from: `My Shop <postmaster@${domain}>`,
    to: [to],
    subject: `Order Confirmation #${orderId}`,
    text: `Thanks for your order! Your order ID is ${orderId}.`,
  });
}