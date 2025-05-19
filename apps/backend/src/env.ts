import dotenv from 'dotenv'
dotenv.config()

const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  MEDIA_UPLOAD_DIR: process.env.MEDIA_UPLOAD_DIR || '/tmp/uploads',
  MEDIA_UPLOAD_URL: process.env.MEDIA_UPLOAD_URL || '/uploads/',
}

export default env
