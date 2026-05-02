# Historial de Prompts

Antes de empezar, quiero decir que este .md está hecho para guardar las peticiones que se le hacen al agente, para que se pueda llevar un registro de los cambios realizados en el proyecto. 
En agents.md he agregado la siguiente instruccion: 
"Añade en el AGENTS.md, que los prompts se vayan guardando en este .md (añade este prompt tambien)"

Este documento contiene el registro de las peticiones realizadas durante el desarrollo del proyecto FurgoCamper.

## Peticiones

1. **Diseño inicial y Home**:
   - *Prompt:* "Crea una web profesional de alquiler de furgonetas camper. Usa una paleta de colores basada en 'deep-forest' (#102C26) y 'champagne' (#F7E7CE). La tipografía debe ser Krona One para titulares e IBM Plex Sans para el cuerpo. Implementa un layout con header pegajoso (sticky), navegación y footer, además de una página de inicio con un Hero y un grid de tarjetas de furgonetas (cards)."
   - *Resultado:* Creación de la estructura base en `layout.js` y `page.js` con el diseño visual, la paleta de colores corporativa y el grid inicial de campers.

2. **Cambiar el css a tailwind**:
   - *Prompt:* "Cambia el css inline que estas usando por tailwind v4 para que el resultado se intente parecer lo mas posible al diseño original"
   - *Resultado:* "Se ha generado un `globals.css` con la configuración de tailwind y se ha cambiado todo el css inline por tailwind"

3. **Configuración de fuentes**: 
   - *Prompt:* "intenta hacer que se usen las siguientes fuentes (hedlines krona one y para el body IBM Plex Sans)"
   - *Resultado:* Configuración de `next/font/google` en `layout.js` y mapeo en `globals.css` usando Tailwind v4.

4. **Refactorización inicial de componentes**:
   - *Prompt:* "Ok, ahora haz tres componentes en la carpeta _componentes, uno para el nav, uno para el footer y uno que sea la card de las furgos, haz que cada uno sea un fichero"
   - *Resultado:* Creación de `Navbar.js`, `Footer.js` y `CamperCard.js` en `app/_components/`.

5. **Creación de páginas de Campers y Contacto**:
   - *Prompt:* "haz una cosa basica tanto para la pagina de contacto (en la que habra un form), y en campers que será un listado de cards (de momento haz todo sin componetizar mas adelante ya lo haremos (lo que si que puesdes es reutilizar los componetes que ya estan hechos pero no crear nuevos))"
   - *Resultado:* Implementación de `app/(site)/campers/page.js` (listado) y `app/(site)/contacto/page.js` (formulario).

6. **Mejora de accesibilidad y contraste**:
   - *Prompt:* "me gusta la page de contacto pero hay que cambiar el color de alguna fuente porque es muy parecido al fondo y no se distingue"
   - *Resultado:* Ajuste de colores de fuentes y opacidades en la página de contacto para mejorar el contraste sobre el fondo champagne.

7. **Refactorización del formulario**:
   - *Prompt:* "ok, ahora haz que el form sea un componente"
   - *Resultado:* Extracción del formulario de contacto a `app/_components/ContactForm.js`.

8. **Registro de actividad**:
   - *Prompt:* "revisa el historial de prompts que te he ido haciendo y ves guardandolos en un md"
   - *Resultado:* Creación de este archivo `historial_prompts.md`.

9. **Configuración de persistencia del historial**:
   - *Prompt:* "Añade en el AGENTS.md, que los prompts se vayan guardando en este .md (añade este prompt tambien)"
   - *Resultado:* Actualización de `AGENTS.md` con la nueva regla y actualización de este archivo.

10. **Creación de favicon SVG**:
    - *Prompt:* "haz un svn para usarlo en la pestaña de toda la app, que sea como una camper pero con vista frontal, con los colores de la page (usa como referencia la VOLKSWAGEN KOMBI clasica)"
    - *Resultado:* Creación de `public/favicon.svg` con un diseño minimalista de una Kombi clásica y actualización de los metadatos en `layout.js`.

11. **Efecto de brillo en el logo**:
    - *Prompt:* "haz que tenga como un poco de shadow blanco (desde el codigo de el svg) para que en fondos osucuros destaque un poco mas"
    - *Resultado:* Aplicación de un filtro `feDropShadow` blanco en el archivo `favicon.svg` para mejorar el contraste en fondos oscuros.

12. **Corrección de keys duplicadas**:
    - *Prompt:* "¿qué es este warning?? Encountered two children with the same key, '/'. ..."
    - *Resultado:* Solución del error de React en `Footer.js` cambiando el atributo `key` para que use el texto del enlace en lugar de la URL (que estaba duplicada como `/`).

13. **Consultoría de Modelado y Seed de BD**:
    - *Prompt:* "como ves este modelo para el proyecto, que añadirias?? model camper { ... }" y luego "pon 5 o 6 ejemplos papra que se vea algo en lla web"
    - *Resultado:* Se propuso un modelo mejorado (`Camper`) con mejores convenciones. Se refactorizó `prisma/seed.js` para insertar 6 furgonetas camper de ejemplo y se ejecutó en la base de datos.

14. **Gestión de .gitignore para nuevos ficheros**:
    - *Prompt:* "que dedveria de añadir en el .gitignore con los nuevos ficheros"
    - *Resultado:* Explicación de que no hace falta añadir nada porque `.env` y `node_modules` ya están ignorados de forma predeterminada.

15. **Integración de DB con Componentes UI**:
    - *Prompt:* "edita el proyecto para que las cards que salen se cojan con los datos de la bd, haz algo como esto, pero para nuestro proyecto..."
    - *Resultado:* Se actualizó `CamperCard.js` para que reciba el objeto de la base de datos y se actualizaron `app/page.js` y `app/(site)/campers/page.js` para hacer fetch directo a la base de datos con Prisma en lugar de usar un array hardcodeado.

16. **Página de detalle de la furgoneta**:
    - *Prompt:* "Haz la pagina de una furgo, usando el slug, haz que sea una vista en al que la imagen salga en un lateral y toda la info en otro..."
    - *Resultado:* Se creó `app/(site)/campers/[slug]/page.js` con un diseño en dos columnas (imagen izquierda, detalles derecha). Implementado como Server Component que hace fetch del registro usando Prisma y retorna un 404 (`notFound()`) si el slug no existe en BD.

18. **Ajuste de imagen hero a la derecha**:
    - *Prompt:* "Lo que quiero es que verticalmente este centrada y que horizontal este pegada a la esquina (que el corte quede con el final de la web)"
    - *Resultado:* Se actualizó `app/page.js` cambiando las clases a `right-0 top-1/2 -translate-y-1/2 object-right` con un `translate-x-[10%]` para que la imagen quede cortada y alineada exactamente con el borde derecho de la pantalla, manteniendo su centrado vertical.

19. **Revisión del esquema de Prisma**:
    - *Prompt:* "como ves los modelos que he cread??? Algun cambio, se puede poner que role String @default("USER") // "USER", "EDITOR", "ADMIN" solo hacepte esos tres casos tipo un select??"
    - *Resultado:* Se actualizó `schema.prisma` reemplazando el `String` por un `enum Role` para limitar los valores posibles. También se agregaron las relaciones explícitas `@relation` en el modelo `Comment` para vincularlo correctamente con `User` y `Camper`.
