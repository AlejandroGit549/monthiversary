# Monthiversary

Página estática para Jess y Ale. Abre [index.html](index.html) directamente en el navegador o publícala junto con las carpetas `css` y `js` en cualquier alojamiento de sitios estáticos.

## Contenido para publicar

Edita el objeto `publishedContent` al principio de [js/app.js](js/app.js). La fecha inicial (`2026-07-27`) y los nombres ya están configurados. Añade poemas al arreglo `poems` con `title`, `text` y `signature`; usa `\n` dentro de `text` para separar versos:

```js
{ title: 'Otro poema', text: 'Primer verso\nSegundo verso', signature: 'Para Ale' }
```

Las notas del carrusel están en `notes`. Añade tantos objetos como necesites; el contador y las flechas se actualizan solos:

```js
{ date: '2026-09-27', title: 'Otro mes juntos', note: 'Lo que quiero recordar de este día.' }
```

Para el collage, coloca tus imágenes en una carpeta `fotos` al lado de `index.html` y añade un objeto por foto al arreglo `collage`:

```js
{ src: 'fotos/nuestro-dia.jpg', alt: 'Jess y Ale juntos', note: 'Un día que siempre recordaré.' }
```

Reemplaza las dos fotos de ejemplo de `collage` por tus propias imágenes y textos. La galería muestra una foto a la vez; sus flechas recorren automáticamente todas las entradas del arreglo. Incluye la carpeta `fotos` al publicar.

Las notas, poemas y fotos definidos en JavaScript aparecerán para todos al publicar los archivos. Las notas añadidas desde el botón de la página, y los cambios hechos mediante **Personalizar**, se guardan solo en el navegador actual; para publicarlos para todos, incorpóralos al código. Si una edición de nombres o fecha no se refleja en tu navegador, borra los datos locales del sitio. Las imágenes de ejemplo y las fuentes externas requieren conexión a internet; las fotos propias guardadas en `fotos` no.