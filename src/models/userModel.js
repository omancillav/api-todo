import { createClient } from '@libsql/client'
import { MYSQL_URL, MYSQL_TOKEN } from '../../config.js'
import bcrypt from 'bcrypt'

const db = createClient({
  url: MYSQL_URL,
  authToken: MYSQL_TOKEN
})

export class userModel {
  static async getAll ({ username, status }) {
    let sql = 'SELECT * FROM users'
    const args = []

    if (username) {
      sql += ' WHERE username LIKE ?'
      args.push(`%${username}%`)
    }
    if (status) {
      sql += ' WHERE is_active = ?'
      args.push(status)
    }

    const result = await db.execute({
      sql,
      args
    })
    return result.rows
  }

  static async getById ({ id }) {
    const query = {
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [id]
    }

    const result = await db.execute(query)
    return result.rows[0]
  }

  static async createUser ({ input }) {
    const { username, email, password } = input
    const hashedPassword = await bcrypt.hash(password, 10)

    const query = {
      sql: 'INSERT INTO users (username, email, password) VALUES (:username, :email, :password)',
      args: { username, email, password: hashedPassword }
    }

    try {
      const result = await db.execute(query)
      return {
        id: Number(result.lastInsertRowid),
        username,
        email,
        password: hashedPassword
      }
    } catch (e) {
      throw new Error('Error creating user')
    }
  }

  static async updateUser ({ id, input }) {
    const user = await this.getById({ id })

    if (!user) return false

    if (Object.keys(input).length === 0) {
      return user
    }

    if (input.password) {
      input.password = await bcrypt.hash(input.password, 10)
    }

    const fields = Object.keys(input).map(key => `${key} = ?`)
    const values = Object.values(input)
    values.push(id)

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`

    await db.execute({
      sql: query,
      args: values
    })

    return await this.getById({ id })
  }

  static async deleteUser ({ id }) {
    const query = {
      sql: 'UPDATE users SET is_active = 0 WHERE id = ?',
      args: [id]
    }

    try {
      const result = await db.execute(query)
      if (result.changes === 0) {
        return false
      }
      return true
    } catch (e) {
      throw new Error('Error deleting user')
    }
  }
}
