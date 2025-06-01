// src/workers/emailWorker.ts
import { Worker } from 'bullmq'
import IORedis from 'ioredis'
import { prisma } from '../lib/prisma'
import nodemailer from 'nodemailer'

const redisUrl = process.env.REDIS_URL
if (!redisUrl) {
  throw new Error('REDIS_URL environment variable is not defined')
}

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null
})



// configure your SMTP or API transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})


new Worker('emails', async job => {
  if (job.name === 'sendLoginLinkEmail') {
    const { userId } = job.data as { userId: string }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('User not found')

    const otp = user.loginToken
    if (!otp || !user.email) throw new Error('OTP or email not found for user')

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Your login link',
      html: `<p>Hey there, welcome aboard!</p>
      <h1>${otp}</h1>
      <p>Please click this link to jump right in:       
      <a href="${process.env.FRONTEND_URL}/login?otp=${otp}&userId=${user.id}">Confirm Email</a></p>`
    })
  }

  if (job.name === 'sendWelcomeEmail') {
    const { userId } = job.data as { userId: string }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('User not found')
    if (!user.email) throw new Error('Email not found for user')

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Welcome to OpenCupid!',
      html: `<p>Hey there, welcome aboard!</p>
      <a href="${process.env.FRONTEND_URL}/me">Go connect with people</a></p>
      `
    })
  }



}, { connection })
