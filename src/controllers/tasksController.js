import { validateTask, validatePartialTask } from '../schemas/taskSchema.js'
import { taskModel } from '../models/taskModel.js'

export class TasksController {
  static async getAll (req, res) {
    const { status, title } = req.query

    const tasks = await taskModel.getTasks({ status, title })

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' })
    }
    res.json(tasks)
  }

  static async getById (req, res) {
    const { id } = req.params
    const task = await taskModel.getById({ id })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task)
  }

  static async getByUser (req, res) {
    const { userId } = req.params
    const { active } = req.query
    const tasks = await taskModel.getByUser({ userId, active })
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' })
    }
    res.json(tasks)
  }

  static async createTask (req, res) {
    const result = validateTask(req.body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newTask = await taskModel.createTask({ input: result.data })

    if (newTask.error) {
      return res.status(404).json({ error: newTask.error })
    }
    res.status(201).json(newTask)
  }

  static async updateTask (req, res) {
    const { id } = req.params
    const result = validatePartialTask(req.body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const updatedTask = await taskModel.updateTask({ id, input: result.data })

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(updatedTask)
  }

  static async deleteTask (req, res) {
    const { id } = req.params
    const result = await taskModel.deleteTask({ id })

    if (!result) {
      return res.status(404).json({ error: 'Task Not Found' })
    }
    return res.json({ message: 'Task Deleted' })
  }
}
