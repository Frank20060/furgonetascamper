<!-- BEGIN:nextjs-agent-rules -->

# INSTRUCCIONES PARA IA — Next.js 16 Strict Mode

⚠️ **ADVERTENCIA CRÍTICA:** Este proyecto usa Next.js 16 con cambios radicales respecto a versiones anteriores.
La IA DEBE leer este documento completo ANTES de generar cualquier código.

**NO asumas nada de tu training data sobre Next.js. Las reglas aquí SON la verdad absoluta.**

---

## INSTRUCCIÓN PRINCIPAL

AI: Cuando trabajes en este proyecto, SIEMPRE:

1. ✅ Respeta las "Reglas de Oro" sin excepciones
2. ✅ Valida que tu código las cumple ANTES de escribirlo
3. ✅ Si tienes duda, consulta esta guía
4. ❌ NO improvises patrones que no estén documentados aquí

## 1. Reglas de Oro (OBLIGATORIAS)

### Regla #1: SIEMPRE await params (v16)

**Toda ruta dinámica DEBE hacer await en params y searchParams.**

```javascript
// ✅ CORRECTO
export default async function Page({ params }) {
  const { slug } = await params;  // ← AWAIT es obligatorio
  // usar slug aquí
}

// ❌ INCORRECTO - Esto causará error
export default async function Page({ params }) {
  const { slug } = params;  // ← FALTA await
}
```

### Regla #2: Componentes son Server por defecto

**TODAS las rutas en `app/` son Server Components por defecto.**

- Solo añade `"use client"` si necesitas hooks o eventos del navegador
- Prisma SOLO funciona en Server Components
- Las variables de entorno sensibles SOLO en Server Components

### Regla #3: Middleware va en proxy.js

**NO uses `middleware.js`. Usa `proxy.js` en la raíz del proyecto.**

- Este archivo intercepta requests globales
- Se ejecuta en el edge (antes del servidor)

### Regla #4: Database en Server únicamente

**Prisma NUNCA debe estar en un componente con `"use client"`**

- Prisma es importado solo en Server Components
- Rutas API (`app/api/`) pueden usar Prisma
- Los datos se pasan como props a Client Components

## 2. Estructura de Carpetas Esperada

```
app/
├── layout.js              ← Layout raíz (envuelve todo)
├── page.js                ← Página inicio (/)
├── globals.css
├── (site)/                ← Route Group: no aparece en URL
│   ├── layout.js          ← Layout solo para rutas en (site)
│   ├── page.js            ← /
│   ├── about/page.js      ← /about
│   └── [slug]/            ← Ruta dinámica
│       ├── page.js        ← /:slug
│       └── layout.js      ← Layout para [slug]
├── api/
│   └── usuarios/route.js  ← Endpoint POST /api/usuarios
├── _components/           ← Private folder (no genera ruta)
│   ├── Navbar.js
│   └── Footer.js
└── _lib/
    └── utils.js           ← Funciones compartidas

lib/
├── prisma.js              ← Singleton de Prisma (OBLIGATORIO)
├── db.js                  ← Queries a DB
└── constants.js           ← Constantes de app

prisma/
├── schema.prisma          ← Definición de modelos
└── migrations/            ← Historial de cambios

public/                    ← Archivos estáticos

.env.local                 ← NUNCA commitear (secretos aquí)
docker-compose.yml         ← Para PostgreSQL 16
package.json               ← DEBE tener "type": "module"
```

## 3. Server vs Client Components (Estrategia)

### Server Components (DEFAULT)

**Usa Server Components SIEMPRE que sea posible.**

- ✅ Fetching de datos (directamente en el componente)
- ✅ Acceso a Prisma/Database
- ✅ Variables de entorno sensibles
- ✅ Operaciones de larga duración

**Ejemplo Server Component:**

```javascript
// app/productos/page.js
import { prisma } from "@/lib/prisma";

export default async function ProductosPage() {
  const productos = await prisma.producto.findMany();
  return (
    <div>
      {productos.map((p) => (
        <div key={p.id}>{p.nombre}</div>
      ))}
    </div>
  );
}
```

### Client Components ("use client")

**Usa Client Components SOLO cuando necesites:**

