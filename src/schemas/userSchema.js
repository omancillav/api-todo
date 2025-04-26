import { z } from 'zod'

const UserSchema = z.object({
  username: z
    .string()
    .min(1, 'El nombre de usuario es obligatorio')
    .max(50, 'El nombre de usuario no debe exceder los 50 caracteres')
    .trim()
    .refine(
      (val) => /^[a-zA-Z0-9_.-]+$/.test(val),
      {
        message:
          'El nombre de usuario solo puede contener letras, números y los caracteres especiales: _ y -'
      }
    ),

  email: z
    .string()
    .email('El correo electrónico no es válido')
    .max(100, 'El correo electrónico no debe exceder los 100 caracteres')
    .trim(),

  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña no debe exceder los 100 caracteres')
    .trim()
})

export function validateUser (object) {
  return UserSchema.safeParse(object)
}

export function validatePartialUser (object) {
  return UserSchema.partial().safeParse(object)
}
