import { validateUser, validatePartialUser } from '../schemas/userSchema.js'
import { JWT_SECRET } from '../../config.js'
import jwt from 'jsonwebtoken'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  login = async (req, res) => {
    const { username, password } = req.body

    try {
      const user = await this.userModel.getAll({ username })
      const hashedPassword = user[0].password

      if (user.length === 0) {
        return res.status(404).json({ message: 'Invalid credentials' })
      }
      const isValidPassword = await this.userModel.validatePassword({ password, hashedPassword })

      if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' })

      const payload = {
        id: user[0].id,
        username: user[0].username
      }

      const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '1h' }
      )
      res.json({ token })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  getAll = async (req, res) => {
    const { username, email } = req.query

    const users = await this.userModel.getAll({ username, email })

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' })
    }
    res.json(users)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const user = await this.userModel.getById({ id })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  }

  createUser = async (req, res) => {
    const result = validateUser(req.body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await this.userModel.createUser({ input: result.data })
    res.status(201).json(newUser)
  }

  updateUser = async (req, res) => {
    const { id } = req.params
    const result = validatePartialUser(req.body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const updatedUser = await this.userModel.updateUser({ id, input: result.data })

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(updatedUser)
  }

  deleteUser = async (req, res) => {
    const { id } = req.params
    const result = await this.userModel.deleteUser({ id })

    if (!result) {
      return res.status(404).json({ error: 'User Not Found' })
    }
    return res.json({ message: 'User Deleted' })
  }
}
