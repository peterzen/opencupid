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
  if (job.name === 'sendConfirmationEmail') {
    const { userId } = job.data as { userId: string }

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) throw new Error('User not found')

    const emailToken = user.resetToken
    const email = user.email

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Please confirm your email address',
      html: `<p>Hey there, welcome aboard!</p>
      <p>Please click this link to jump right in: <a href="${process.env.FRONTEND_URL}/confirm-email?token=${emailToken}">Confirm Email</a></p>`
    })
  }

  if (job.name === 'sendWelcomeEmail') {
    const { userId } = job.data as { userId: string }

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) throw new Error('User not found')

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Welcome to OpenCupid!',
      html: `<p>Hey there, welcome aboard!</p>`
    })
  }

  if (job.name === 'sendPasswordRecoveryEmail') {
    const { userId } = job.data as { userId: string }

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) throw new Error('User not found')

    const emailToken = user.resetToken
    const email = user.email

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Reset your password',
      html: `<p>To reset your password, click this link</p>
      <p><a href="${process.env.FRONTEND_URL}/reset-password?token=${emailToken}">Confirm Email</a></p>`
    })
  }


}, { connection })
