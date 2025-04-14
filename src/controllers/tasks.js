import { taskModel } from '../models/task.js'
import { validateTask, validatePartialTask } from '../schemas/taskSchema.js'

export class tasksController {
  static async getAll (req, res) {
    console.log(`[${new Date().toISOString()}] GET /tasks - Query params: ${JSON.stringify(req.query)}`)

    const { status } = req.query
    const tasks = await taskModel.getAll({ status })

    if (tasks.length === 0) {
      console.log(`[${new Date().toISOString()}] GET /tasks - No tasks found with status: ${status || 'any'}`)
      return res.status(404).json({ message: 'No tasks found' })
    }

    console.log(`[${new Date().toISOString()}] GET /tasks - Found ${tasks.length} tasks`)
    res.json(tasks)
  }

  static async getById (req, res) {
    const { id } = req.params
    console.log(`[${new Date().toISOString()}] GET /tasks/${id} - Fetching task by ID`)

    const task = await taskModel.getById({ id })

    if (!task) {
      console.log(`[${new Date().toISOString()}] GET /tasks/${id} - Task not found`)
      return res.status(404).json({ message: 'Task not found' })
    }

    console.log(`[${new Date().toISOString()}] GET /tasks/${id} - Task found successfully`)
    res.json(task)
  }

  static async createTask (req, res) {
    console.log(`[${new Date().toISOString()}] POST /tasks - Creating new task: ${JSON.stringify(req.body)}`)

    const result = validateTask(req.body)

    if (result.error) {
      console.log(`[${new Date().toISOString()}] POST /tasks - Validation error: ${result.error.message}`)
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newTask = await taskModel.createTask({ input: result.data })
    console.log(`[${new Date().toISOString()}] POST /tasks - Task created successfully with ID: ${newTask.id}`)
    res.status(201).json(newTask)
  }

  static async updateTask (req, res) {
    const { id } = req.params
    console.log(`[${new Date().toISOString()}] PUT/PATCH /tasks/${id} - Updating task with data: ${JSON.stringify(req.body)}`)

    const result = validatePartialTask(req.body)

    if (result.error) {
      console.log(`[${new Date().toISOString()}] PUT/PATCH /tasks/${id} - Validation error: ${result.error.message}`)
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const updatedTask = await taskModel.updateTask({ id, input: result.data })

    if (!updatedTask) {
      console.log(`[${new Date().toISOString()}] PUT/PATCH /tasks/${id} - Task not found`)
      return res.status(404).json({ message: 'Task not found' })
    }

    console.log(`[${new Date().toISOString()}] PUT/PATCH /tasks/${id} - Task updated successfully`)
    res.json(updatedTask)
  }

  static async deleteTask (req, res) {
    const { id } = req.params
    console.log(`[${new Date().toISOString()}] DELETE /tasks/${id} - Attempting to delete task`)

    const result = await taskModel.deleteTask({ id })

    if (!result) {
      console.log(`[${new Date().toISOString()}] DELETE /tasks/${id} - Task not found`)
      return res.status(404).json({ error: 'Task Not Found' })
    }

    console.log(`[${new Date().toISOString()}] DELETE /tasks/${id} - Task deleted successfully`)
    return res.json({ message: 'Task Deleted' })
  }
}
