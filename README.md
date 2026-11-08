# Monthiversary

Página de aniversario para Jess y Ale. La interfaz sigue el diseño lila, romántico y editorial de la referencia: contador, línea de tiempo, galería, razones, poemas, notas, playlist y cartas. Sirve el contenido público desde Supabase y permite editarlo desde un panel protegido con Supabase Auth.

## Configuración de Supabase

1. Crea un proyecto y ejecuta [`supabase/schema.sql`](supabase/schema.sql) completo en **SQL Editor**. Esto configura las tablas, las políticas RLS y el bucket público `anniversary-media`.
2. En **Project Settings > API**, coloca la Project URL y la clave **publishable/anon** en [`js/config.js`](js/config.js). La clave de navegador es pública; nunca uses ni publiques la clave `service_role`.
3. En **Authentication > Providers**, habilita Email. En **Authentication > URL Configuration**, configura el sitio publicado como Site URL y agrega las URLs de desarrollo y producción a Redirect URLs. Sirve el sitio por HTTP/HTTPS; los enlaces de acceso no funcionan con `file://`.
4. Publica `index.html`, `callback.html` y las carpetas `css`, `js` y `supabase` en un hosting estático.
5. Abre el sitio, pulsa **Gestión** e inicia sesión con el correo que será administrador. Abre el enlace mágico que llegará al correo.
6. En Supabase, abre **Authentication > Users**, copia el UUID del usuario y autorízalo en SQL Editor:

   ```sql
   insert into public.anniversary_admins (user_id)
   values ('UUID_DEL_USUARIO')
   on conflict (user_id) do nothing;
   ```

7. Vuelve a cargar el sitio e inicia sesión. El administrador podrá cambiar los nombres, fecha y textos, y agregar, editar o quitar hitos, fotos, razones, poemas, notas, canciones y cartas. También podrá cargar fotos al bucket desde el panel. Si aún no existe contenido en Supabase, se publica el contenido inicial de la aplicación al iniciar sesión.

El contenido del sitio se guarda en `public.anniversary_content`. Cualquier visitante puede leerlo; solo los UUID incluidos en `anniversary_admins` pueden modificarlo. Las imágenes se sirven desde el bucket público y solo un administrador puede cargarlas. El panel valida enlaces de YouTube/Spotify y limita las imágenes a 8 MB.

## Migración de datos anteriores

Al iniciar sesión con una cuenta autorizada, las notas y canciones del almacenamiento local anterior (`monthiversary-v1`) y de `shared_entries` se incorporan al contenido centralizado. El almacenamiento local anterior se elimina solo después de confirmar que el contenido se guardó correctamente en Supabase.

## Desarrollo local

Sirve la carpeta mediante Live Server u otro servidor HTTP local. Añade la URL resultante (incluido el callback `callback.html`) a **Redirect URLs** en Supabase. Si Supabase no está configurado o todavía no se ha aplicado el esquema, la página muestra el contenido inicial y el estado de conexión correspondiente.
