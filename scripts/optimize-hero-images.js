// Descarga las fotografías de origen (Pexels / Unsplash, uso comercial permitido)
// y genera variantes WebP para desktop y móvil en public/assets/heroes.
// Uso: node scripts/optimize-hero-images.js
import { Buffer } from 'node:buffer'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`

const heroes = [
  { name: 'limpieza-oficinas', url: pexels(6195288), position: 'centre' },
  { name: 'limpieza-vidrios', url: pexels(6197111), position: 'centre' },
  { name: 'pintura-remodelaciones', url: pexels(36153946), position: 'top' },
  {
    name: 'mantencion-edificios',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=2400&q=85',
    position: 'centre',
  },
  { name: 'aseo-industrial', url: pexels(30589158), position: 'centre' },
  { name: 'construccion-obras-menores', url: pexels(30592255), position: 'top' },
  { name: 'nosotros', url: pexels(6195125), position: 'centre' },
]

const outDir = path.resolve('public/assets/heroes')
await mkdir(outDir, { recursive: true })

const variants = [
  { suffix: 'desktop', width: 1920, height: 840 },
  { suffix: 'tablet', width: 1280, height: 560 },
  { suffix: 'mobile', width: 800, height: 900 },
]

for (const hero of heroes) {
  const response = await fetch(hero.url)
  if (!response.ok) throw new Error(`No se pudo descargar ${hero.url}`)
  const source = Buffer.from(await response.arrayBuffer())

  for (const { suffix, width, height } of variants) {
    const buffer = await sharp(source)
      .resize({ width, height, fit: 'cover', position: hero.position })
      .webp({ quality: 72, effort: 5 })
      .toBuffer()
    await writeFile(path.join(outDir, `${hero.name}-${suffix}.webp`), buffer)
    console.log(`${hero.name}-${suffix}.webp ${(buffer.length / 1024).toFixed(0)} KB`)
  }
}
