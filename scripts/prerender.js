import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { createServer } from 'vite'
import { MemoryRouter } from 'react-router-dom'
import { pageMetadata } from '../src/data/pageMetadata.js'
import { services } from '../src/data/services.js'
import { site } from '../src/data/site.js'

const root = process.cwd()
const dist = resolve(root, 'dist')
const template = await readFile(resolve(dist, 'index.html'), 'utf8')

const pages = [
  pageMetadata.home,
  pageMetadata.services,
  ...services.map(({ path, metaTitle, metaDescription }) => ({
    path,
    title: metaTitle,
    description: metaDescription,
  })),
  pageMetadata.about,
  pageMetadata.faq,
  pageMetadata.contact,
]

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function updateMeta(html, attribute, name, tag) {
  const existing = new RegExp(`<meta\\s+${attribute}="${name}"[^>]*>`)
  if (existing.test(html)) {
    return html.replace(existing, tag)
  }
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function createDocument({ title, description, path, noindex = false }, content) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`)

  html = updateMeta(
    html,
    'property',
    'og:title',
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  )
  html = updateMeta(
    html,
    'property',
    'og:description',
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  )

  if (noindex) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/, '')
    html = updateMeta(html, 'name', 'robots', '<meta name="robots" content="noindex,follow" />')
    return html
  }

  const canonical = `${site.url}${path === '/' ? '/' : path}`
  const canonicalTag = `<link rel="canonical" href="${escapeHtml(canonical)}" />`
  html = updateMeta(
    html,
    'property',
    'og:url',
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  )
  if (/<link\s+rel="canonical"[^>]*>/.test(html)) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/, canonicalTag)
  } else {
    html = html.replace('</head>', `    ${canonicalTag}\n  </head>`)
  }
  return updateMeta(html, 'name', 'robots', '<meta name="robots" content="index,follow" />')
}

const server = await createServer({
  appType: 'custom',
  logLevel: 'error',
  root,
  server: { middlewareMode: true },
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')

  for (const page of pages) {
    const content = renderToString(
      createElement(
        MemoryRouter,
        { initialEntries: [page.path] },
        createElement(App),
      ),
    )
    const relativePath =
      page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
    const outputPath = resolve(dist, relativePath)
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, createDocument(page, content))
  }

  const notFound = renderToString(
    createElement(
      MemoryRouter,
      { initialEntries: ['/__not_found__'] },
      createElement(App),
    ),
  )
  await writeFile(
    resolve(dist, '404.html'),
    createDocument(pageMetadata.notFound, notFound),
  )
} finally {
  await server.close()
}
