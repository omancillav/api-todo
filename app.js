import express, { json } from 'express'
import { corsMiddleware } from './src/middlewares/cors.js'
import { createTaskRouter } from './src/routes/tasks.js'
import { createUserRouter } from './src/routes/users.js'
import dotenv from 'dotenv'
import morgan from 'morgan'

const logger = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'

dotenv.config()

export const createApp = ({ taskModel, userModel }) => {
  const port = process.env.PORT || 3000
  const app = express()

  app.use(json())
  app.disable('x-powered-by')
  app.use(morgan(logger))
  app.use(corsMiddleware())

  app.use('/tasks', createTaskRouter({ taskModel }))
  app.use('/users', createUserRouter({ userModel }))

  app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`)
    console.log(`http://localhost:${port}/tasks\n`)
  })
}
