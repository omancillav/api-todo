import { z } from 'zod'

// Definir el enum para el campo status
const TaskStatus = z.enum(['Pendiente', 'Completada'], {
  errorMap: (issue, ctx) => ({
    message: 'El estado debe ser "Pendiente" o "Completada"'
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
      (val) => /^[a-zA-Z0-9\s.,!?áéíóúÁÉÍÓÚñÑ/_\-"]+$/.test(val),
      {
        message:
          'El título solo puede contener letras, números, espacios, signos básicos de puntuación y los caracteres /, -, _, ""'
      }
    ),

  description: z
    .string()
    .max(500, 'La descripción no debe exceder los 500 caracteres')
    .trim()
    .optional()
    .transform((val) => (val === '' ? undefined : val)), // Convertir cadenas vacías a undefined

  status: TaskStatus.optional().default('Pendiente'), // Por defecto: pendiente
  userId: z
    .number()
    .int('El ID de usuario debe ser un número entero')
    .positive('El ID de usuario debe ser un número positivo')
})

// Funciones de validación
export function validateTask (object) {
  return taskSchema.safeParse(object)
}

export function validatePartialTask (object) {
  return taskSchema.partial().safeParse(object)
}
