# 🚐 Proyecto IA6: Landing Page Camper Rent


Este md esta para yo ir trasteando el enunciado del proyecto, y cuando no sepa que hacer, volver a consultar el enunciado y asi seguir el hilo de lo que vamos haciendo e ir modificandolo con lo que me va surgiendo.


**Stack:** Next.js 16 (App Router) + PostgreSQL + Prisma + Auth.js  
**Patrón:** MVC con gestión de roles (**EDITOR**, **ADMIN**).

---

## 🎯 Puntos Clave del Proyecto
* **Catálogo de Flota:** Visualización de modelos de furgonetas con datos desde BD (Prisma).
* **Comunidad:** Sistema de comentarios. Lectura abierta, escritura solo para usuarios **autenticados**.
* **Captación de Leads:** Formulario de contacto validado con persistencia de solicitudes.
* **Seguridad:** Control de acceso por roles para gestionar contenido y usuarios.
* **Metodología:** Desarrollo incremental en **2 Sprints**.

---

## 🚀 TO-DO LIST (Seguimiento de Sprint)

### 🟢 Sprint 1: MVP Visual + Base de Datos
* [x] **Setup:** Iniciar proyecto Next.js 16 (Carpeta `src/`, Tailwind, etc.).
* [x] **Layout Base:** Crear el menú superior y pie de página corporativo.
* [x] **UI Landing:** Diseñar la Home y la sección de "Modelos" (usando datos mock).
* [] **Infraestructura:** Configurar `docker-compose.yml` para PostgreSQL.
* [ ] **Prisma Schema:** Definir modelos `User`, `Model`, `Comment` y `ContactRequest`.
* [ ] **Migraciones:** Aplicar el esquema a la BD (`npx prisma migrate dev`).
* [ ] **Seed:** Crear y ejecutar el script de carga de furgonetas reales.
* [ ] **Integración:** Renderizar la página de modelos consumiendo datos reales de Prisma.

### 🔵 Sprint 2: API, Seguridad y Despliegue
* [ ] **Endpoints de API:**
    * [ ] GET/POST para Comentarios (vinculados al ID del modelo).
    * [ ] POST para Formulario de contacto (validación en servidor).
* [ ] **Autenticación:** Configurar **Auth.js** (Login / Registro / Sesiones).
* [ ] **Control de Acceso:**
    * [ ] Restringir formulario de comentarios a usuarios logueados.
    * [ ] Implementar protección de rutas para roles **EDITOR** y **ADMIN**.
* [ ] **Despliegue:**
    * [ ] Publicar en **Vercel** u otra plataforma.
    * [ ] Configurar variables de entorno y migrar BD en producción.
* [ ] **Documentación:** Crear README profesional con instrucciones y credenciales de test.

---

## ✅ Casos de Prueba (Validación Final)
- [ ] **Público:** ¿Puedo ver modelos y comentarios sin cuenta?
- [ ] **Formulario:** ¿Se guardan las solicitudes de contacto correctamente?
- [ ] **Auth:** ¿El sistema me impide comentar si no he iniciado sesión?
- [ ] **Roles:** ¿El ADMIN puede ver/editar usuarios? ¿El EDITOR puede gestionar la flota?
- [ ] **Producción:** ¿Funciona todo en la URL pública definitiva?