import { userModel } from '../models/userModel.js'
import { JWT_SECRET } from '../../config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthController {
  static async login (req, res) {
    const { username, password } = req.body

    const isActive = await userModel.validateActiveUser({ username })

    if (!isActive) {
      return res.status(401).json({ message: 'User is not active' })
    }

    try {
      const user = await userModel.getAll({ username })
      if (user.length === 0) {
        return res.status(404).json({ message: 'Username not found' })
      }
      const userPassword = user[0].password

      const isValidPassword = await bcrypt.compare(password, userPassword)

      if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' })

      const payload = {
        id: user[0].id,
        username: user[0].username
      }

      const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '2h' }
      )

      const userData = {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email
      }

      res.json({ token, userData })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async customToken (req, res) {
    const { username, password, expiration } = req.body

    try {
      const user = await userModel.getAll({ username })
      if (user.length === 0) {
        return res.status(404).json({ message: 'Username not found' })
      }
      const userPassword = user[0].password

      const isValidPassword = await bcrypt.compare(password, userPassword)

      if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' })

      const payload = {
        id: user[0].id,
        username: user[0].username
      }

      const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: expiration }
      )

      res.json({ token })
    } catch (error) {

    }
  }
}
