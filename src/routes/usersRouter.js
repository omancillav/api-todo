import { Router } from 'express'
import { UserController } from '../controllers/usersController.js'

export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)
usersRouter.get('/:id', UserController.getById)

usersRouter.post('/', UserController.createUser)

usersRouter.patch('/:id', UserController.updateUser)
usersRouter.delete('/:id', UserController.deleteUser)
