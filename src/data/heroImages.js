// Fotografías de stock con licencia de uso comercial (Pexels / Unsplash).
// No son trabajos realizados por FPJ. Origen y proceso de generación: scripts/optimize-hero-images.js
const base = '/assets/heroes'

const build = (name, source) => ({
  desktop: `${base}/${name}-desktop.webp`,
  tablet: `${base}/${name}-tablet.webp`,
  mobile: `${base}/${name}-mobile.webp`,
  source,
})

export const heroImages = {
  'limpieza-oficinas-empresas': build('limpieza-oficinas', 'https://www.pexels.com/photo/6195288/'),
  'limpieza-vidrios-ventanales': build('limpieza-vidrios', 'https://www.pexels.com/photo/6197111/'),
  'pintura-remodelaciones': build('pintura-remodelaciones', 'https://www.pexels.com/photo/36153946/'),
  'mantencion-edificios': build(
    'mantencion-edificios',
    'https://unsplash.com/photos/08b45d6a269e',
  ),
  'aseo-industrial': build('aseo-industrial', 'https://www.pexels.com/photo/30589158/'),
  'construccion-obras-menores': build(
    'construccion-obras-menores',
    'https://www.pexels.com/photo/30592255/',
  ),
  nosotros: build('nosotros', 'https://www.pexels.com/photo/6195125/'),
}
