# Around The U.S.

## Descripción

Proyecto de práctica desarrollado durante el bootcamp de TripleTen (Sprints 6 a 8). "Around The U.S." es una página interactiva donde el usuario puede editar su perfil, agregar tarjetas de fotos, darles "me gusta", eliminarlas y ver una versión ampliada de cada imagen. En el Sprint 8 el proyecto fue refactorizado con TypeScript y Programación Orientada a Objetos.

## Funcionalidad

- Editar el nombre y la descripción del perfil desde una ventana emergente.
- Agregar nuevas tarjetas de fotos indicando un título y un enlace de imagen.
- Dar "me gusta" a una tarjeta haciendo clic en el ícono de corazón.
- Eliminar cualquier tarjeta de la lista.
- Ver una versión ampliada de la imagen de cada tarjeta en una ventana emergente.
- Las tarjetas se generan dinámicamente a partir de un array de datos, usando un elemento `<template>` de HTML.
- Todos los formularios cuentan con validación en tiempo real: el botón de envío permanece inactivo hasta que todos los campos son válidos.

## Tecnologías y técnicas

- HTML5 semántico y CSS3 (Flexbox, metodología BEM). Las ventanas emergentes están creadas en HTML/CSS, no de forma dinámica.
- **TypeScript**, compilado a JavaScript con `tsc` (`rootDir: ./src`, `outDir: ./public`) en modo `strict`.
- **Programación Orientada a Objetos (POO)**: el proyecto está organizado en clases con responsabilidad única y acoplamiento débil:
  - `FormValidator`: valida los campos de un formulario y controla el botón de envío.
  - `Card`: construye una tarjeta individual a partir de una plantilla HTML.
  - `Section<T>`: renderiza una colección de elementos dentro de un contenedor (clase genérica).
  - `Popup` (clase padre) → `PopupWithImage` y `PopupWithForm` (subclases): gestionan la apertura/cierre de las ventanas emergentes.
  - `UserInfo`: obtiene y actualiza la información del usuario.
- Módulos ES6 (`import`/`export`), con `index.ts` como único punto de ensamblaje de las clases y los detectores de eventos.
- Git y GitHub.

## Estructura del proyecto

```
web_project_around_es/
  tsconfig.json
  public/      # HTML, CSS, imágenes y JS compilado
  src/         # código fuente TypeScript
    components/
    types/
    utils/
    index.ts
```

## Cómo ejecutar el proyecto

1. Instala TypeScript si no lo tienes: `npm install -g typescript`.
2. Compila el proyecto: `tsc`.
3. Abre `public/index.html` en el navegador.

## Demo

https://lauraespejoo.github.io/web_project_around_es/

