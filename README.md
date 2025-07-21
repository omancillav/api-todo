# Donly API

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

API RESTful para la gestión de tareas y usuarios, desarrollada con Node.js, Express y SQLite.

## Características

- ✅ Autenticación JWT
- 🔐 Protección de rutas con middleware de autenticación
- 📝 Gestión de tareas (CRUD)
- 👥 Gestión de usuarios
- 🔄 CORS habilitado
- 📊 Logging con Morgan
- 🛡️ Validación de datos con Zod
- 🔄 Despliegue en Vercel

## Tecnologías Utilizadas

- **Runtime:** Node.js
- **Framework:** Express
- **Base de datos:** SQLite con libSQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Validación de datos:** Zod
- **Seguridad:** bcrypt para hashing de contraseñas
- **Logging:** Morgan
- **CORS:** Middleware personalizado

## Estructura del Proyecto

```
src/
├── controllers/    # Controladores para manejar la lógica de negocio
├── middlewares/   # Middlewares personalizados (auth, CORS)
├── models/        # Modelos de datos y conexión a la base de datos
├── routes/        # Definición de rutas
└── schemas/       # Esquemas de validación con Zod
```

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm
- Cuenta en [Turso](https://turso.tech/) para la base de datos SQLite (opcional)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/omancillav/donly-api.git
   cd donly-api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   PORT=3000
   JWT_SECRET=tu_clave_secreta_jwt
   TURSO_DATABASE_URL=tu_url_de_turso
   TURSO_AUTH_TOKEN=tu_token_de_autenticacion
   ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   O para producción:
   ```bash
   npm start
   ```

## Documentación de la API

La API estará disponible en `http://localhost:3000` por defecto.

### Endpoints

#### Autenticación
- `POST /auth/register` - Registrar un nuevo usuario
- `POST /auth/login` - Iniciar sesión y obtener token JWT

#### Usuarios
- `GET /users` - Obtener lista de usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear un nuevo usuario
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

#### Tareas (requiere autenticación)
- `GET /tasks` - Obtener todas las tareas del usuario autenticado
- `GET /tasks/:id` - Obtener una tarea específica
- `POST /tasks` - Crear una nueva tarea
- `PATCH /tasks/:id` - Actualizar una tarea
- `DELETE /tasks/:id` - Eliminar una tarea

## Variables de Entorno

| Variable | Descripción | Requerido | Valor por defecto |
|----------|-------------|-----------|-------------------|
| PORT | Puerto del servidor | No | 3000 |
| JWT_SECRET | Clave secreta para firmar los tokens JWT | Sí | - |
| TURSO_DATABASE_URL | URL de la base de datos Turso | Sí | - |
| TURSO_AUTH_TOKEN | Token de autenticación para Turso | Sí | - |
| NODE_ENV | Entorno de ejecución | No | development |

## Despliegue

Este proyecto está configurado para desplegarse en Vercel. Simplemente haz push a la rama `main` y Vercel se encargará del despliegue automático.

---

Desarrollado por [Omar Mancilla](https://github.com/omancillav)
