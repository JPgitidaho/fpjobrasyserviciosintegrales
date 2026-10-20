// Imágenes hero entregadas por FPJ. Proceso de generación: scripts/optimize-hero-images.js
// position: punto de enfoque (object-position) para no recortar a las personas.
const base = '/assets/heroes'

const build = (name, position) => ({
  desktop: `${base}/${name}-desktop.webp`,
  tablet: `${base}/${name}-tablet.webp`,
  mobile: `${base}/${name}-mobile.webp`,
  position,
})

export const heroImages = {
  'limpieza-oficinas-empresas': build('limpieza-oficinas', '72% 30%'),
  'limpieza-vidrios-ventanales': build('limpieza-vidrios', '78% 40%'),
  'pintura-remodelaciones': build('pintura-remodelaciones', '48% 40%'),
  'mantencion-edificios': build('mantencion-edificios', '68% 40%'),
  'aseo-industrial': build('aseo-industrial', '55% 40%'),
  'construccion-obras-menores': build('construccion-obras-menores', '50% 30%'),
  nosotros: build('nosotros', '50% 12%'),
}
