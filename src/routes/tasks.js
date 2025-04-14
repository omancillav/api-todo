import { Router } from 'express'
import { tasksController } from '../controllers/tasks.js'

export const tasksRouter = Router()

tasksRouter.get('/', tasksController.getAll)
tasksRouter.get('/:id', tasksController.getById)

tasksRouter.post('/', tasksController.createTask)

tasksRouter.patch('/:id', tasksController.updateTask)
tasksRouter.delete('/:id', tasksController.deleteTask)
