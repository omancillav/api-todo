import { Router } from 'express'
import { UserController } from '../controllers/users.js'

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()

  const userController = new UserController({ userModel })

  userRouter.get('/', userController.getAll)
  userRouter.get('/:id', userController.getById)

  userRouter.post('/', userController.createUser)

  userRouter.patch('/:id', userController.updateUser)
  userRouter.delete('/:id', userController.deleteUser)

  return userRouter
}
