import { validateUser, validatePartialUser } from '../schemas/userSchema.js'
import { userModel } from '../models/userModel.js'

export class UserController {
  static async getAll (req, res) {
    const { username, email } = req.query

    const users = await userModel.getAll({ username, email })

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' })
    }
    res.json(users)
  }

  static async getById (req, res) {
    const { id } = req.params
    const user = await userModel.getById({ id })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  }

  static async createUser (req, res) {
    const result = validateUser(req.body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await userModel.createUser({ input: result.data })
    res.status(201).json(newUser)
  }

  static async updateUser (req, res) {
    const { id } = req.params
    const result = validatePartialUser(req.body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const updatedUser = await userModel.updateUser({ id, input: result.data })

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(updatedUser)
  }

  static async deleteUser (req, res) {
    const { id } = req.params
    const result = await userModel.deleteUser({ id })

    if (!result) {
      return res.status(404).json({ error: 'User Not Found' })
    }
    return res.json({ message: 'User Deleted' })
  }
}
