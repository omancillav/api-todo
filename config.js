import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT: port = '3000',
  MYSQL_URL,
  MYSQL_TOKEN,
  NODE_ENV,
  logger = NODE_ENV === 'production' ? 'combined' : 'dev',
  JWT_SECRET,
  ALLOWED_ORIGINS: envOrigins = 'http://127.0.0.1:5173',
  allowedOrigins = envOrigins.split(',').map(origin => origin.trim())
} = process.env