- ❌ Hooks (`useState`, `useEffect`, `useContext`)
- ❌ Event listeners (`onClick`, `onChange`)
- ❌ Browser APIs (`localStorage`, `sessionStorage`)

**Nunca:**

- ❌ Importes Prisma
- ❌ Accedas a variables de entorno sensibles
- ❌ Hagas operaciones de DB directamente

**Ejemplo Client Component:**

```javascript
"use client";
import { useState } from "react";

export default function MiComponente({ datos }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>;
}
```

### Patrón recomendado: Server + Client pequeño

```javascript
// app/dashboard/page.js (Server Component)
import { prisma } from "@/lib/prisma";
import ClientFilter from "@/_components/ClientFilter";

export default async function DashboardPage() {
  const datos = await prisma.datos.findMany();
  return (
    <div>
      <ClientFilter datos={datos} /> ← Pasa datos como prop
    </div>
  );
}

// app/_components/ClientFilter.js (Client Component)
"use client";
import { useState } from "react";

export default function ClientFilter({ datos }) {
  const [filtro, setFiltro] = useState("");
  return (
    <div>
      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
    </div>
  );
}
```

## 4. Base de Datos (Prisma 7 + PostgreSQL + Docker)

### Paso 1: Levantar PostgreSQL con Docker

**Crea `docker-compose.yml` en la raíz:**

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: furgonetascamper
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

**Comando para levantar:**

```bash
docker compose up -d
```

### Paso 2: Configurar .env.local

**Crea `.env.local` (NO commitear):**

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/furgonetascamper"
```

### Paso 3: Singleton de Prisma (OBLIGATORIO)

**Crea `lib/prisma.js`:**

```javascript
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis;

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**Por qué es obligatorio:** En desarrollo, Next.js recarga archivos (HMR). Sin el singleton, cada recarga abrería una nueva conexión. Esto rompe la app.

### Paso 4: Importar Prisma correctamente

**En cualquier Server Component o API Route:**

```javascript
import { prisma } from "@/lib/prisma";

// Usar prisma
const usuarios = await prisma.usuario.findMany();
```

## 5. Estrategias de Datos y Rendimiento

### Opción 1: Renderizado Dinámico (Siempre fresh)

**Usa cuando:** Los datos cambien frecuentemente, no puedes cachear.

```javascript
// app/posts/page.js
export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await prisma.post.findMany();
  return <div>{/* posts aquí */}</div>;
}
```

**Resultado:** Cada visita consulta la DB. Sin caché.

### Opción 2: Revalidación por Tiempo (ISR)

**Usa cuando:** Los datos cambian ocasionalmente (cada X minutos).

```javascript
// app/productos/page.js
const productos = await prisma.producto.findMany();

// Revalidar cada 60 segundos
export const revalidate = 60;

export default async function ProductosPage() {
  return <div>{/* productos aquí */}</div>;
}
```

**Resultado:** La página se cachea 60 seg. Luego se revalida.

### Opción 3: Rutas Estáticas Pre-generadas (Máxima velocidad)

**Usa cuando:** Tienes rutas dinámicas que no cambian frecuentemente.

```javascript
// app/posts/[slug]/page.js

// Genera todas las rutas en build-time
export async function generateStaticParams() {
  const posts = await prisma.post.findMany();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({ where: { slug } });
  return <div>{post.titulo}</div>;
}
```

**Resultado:** Las rutas se generan en build (rápido). No hace queries en runtime.

## 6. Checklist: Validación de Código

**Antes de hacer commit, AI DEBE validar:**

- [ ] ¿Hay algún `params.algo` SIN `await`? ❌ Forbidden
- [ ] ¿Hay imports de Prisma en componentes con `"use client"`? ❌ Forbidden
- [ ] ¿Hay variables de entorno sensibles exponidas en Client? ❌ Forbidden
- [ ] ¿Todas las funciones async usan `await` en las Promises? ✅ Check
- [ ] ¿Los archivos privados están en `_carpetas`? ✅ Check
- [ ] ¿El singleton de Prisma está siendo usado? ✅ Check
- [ ] ¿Las rutas dinámicas tienen `generateStaticParams` si es necesario? ✅ Check

---

## 7. Flujo de Trabajo Paso a Paso

