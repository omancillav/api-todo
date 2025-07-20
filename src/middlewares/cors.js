import cors from 'cors'
import { allowedOrigins } from '../../config.js'

export const corsMiddleware = () => cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }
    console.log('Origen: ', origin)
    console.log('Origenes aceptados: ', allowedOrigins)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  optionsSuccessStatus: 200
})
