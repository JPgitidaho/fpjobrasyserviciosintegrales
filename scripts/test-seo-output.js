import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const origin = 'https://www.obrasyserviciosintegralesfpj.cl'
const routes = [
  '/',
  '/servicios',
  '/servicios/limpieza-de-oficinas-y-empresas',
  '/servicios/limpieza-de-vidrios-y-ventanales',
  '/servicios/pintura-y-remodelaciones',
  '/servicios/mantencion-de-edificios',
  '/servicios/aseo-industrial',
  '/servicios/construccion-y-obras-menores',
  '/nosotros',
  '/preguntas-frecuentes',
  '/contacto',
]
const legacyRoutes = [
  '/limpieza-de-sillones',
  '/limpieza-de-colchones',
  '/limpieza-de-alfombras',
  '/limpieza-de-sillas-y-tapices',
]

function routeFile(route) {
  return resolve(dist, route === '/' ? 'index.html' : `${route.slice(1)}.html`)
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}="([^"]*)"`))
  return match?.[1] ?? ''
}

function getDocument(route) {
  const file = routeFile(route)
  assert.ok(existsSync(file), `Falta HTML prerenderizado para ${route}`)
  return readFileSync(file, 'utf8')
}

const documents = routes.map((route) => {
  const html = getDocument(route)
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ''
  const descriptionTag = html.match(/<meta\b[^>]*name="description"[^>]*>/)?.[0] ?? ''
  const description = attribute(descriptionTag, 'content')
  const canonicalTag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0] ?? ''
  const canonical = attribute(canonicalTag, 'href')
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''

  assert.ok(title, `Falta title en ${route}`)
  assert.ok(description, `Falta meta description en ${route}`)
  assert.ok(h1.replace(/<[^>]+>/g, '').trim(), `Falta H1 prerenderizado en ${route}`)
  assert.equal(
    canonical,
    `${origin}${route === '/' ? '/' : route}`,
    `Canonical incorrecto en ${route}`,
  )

  const schemaTag = html.match(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
  )
  assert.ok(schemaTag, `Falta JSON-LD en ${route}`)
  const schema = JSON.parse(schemaTag[1])
  assert.equal(schema['@type'], 'Organization')
  assert.deepEqual(
    schema.areaServed.map((area) => area.name),
    ['Rancagua', 'Chile'],
  )

  const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)].map((match) => match[1])
  for (const href of links) {
    if (!href.startsWith('/') || href.startsWith('//')) continue
    const target = href.split(/[?#]/, 1)[0] || '/'
    assert.ok(routes.includes(target), `Enlace interno sin ruta prerenderizada: ${href} (${route})`)
  }

  for (const match of html.matchAll(/(?:src|srcset)="([^"]+)"/gi)) {
    for (const candidate of match[1].split(',').map((item) => item.trim().split(/\s+/)[0])) {
      if (candidate.startsWith('/assets/')) {
        assert.ok(existsSync(resolve(dist, candidate.slice(1))), `Recurso inexistente: ${candidate}`)
      }
    }
  }

  return { title, description, html }
})

assert.equal(
  new Set(documents.map((page) => page.title)).size,
  routes.length,
  'Los titles deben ser únicos',
)
assert.equal(
  new Set(documents.map((page) => page.description)).size,
  routes.length,
  'Las meta descriptions deben ser únicas',
)

const contact = documents.find((_, index) => routes[index] === '/contacto')
assert.match(contact.html, /<form\b/, 'El formulario de cotización debe conservarse')

const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8')
const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
assert.deepEqual(
  sitemapRoutes,
  routes.map((route) => `${origin}${route === '/' ? '/' : route}`),
  'El sitemap debe enumerar exactamente las rutas públicas prerenderizadas',
)

const robots = readFileSync(resolve(dist, 'robots.txt'), 'utf8')
assert.match(robots, new RegExp(`Sitemap: ${origin}/sitemap\\.xml`))

const notFound = readFileSync(resolve(dist, '404.html'), 'utf8')
assert.match(notFound, /<h1[^>]*>Página no encontrada<\/h1>/)
assert.match(notFound, /<meta\b[^>]*name="robots"[^>]*content="noindex,follow"/)
assert.doesNotMatch(notFound, /<link\b[^>]*rel="canonical"/)

for (const route of legacyRoutes) {
  assert.ok(!existsSync(routeFile(route)), `No debe generarse una página heredada: ${route}`)
}

const config = JSON.parse(readFileSync(resolve('vercel.json'), 'utf8'))
assert.equal(config.cleanUrls, true)
assert.equal(config.trailingSlash, false)
assert.equal('rewrites' in config, false, 'No se debe convertir una ruta inexistente en la SPA')
assert.equal('redirects' in config, false, 'No se deben redirigir rutas sin equivalencia')

console.log(
  `SEO output tests passed: ${routes.length} routes, links, assets, JSON-LD, sitemap and 404.`,
)
