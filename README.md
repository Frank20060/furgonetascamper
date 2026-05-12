# 🚐 FurgoCamper - Landing Page Corporativa (IA6)

Este proyecto consiste en el diseño e implementación de una landing page corporativa para una empresa de alquiler de furgonetas camper, desarrollada bajo el marco de la evaluación **IA6**. Se ha hecho especial hincapié en el uso responsable de la Inteligencia Artificial y en el cumplimiento de los estándares de **Next.js 16**.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Base de Datos:** PostgreSQL (Desplegada en **Neon**)
- **ORM:** Prisma
- **Autenticación:** Auth.js v5
- **Estilos:** Tailwind CSS v4
- **Seguridad:** Bcryptjs para hashing de contraseñas y `proxy.js` para protección de rutas.

## 🚀 Características Principales

1.  **Landing Page Pública:** Presentación de la empresa y propuesta de valor con diseño premium.
2.  **Catálogo de Flota:** Visualización dinámica de modelos camper consumidos desde la BD.
3.  **Sistema de Comentarios:** Hilos de comentarios recursivos (respuestas anidadas). Lectura pública, escritura restringida a usuarios autenticados.
4.  **Formulario de Contacto:** Validación robusta en cliente y servidor con persistencia de leads.
5.  **Panel de Administración:** Gestión CRUD completa de furgonetas y usuarios, incluyendo subida de imágenes.
6.  **Gestión de Roles:** Control de acceso granular para los roles `USER`, `EDITOR` y `ADMIN`.

## 📦 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd furgonetascamper
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido (ajusta según sea necesario):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/furgonetascamper"
AUTH_SECRET="tu_secreto_generado_con_npx_auth_secret"
```

### 4. Levantar la base de datos (Docker)

Asegúrate de tener Docker instalado y ejecuta:

```bash
docker compose up -d
```

### 5. Preparar la Base de Datos

Ejecuta las migraciones y carga los datos iniciales (seed):

```bash
npx prisma migrate dev
npx prisma db seed
```

### 6. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000.

## 🔐 Credenciales de Prueba

El script de `seed.js` crea automáticamente tres usuarios para probar las restricciones de rol (Contraseña para todos: `demo1234`):

| Rol        | Email               | Uso                                                     |
| :--------- | :------------------ | :------------------------------------------------------ |
| **ADMIN**  | `admin@demo.local`  | Acceso total al panel de control y gestión de usuarios. |
| **EDITOR** | `editor@demo.local` | Gestión de flota y contenido.                           |
| **USER**   | `user@demo.local`   | Usuario estándar, puede publicar comentarios.           |

## 🌐 Demostración en Vivo

**URL de Producción:** https://furgonetascamper.onrender.com/

Puedes probar todas las funcionalidades directamente en la versión desplegada usando las credenciales de prueba de arriba.

## 🤖 Uso de IA

Este proyecto ha sido desarrollado siguiendo una metodología híbrida con asistencia de IA. Puedes consultar el registro detallado de decisiones técnicas y prompts utilizados en:
👉 [Historial de Prompts](historial_prompts.md)

## 📋 Evidencia de Trabajo (Sprints)

Puedes revisar el historial de commits en el repositorio para ver la secuencia de desarrollo incremental:

```bash
git log --oneline
```

Commits clave:

- **Sprint 1:** Diseño y BD (commits hasta "datos de pruebas generados con la seed")
- **Sprint 2:** Auth.js, CRUD, Seguridad (commits de "CRUD funcional" en adelante)

## 📄 Licencia

Este proyecto se entrega bajo el marco académico del ciclo DAW2.
