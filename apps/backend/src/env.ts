import dotenv from 'dotenv'
dotenv.config()

const maxSize = process.env.IMAGE_MAX_SIZE || '0'

const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  MEDIA_UPLOAD_DIR: process.env.MEDIA_UPLOAD_DIR || '/tmp/uploads',
  IMAGE_URL_BASE: process.env.IMAGE_URL_BASE || '/uploads/',
  IMAGE_MAX_SIZE: parseInt(maxSize)
}

export default env
