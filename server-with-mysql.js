import { taskModel } from './src/models/mysql/task.js'
import { userModel } from './src/models/mysql/user.js'
import { createApp } from './app.js'

createApp({ taskModel, userModel })
