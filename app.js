import express, { json } from 'express'
import { corsMiddleware } from './src/middlewares/cors.js'
import { authenticateToken } from './src/middlewares/auth.js'
import { tasksRouter } from './src/routes/tasksRouter.js'
import { usersRouter } from './src/routes/usersRouter.js'
import { authRouter } from './src/routes/authRouter.js'
import { port, logger } from './config.js'
import morgan from 'morgan'

console.log(port, logger)

const app = express()

app.use(json())
app.disable('x-powered-by')
app.use(morgan(logger))
app.use(corsMiddleware())

app.use('/tasks', authenticateToken, tasksRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`\nServer is running on port ${port}`)
})
