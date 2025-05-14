import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string, from?: string) {
    const mailOptions = {
      from: from || `"OpenCupid" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendConfirmationEmail(to: string, token: string) {
    const confirmUrl = `${process.env.FRONTEND_URL}/confirm-email?token=${token}`;
    const html = `
      <p>Thank you for registering! Please confirm your email by clicking the link below:</p>
      <a href="${confirmUrl}">${confirmUrl}</a>
    `;
    return this.sendMail(to, 'Confirm your email address', html);
  }

  async sendPasswordRecoveryEmail(to: string, token: string) {
    const confirmUrl = `${process.env.FRONTEND_URL}/confirm-email?token=${token}`;
    const html = `
      <p>Thank you for registering! Please confirm your email by clicking the link below:</p>
      <a href="${confirmUrl}">${confirmUrl}</a>
    `;
    return this.sendMail(to, 'Confirm your email address', html);
  }



  // Add more transactional email methods as needed
}

export const emailService = new EmailService();