### Cuando crees una nueva página dinámica:

1. Crea `app/[recurso]/[slug]/page.js` (Server Component)
2. Añade `const { slug } = await params;` OBLIGATORIO
3. Importa `prisma` desde `@/lib/prisma`
4. Query la BD
5. Si quieres interactividad, usa Client Components pequeños
6. Si la ruta existe en BD, considera `generateStaticParams`

### Cuando crees un API Endpoint:

1. Crea `app/api/ruta/route.js`
2. Exporta `export async function POST(request) { ... }`
3. Importa Prisma
4. Valida input
5. Devuelve `Response` con JSON

**Ejemplo:**

```javascript
// app/api/usuarios/route.js
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();

  const usuario = await prisma.usuario.create({
    data: { ...body },
  });

  return Response.json(usuario);
}
```

---

## 8. Tabla de Comandos

| Comando                  | Cuándo                     | Qué hace                                          |
| ------------------------ | -------------------------- | ------------------------------------------------- |
| `npm run dev`            | Desarrollo                 | Inicia servidor con Turbopack en `localhost:3000` |
| `npx prisma migrate dev` | Tras cambiar schema.prisma | Crea migration y aplica a BD                      |
| `npx prisma db seed`     | Setup inicial              | Puebla la BD con datos de seed.js                 |
| `npx prisma studio`      | Debugging                  | Abre UI para ver/editar BD                        |
| `npx prisma generate`    | Si hay error de tipos      | Regenera client de Prisma                         |
| `npm run build`          | Antes de deploy            | Genera build estático                             |

---

## 9. Errores Comunes y Soluciones

### ❌ Error: "Cannot use Prisma in Client Component"

**Causa:** Importaste Prisma en un archivo con `"use client"`.
**Solución:** Mueve la lógica de BD a un Server Component padre.

```javascript
// ❌ INCORRECTO
"use client";
import { prisma } from "@/lib/prisma";

// ✅ CORRECTO
// Server Component (sin "use client")
const datos = await prisma.datos.findMany();
export default async function Page() {
  return <ClientComponent datos={datos} />;
}
```

### ❌ Error: "Cannot read property 'slug' of Promise"

**Causa:** Olvidaste `await params`.
**Solución:**

```javascript
// ❌ INCORRECTO
const { slug } = params;

// ✅ CORRECTO
const { slug } = await params;
```

### ❌ Error: "ECONNREFUSED: Connection refused"

**Causa:** Docker no está corriendo o Puerto 5432 ocupado.
**Solución:**

```bash
docker compose up -d
# O si port está ocupado:
lsof -i :5432  # Encuentra qué usa el puerto
kill -9 <PID>
```

### ❌ Error: "No seed file found"

**Causa:** Falta `"type": "module"` en package.json.
**Solución:** Añade a package.json:

```json
{
  "type": "module"
}
```

### ❌ Error: "Cannot find module '@/lib/prisma'"

**Causa:** La ruta no existe o jsconfig.json mal configurado.
**Solución:** Verifica jsconfig.json:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 10. Resumen: Lo que la IA DEBE hacer

✅ **SIEMPRE:**

- Usar `await` en params y searchParams
- Importar Prisma desde `@/lib/prisma`
- Mantener Prisma en Server Components únicamente
- Usar Route Groups para organizar sin afectar URLs
- Validar que el singleton de Prisma existe
- Documentar rutas dinámicas que usan `generateStaticParams`

❌ **NUNCA:**

- Poner Prisma en Client Components
- Olvidar `await` en params
- Exponer secrets en Client
- Usar `middleware.js` (usa `proxy.js`)
- Commitear `.env.local`
- Asumir comportamiento de Next.js anterior a v16

---

## 11. Registro de Historial (OBLIGATORIO)

**Es MANDATORIO registrar cada petición del usuario y su resultado en el archivo `historial_prompts.md` en la raíz del proyecto.**

- ✅ Cada vez que el usuario realice una petición significativa, añade una entrada al historial.
- ✅ Incluye el prompt exacto del usuario y un resumen del resultado/acción realizada.
- ✅ Esto sirve como memoria a largo plazo de las decisiones de diseño y requisitos del proyecto.

---

<!-- END:nextjs-agent-rules -->
