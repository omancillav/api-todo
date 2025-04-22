import express, { json } from 'express'
import { corsMiddleware } from './src/middlewares/cors.js'
import { createTaskRouter } from './src/routes/tasks.js'
import dotenv from 'dotenv'
import morgan from 'morgan' // Importar Morgan

dotenv.config()

export const createApp = ({ taskModel }) => {
  const port = process.env.PORT || 3000
  const app = express()

  app.use(json())
  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use(corsMiddleware())

  app.use('/tasks', createTaskRouter({ taskModel }))

  app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`)
    console.log(`http://localhost:${port}/tasks\n`)
  })
}
