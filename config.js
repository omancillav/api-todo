export const {
  port = process.env.PORT || 3000,
  logger = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
} = process.env
