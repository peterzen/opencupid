import dotenv from 'dotenv'
dotenv.config()

const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
}

export default env
