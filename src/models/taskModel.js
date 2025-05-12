import { createClient } from '@libsql/client'
import { MYSQL_URL, MYSQL_TOKEN } from '../../config.js'
import { userModel } from './userModel.js'

const db = createClient({
  url: MYSQL_URL,
  authToken: MYSQL_TOKEN
})

export class taskModel {
  static async getTasks ({ status, title }) {
    let sql = 'SELECT * FROM tasks'
    const args = []

    if (status) {
      sql += ' WHERE status = ?'
      args.push(status)
    }
    if (title) {
      sql += ' WHERE title LIKE ?'
      args.push(`%${title}%`)
    }

    const result = await db.execute({ sql, args })
    return result.rows
  }

  static async getByUser ({ userId, active }) {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?'
    const args = [userId]

    if (active) {
      sql += ' AND is_active = ?'
      args.push(active)
    }

    const result = await db.execute({ sql, args })
    return result.rows
  }

  static async getById ({ id }) {
    const query = {
      sql: 'SELECT * FROM tasks WHERE id = ?',
      args: [id]
    }

    const result = await db.execute(query)
    return result.rows[0]
  }

  static async createTask ({ input }) {
    const mexicoCityDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))
    const formattedDate = mexicoCityDate.toISOString().slice(0, 19).replace('T', ' ')

    const { title, description, status, userId } = input

    const validUser = await userModel.getById({ id: userId })

    if (!validUser) {
      return { error: `User with id ${userId} does not exist` }
    }

    const query = {
      sql: 'INSERT INTO tasks (title, description, status, created_at, user_id) VALUES (?, ?, ?, ?, ?)',
      args: [title, description, status, formattedDate, userId]
    }

    try {
      const result = await db.execute(query)

      return {
        id: Number(result.lastInsertRowid),
        title,
        description,
        status,
        createdAt: formattedDate,
        userId
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error)
      return { error: error.message }
    }
  }

  static async updateTask ({ id, input }) {
    const task = await this.getById({ id })

    if (!task) return false

    if (Object.keys(input).length === 0) {
      return task
    }

    const fields = Object.keys(input).map((key) => {
      return key === 'userId' ? 'user_id = ?' : `${key} = ?`
    })

    const values = Object.values(input)
    values.push(id)

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`

    await db.execute({ sql: query, args: values })

    return await this.getById({ id })
  }

  static async deleteTask ({ id }) {
    const query = {
      sql: 'UPDATE tasks SET is_active = 0 WHERE id = ?',
      args: [id]
    }

    const result = await db.execute(query)
    if (result.changes === 0) {
      return false
    }
    return true
  }
}
