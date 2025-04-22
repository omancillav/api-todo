import { validateTask, validatePartialTask } from '../schemas/taskSchema.js'

export class TasksController {
  constructor ({ taskModel }) {
    this.taskModel = taskModel
  }

  getAll = async (req, res) => {
    const { status, title } = req.query
    const tasks = await this.taskModel.getAll({ status, title })

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' })
    }
    res.json(tasks)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const task = await this.taskModel.getById({ id })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task)
  }

  createTask = async (req, res) => {
    const result = validateTask(req.body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newTask = await this.taskModel.createTask({ input: result.data })
    res.status(201).json(newTask)
  }

  updateTask = async (req, res) => {
    const { id } = req.params
    const result = validatePartialTask(req.body)

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const updatedTask = await this.taskModel.updateTask({ id, input: result.data })

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(updatedTask)
  }

  deleteTask = async (req, res) => {
    const { id } = req.params
    const result = await this.taskModel.deleteTask({ id })

    if (!result) {
      return res.status(404).json({ error: 'Task Not Found' })
    }
    return res.json({ message: 'Task Deleted' })
  }
}
