# Historial de Prompts

Este documento contiene el registro de las peticiones realizadas durante el desarrollo del proyecto FurgoCamper.

## Peticiones

1. **Diseño inicial y Home**:
   - *Prompt:* "Crea una web profesional de alquiler de furgonetas camper. Usa una paleta de colores basada en 'deep-forest' (#102C26) y 'champagne' (#F7E7CE). La tipografía debe ser Krona One para titulares e IBM Plex Sans para el cuerpo. Implementa un layout con header pegajoso (sticky), navegación y footer, además de una página de inicio con un Hero y un grid de tarjetas de furgonetas (cards)."
   - *Resultado:* Creación de la estructura base en `layout.js` y `page.js` con el diseño visual, la paleta de colores corporativa y el grid inicial de campers.

2. **Configuración de fuentes**: 
   - *Prompt:* "intenta hacer que se usen las siguientes fuentes (hedlines krona one y para el body IBM Plex Sans)"
   - *Resultado:* Configuración de `next/font/google` en `layout.js` y mapeo en `globals.css` usando Tailwind v4.

3. **Refactorización inicial de componentes**:
   - *Prompt:* "Ok, ahora haz tres componentes en la carpeta _componentes, uno para el nav, uno para el footer y uno que sea la card de las furgos, haz que cada uno sea un fichero"
   - *Resultado:* Creación de `Navbar.js`, `Footer.js` y `CamperCard.js` en `app/_components/`.

4. **Creación de páginas de Campers y Contacto**:
   - *Prompt:* "haz una cosa basica tanto para la pagina de contacto (en la que habra un form), y en campers que será un listado de cards (de momento haz todo sin componetizar mas adelante ya lo haremos (lo que si que puesdes es reutilizar los componetes que ya estan hechos pero no crear nuevos))"
   - *Resultado:* Implementación de `app/(site)/campers/page.js` (listado) y `app/(site)/contacto/page.js` (formulario).

5. **Mejora de accesibilidad y contraste**:
   - *Prompt:* "me gusta la page de contacto pero hay que cambiar el color de alguna fuente porque es muy parecido al fondo y no se distingue"
   - *Resultado:* Ajuste de colores de fuentes y opacidades en la página de contacto para mejorar el contraste sobre el fondo champagne.

6. **Refactorización del formulario**:
   - *Prompt:* "ok, ahora haz que el form sea un componente"
   - *Resultado:* Extracción del formulario de contacto a `app/_components/ContactForm.js`.

7. **Registro de actividad**:
   - *Prompt:* "revisa el historial de prompts que te he ido haciendo y ves guardandolos en un md"
   - *Resultado:* Creación de este archivo `historial_prompts.md`.
   
8. **Configuración de persistencia del historial**:
   - *Prompt:* "Añade en el AGENTS.md, que los prompts se vayan guardando en este .md (añade este prompt tambien)"
   - *Resultado:* Actualización de `AGENTS.md` con la nueva regla y actualización de este archivo.
