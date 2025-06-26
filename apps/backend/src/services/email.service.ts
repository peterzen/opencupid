import { appConfig } from '@/lib/appconfig'
import nodemailer from 'nodemailer'

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: appConfig.SMTP_HOST,
      port: Number(appConfig.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: appConfig.SMTP_USER,
        pass: appConfig.SMTP_PASS,
      },
    })
  }

  async sendMail(to: string, subject: string, html: string, from?: string) {
    const mailOptions = {
      from: from || appConfig.EMAIL_FROM,
      to,
      subject,
      html,
    }

    return this.transporter.sendMail(mailOptions)
  }

  async sendConfirmationEmail(to: string, token: string) {
    const confirmUrl = `${appConfig.FRONTEND_URL}/confirm-email?token=${token}`
    const html = `
      <p>Thank you for registering! Please confirm your email by clicking the link below:</p>
      <a href="${confirmUrl}">${confirmUrl}</a>
    `
    return this.sendMail(to, 'Confirm your email address', html)
  }

  async sendPasswordRecoveryEmail(to: string, token: string) {
    const confirmUrl = `${appConfig.FRONTEND_URL}/confirm-email?token=${token}`
    const html = `
      <p>Thank you for registering! Please confirm your email by clicking the link below:</p>
      <a href="${confirmUrl}">${confirmUrl}</a>
    `
    return this.sendMail(to, 'Confirm your email address', html)
  }
}

export const emailService = new EmailService()
