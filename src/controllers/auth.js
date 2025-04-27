import { userModel } from '../models/mysql/user.js'
import { JWT_SECRET } from '../../config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthController {
  login = async (req, res) => {
    const { username, password } = req.body

    try {
      const user = await userModel.getAll({ username })
      const userPassword = user[0].password

      if (user.length === 0) {
        return res.status(404).json({ message: 'Invalid credentials' })
      }
      const isValidPassword = await bcrypt.compare(password, userPassword)

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

      const userData = {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email
      }
      console.log('User logged in:', userData)

      res.json({ token, userData })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
