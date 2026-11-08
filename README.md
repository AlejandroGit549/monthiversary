# Monthiversary

Página de aniversario para Jess y Ale. La interfaz conserva el diseño lila, romántico y editorial de la referencia. La playlist, notas, poemas, cartas, fotos y demás secciones se guardan juntas como contenido compartido en Supabase.

## Configuración de Supabase

1. Confirma que estos dos UUID existan en **Authentication > Users**:
   - `6e4ee8a5-dccb-42bc-83b4-f7870b85f007`
   - `e108228f-2db6-4567-bc3b-dc84d6b0acb6`
2. Ejecuta o vuelve a ejecutar [`supabase/schema.sql`](supabase/schema.sql) completo en el **SQL Editor**. El esquema configura las tablas, las políticas RLS y el bucket `anniversary-media`; también autoriza esos dos usuarios y revoca el acceso de gestión a cualquier otro UUID. Si falta uno de los usuarios, el SQL se detendrá con un error explícito.
3. En **Project Settings > API**, configura la Project URL y la clave **publishable/anon** en [`js/config.js`](js/config.js). Esa clave es pública para el navegador; nunca uses ni publiques la clave `service_role`.
4. Habilita Email en **Authentication > Providers**. En **Authentication > URL Configuration**, configura el sitio publicado como Site URL y agrega las URLs de desarrollo y producción a Redirect URLs. Sirve el sitio por HTTP/HTTPS; los enlaces de acceso no funcionan con `file://`.
5. Publica `index.html`, `callback.html` y las carpetas `css`, `js` y `supabase` en un hosting estático.
6. Cada usuario autorizado inicia sesión con el correo asociado a su UUID. Ambos gestionan desde **Gestión** la misma playlist y pueden cargar música, cartas, notas, poemas, hitos, razones y fotos. Los cambios se comparten entre los dos; solo esos UUID pueden modificarlos. Las fotos cargadas usan el bucket público y el límite es 8 MB.

El contenido del sitio vive en `public.anniversary_content` y se puede leer públicamente. Las escrituras del contenido, de las entradas heredadas y del almacenamiento de imágenes están restringidas por RLS a los dos UUID anteriores.

## Migración anterior

Al iniciar sesión con cualquiera de las cuentas autorizadas, las notas y canciones de esa cuenta en el almacenamiento local anterior (`monthiversary-v1`) y en `shared_entries` se incorporan a la lista compartida. El almacenamiento local anterior se elimina solo después de confirmar el guardado en Supabase.

## Desarrollo local

Sirve la carpeta mediante Live Server u otro servidor HTTP local y agrega esa URL, incluido `callback.html`, a **Redirect URLs** en Supabase.
