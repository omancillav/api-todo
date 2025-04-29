import dotenv from 'dotenv'
dotenv.config()

export const {
  port = process.env.PORT || 3000,
  logger = process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  JWT_SECRET = process.env.JWT_SECRET
} = process.env
