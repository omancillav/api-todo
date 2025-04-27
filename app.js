import express, { json } from 'express'
import { corsMiddleware } from './src/middlewares/cors.js'
import { authenticateToken } from './src/middlewares/auth.js'
import { createTaskRouter } from './src/routes/tasks.js'
import { createUserRouter } from './src/routes/users.js'
import { port, logger } from './config.js'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

export const createApp = ({ taskModel, userModel }) => {
  const app = express()

  app.use(json())
  app.disable('x-powered-by')
  app.use(morgan(logger))
  app.use(corsMiddleware())

  app.use('/tasks', authenticateToken, createTaskRouter({ taskModel }))
  app.use('/users', createUserRouter({ userModel }))

  app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`)
  })
}
