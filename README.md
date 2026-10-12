# Monthiversary

Página para Jess y Ale. Para probarla con autenticación y sincronización, sírvela por HTTP (por ejemplo, con Live Server) y publícala junto con las carpetas `css`, `js` y `supabase` en un alojamiento estático.

## Contenido para publicar

Edita el objeto `publishedContent` al principio de [js/app.js](js/app.js). La fecha inicial (`2026-07-27`) y los nombres ya están configurados. Añade poemas al arreglo `poems` con `title`, `text` y `signature`; usa `\n` dentro de `text` para separar versos:

```js
{ title: 'Otro poema', text: 'Primer verso\nSegundo verso', signature: 'Para Ale' }
```

Las notas iniciales del carrusel están en `notes`. Las notas nuevas se agregan desde el formulario y se guardan localmente o en Supabase:

```js
{ date: '2026-09-27', title: 'Otro mes juntos', note: 'Lo que quiero recordar de este día.' }
```

Para el collage, coloca tus imágenes en una carpeta `fotos` al lado de `index.html` y añade un objeto por foto al arreglo `collage`:

```js
{ src: 'fotos/nuestro-dia.jpg', alt: 'Jess y Ale juntos', note: 'Un día que siempre recordaré.' }
```

Reemplaza las fotos de `collage` por tus propias imágenes y textos. La galería muestra una foto centrada con navegación táctil, teclado y paginación. Incluye la carpeta `fotos` al publicar.

## Supabase

Supabase permite consultar las notas y canciones desde varios dispositivos usando la misma cuenta.

1. Crea un proyecto de Supabase y ejecuta [supabase/schema.sql](supabase/schema.sql) desde el SQL Editor.
2. En **Project Settings > API**, copia la Project URL y la clave `anon`/publishable en [js/config.js](js/config.js). No pongas la clave `service_role` en el sitio.
3. Habilita Email en **Authentication > Providers**. Crea o permite la cuenta de correo que usarás en ambos dispositivos.
4. En **Authentication > URL Configuration**, agrega las URLs locales y de producción a Redirect URLs. Para enlaces mágicos, sirve la página por HTTP/HTTPS; `file://` no sirve como URL de retorno.
5. Publica la página. Pulsa **Sincronizar** e inicia sesión con el mismo correo en cada dispositivo.

Las políticas de la tabla aíslan los datos por usuario autenticado. Solo la misma cuenta puede leer, guardar y borrar sus notas/canciones. Al iniciar sesión, las notas y canciones que se guardaron localmente se migran una vez a Supabase. Sin configurar Supabase, la página sigue funcionando con `localStorage`, pero muestra que los datos solo están en ese navegador.

Las canciones aceptan enlaces HTTPS de YouTube o Spotify. Los poemas, imágenes y contenido inicial siguen definidos en `publishedContent` dentro de [js/app.js](js/app.js). Swiper, Supabase JS, Lucide, las fuentes y las imágenes remotas requieren conexión a internet.