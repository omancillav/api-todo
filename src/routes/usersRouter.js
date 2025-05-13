import { Router } from 'express'
import { UserController } from '../controllers/usersController.js'
import { authenticateToken } from '../middlewares/auth.js'

export const usersRouter = Router()
usersRouter.post('/', UserController.createUser)

usersRouter.use(authenticateToken)

usersRouter.get('/', UserController.getAll)
usersRouter.get('/:id', UserController.getById)

usersRouter.patch('/:id', UserController.updateUser)
usersRouter.delete('/:id', UserController.deleteUser)
