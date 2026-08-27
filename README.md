# Forzar Idioma en Google (FIG)

Muchos servicios de Google determinan el idioma de su interfaz basándose en diversos factores, como la configuración de la cuenta o las preferencias del navegador. Esta extensión proporciona una forma sencilla de anular esta configuración y forzar un idioma específico para la página actual del servicio de Google mediante la modificación de los parámetros de la URL.

De este modo, puedes utilizar FIG para acceder de manera anticipada a características y funciones que inicialmente solo están disponibles en inglés en algunos servicios de Google. También resulta ideal para pruebas rápidas, demos y formaciones.

![Imagen FIG](./readme-files/FIG1280x800.png)

## Características

*   **Forzar Cambio de Idioma:** Modifica la URL actual añadiendo o actualizando los parámetros `hl` (idioma del host) y `forcehl=1` para cambiar de manera forzada el idioma de la interfaz.
*   **Servicios Compatibles Conocidos:** Incluye una lista predefinida de dominios de Google donde se sabe que el mecanismo de forzado de idioma funciona de manera fiable.
*   **Idiomas Favoritos:** Permite a los usuarios marcar los idiomas utilizados frecuentemente como "favoritos" para un acceso más rápido.
*   **Restablecer Idioma:** Ofrece una opción para eliminar los parámetros de forzado de idioma de la URL, volviendo al comportamiento de idioma predeterminado.
*   **Detección Automática:**
    *   Identifica si la pestaña actual es un servicio de Google compatible.
    *   Muestra una advertencia si el servicio es un dominio `google.com` pero no está en la lista de compatibles conocidos.
    *   Deshabilita la funcionalidad en páginas que no son de Google o en páginas internas del navegador.
*   **Visualización de Idiomas:** Muestra los idiomas con sus correspondientes banderas de país (utilizando una CDN) e incluye banderas locales para idiomas regionales específicos como catalán, euskera y gallego.

## Instalación

Puedes instalar esta extensión en tu cuenta de Google desde su [ficha](https://chromewebstore.google.com/detail/nigcknehbimphoinlkgdeipjgdfdehif?utm_source=item-share-cb) en la Chrome Web Store (recomendado) o de manera local en cada uno de tus navegadores siguiendo estos pasos:

1.  Descarga y descomprime o clona este repositorio:
    ```bash
    git clone https://github.com/pfelipm/extension-chrome-fig.git
    ```
2.  Abre Google Chrome y ve a la página de extensiones: `chrome://extensions`.
3.  Activa el **"Modo de desarrollador"** en la esquina superior derecha.
4.  Haz clic en el botón **"Cargar descomprimida"**.
5.  Selecciona la carpeta del proyecto que acabas de descargar.
6.  ¡Listo! El icono de la extensión aparecerá en tu barra de extensiones, te sugiero que lo fijes a ella para usarlo con mayor comodidad.

## Cómo usar FIG

1.  Navega a un servicio de Google (por ejemplo, Google Drive, Google Calendar).
2.  Haz clic en el icono de la extensión en la barra de herramientas de Chrome.
3.  **Para forzar un idioma:**
    *   Selecciona un idioma de la lista "Todos los Idiomas" o de tu lista de "Favoritos".
    *   La página se recargará con el idioma de interfaz seleccionado.
4.  **Para restablecer el idioma:**
    *   Si se ha forzado un idioma, el botón "Restablecer Idioma" estará activo.
    *   Haz clic en "Restablecer Idioma" para eliminar los parámetros de forzado y recargar la página con el idioma predeterminado.
5.  **Para gestionar favoritos:**
    *   Haz clic en el icono de estrella (☆ o ★) junto a un idioma para añadirlo o eliminarlo de tus favoritos.

## Idiomas Incluidos

La extensión incluye una lista completa de idiomas, incluyendo los principales idiomas del mundo y muchos idiomas europeos. Las banderas se muestran utilizando `flagcdn.com`. Para idiomas regionales específicos, se incluyen iconos de banderas locales:

*   Català (Catalán)
*   Euskara (Euskera)
*   Galego (Gallego)

## Servicios Compatibles Conocidos

Se sabe que la extensión funciona con los siguientes servicios de Google:

* Analytics | `analytics.google.com`
* Calendar | `calendar.google.com`
* Classroom | `classroom.google.com`
* Consola de administración de Google Workspace | `admin.google.com`
* Consola de Google Cloud Platform (GCP) | `console.cloud.google.com`
* Data Studio | `datastudio.google.com`
* Drive | `drive.google.com`
* Editores de Google (Docs, Sheets, Slides, Forms, Drawings, Vids, etc.) | `docs.google.com`
* Fotos | `photos.google.com`
* Gemini | `gemini.google.com`
* Gemini Notebook | `notebook.google.com`
* IDE Apps Script | `script.google.com`
* Keep | `keep.google.com`
* Sites | `sites.google.com`
* Tareas | `tasks.google.com`

Para otros dominios `google.com`, la extensión podría funcionar, pero se mostrará una advertencia.

## Créditos

Este proyecto ha sido creado y desarrollado por [Pablo Felip](https://www.linkedin.com/in/pfelipm).

FIG utiliza la [API](https://flagpedia.net/download/api) de [Flagpedia.net](https://flagpedia.net/) para obtener los iconos de las banderas de los paises.

## Licencia

Este proyecto se distribuye bajo los términos del archivo [LICENSE](/LICENSE).