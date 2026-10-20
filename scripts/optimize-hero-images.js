// Procesa las imágenes hero entregadas por FPJ (scripts/hero-sources).
// Recorta la franja inferior que trae el texto incrustado (el título y la descripción
// se muestran como HTML) y genera variantes WebP en public/assets/heroes.
// Uso: node scripts/optimize-hero-images.js
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

// textY: fila (px) donde empieza el acento verde del texto incrustado en la imagen original.
const heroes = [
  { name: 'limpieza-oficinas', source: 'limpieza-oficinas-empresas', textY: 239 },
  { name: 'limpieza-vidrios', source: 'limpieza-vidrios-ventanales', textY: 239 },
  { name: 'pintura-remodelaciones', source: 'pintura-remodelaciones', textY: 239 },
  { name: 'mantencion-edificios', source: 'mantencion-edificios', textY: 219 },
  { name: 'aseo-industrial', source: 'aseo-industrial', textY: 276 },
  { name: 'construccion-obras-menores', source: 'construccion-obras-menores', textY: 245 },
  { name: 'nosotros', source: 'nosotros', textY: 276 },
]

const BORDER = 3
const TEXT_MARGIN = 10
const variants = [
  { suffix: 'desktop', width: 1100 },
  { suffix: 'tablet', width: 900 },
  { suffix: 'mobile', width: 640 },
]

const srcDir = path.resolve('scripts/hero-sources')
const outDir = path.resolve('public/assets/heroes')
await mkdir(outDir, { recursive: true })

for (const hero of heroes) {
  const file = path.join(srcDir, `${hero.source}.webp`)
  const { width } = await sharp(file).metadata()
  const clean = await sharp(file)
    .extract({
      left: BORDER,
      top: BORDER,
      width: width - BORDER * 2,
      height: hero.textY - TEXT_MARGIN - BORDER,
    })
    .toBuffer()

  for (const { suffix, width: target } of variants) {
    const info = await sharp(clean)
      .resize({ width: target, kernel: 'lanczos3' })
      .sharpen({ sigma: 0.8 })
      .webp({ quality: 82, effort: 5 })
      .toFile(path.join(outDir, `${hero.name}-${suffix}.webp`))
    console.log(`${hero.name}-${suffix}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`)
  }
}
