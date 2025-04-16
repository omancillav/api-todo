import { z } from 'zod'

// Definir el enum para el campo status
const TaskStatus = z.enum(['Pendiente', 'En proceso', 'Completada'], {
  errorMap: (issue, ctx) => ({
    message: 'El estado debe ser "pendiente", "en proceso" o "completada"'
  })
})

// Esquema principal para una tarea
const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(100, 'El título no debe exceder los 100 caracteres')
    .trim()
    .refine(
      (val) => /^[a-zA-Z0-9\s.,!?áéíóúÁÉÍÓÚñÑ-]+$/.test(val),
      {
        message:
          'El título solo puede contener letras, números, espacios y signos básicos de puntuación'
      }
    ),

  description: z
    .string()
    .max(500, 'La descripción no debe exceder los 500 caracteres')
    .trim()
    .optional()
    .transform((val) => (val === '' ? undefined : val)), // Convertir cadenas vacías a undefined

  status: TaskStatus.optional().default('pendiente') // Por defecto: pendiente
})

// Esquema para validar el parámetro de estado en GET /api/tasks/status/:status
const taskStatusParamSchema = z.object({
  status: TaskStatus
})

// Funciones de validación
export function validateTask (object) {
  return taskSchema.safeParse(object)
}

export function validatePartialTask (object) {
  return taskSchema.partial().safeParse(object)
}

export function validateTaskStatusParam (object) {
  return taskStatusParamSchema.safeParse(object)
}
