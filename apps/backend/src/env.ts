import dotenv from 'dotenv'
dotenv.config()

const maxSize = process.env.IMAGE_MAX_SIZE || '0'

const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  MEDIA_UPLOAD_DIR: process.env.MEDIA_UPLOAD_DIR || '/tmp/uploads',
  IMAGE_URL_BASE: process.env.IMAGE_URL_BASE || '/uploads/',
  IMAGE_MAX_SIZE: parseInt(maxSize)
}

// PORT=3000
// JWT_SECRET=supersecret
// DATABASE_URL=postgresql://appuser:secret@localhost:5432/app
// SMTP_HOST=localhost
// SMTP_PORT=1025
// SMTP_USER=test@example.com
// SMTP_PASS=secret
// FRONTEND_URL=http://localhost:5173
// REDIS_URL=redis://localhost:6379
// EMAIL_FROM="OpenCupid <support@opencupid.com>"
// MEDIA_UPLOAD_DIR=/srv/uploads
// IMAGE_URL_BASE=http://localhost:3001
// IMAGE_MAX_SIZE=5 # MiB

export default env
