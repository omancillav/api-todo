import { Router } from 'express'
import { TasksController } from '../controllers/tasksController.js'

export const tasksRouter = Router()

tasksRouter.get('/', TasksController.getAll)
tasksRouter.get('/:id', TasksController.getById)
tasksRouter.get('/user/:userId', TasksController.getByUser)

tasksRouter.post('/', TasksController.createTask)

tasksRouter.patch('/:id', TasksController.updateTask)
tasksRouter.delete('/:id', TasksController.deleteTask)
