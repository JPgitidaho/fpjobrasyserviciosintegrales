# FPJ Obras y Servicios Integrales

Sitio corporativo de Obras y Servicios Integrales FPJ Limitada, implementado con React y Vite.
La empresa tiene base en Rancagua, Región de O'Higgins, y presta servicios para empresas en todo
Chile.

## Desarrollo

```sh
npm install
npm run dev
```

## Validación y build

```sh
npm run lint
npm run build
npm test
```

El build genera HTML prerenderizado para las páginas públicas y un `404.html`. Vercel publica esos
archivos estáticos con URL limpias. El prerenderizado incluye metadatos y contenido inicial; React
hidrata la página en el navegador.

## Cotizaciones por correo

La API de cotización usa Resend. Configura `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` y
`CONTACT_TO_EMAIL` como variables de entorno en Vercel. Los valores de ejemplo están documentados
en [.env.example](./.env.example); no agregues secretos al repositorio.

## Imágenes Hero

Los Heroes fuente de FPJ están en `scripts/hero-sources`. Para regenerar las variantes optimizadas
en `public/assets/heroes`, ejecuta `npm run images:optimize`.
