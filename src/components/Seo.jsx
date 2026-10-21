import { useEffect } from 'react'
import { site } from '../data/site'

const SITE_NAME = 'FPJ Obras y Servicios Integrales'

function setMeta(selector, create, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value)
}

function metaTag(attr, name) {
  return () => {
    const el = document.createElement('meta')
    el.setAttribute(attr, name)
    return el
  }
}

export default function Seo({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    const base = site.url.replace(/\/$/, '')
    const canonical = `${base}${path === '/' ? '' : path}`
    const previousTitle = document.title

    document.title = title
    setMeta('meta[name="description"]', metaTag('name', 'description'), description)
    setMeta(
      'meta[name="robots"]',
      metaTag('name', 'robots'),
      noindex ? 'noindex,follow' : 'index,follow',
    )
    setMeta('meta[property="og:title"]', metaTag('property', 'og:title'), title)
    setMeta('meta[property="og:description"]', metaTag('property', 'og:description'), description)
    setMeta('meta[property="og:url"]', metaTag('property', 'og:url'), canonical)
    setMeta('meta[property="og:site_name"]', metaTag('property', 'og:site_name'), SITE_NAME)
    setMeta('meta[property="og:type"]', metaTag('property', 'og:type'), 'website')
    if (noindex) {
      document.head.querySelector('link[rel="canonical"]')?.remove()
    } else {
      setMeta(
        'link[rel="canonical"]',
        () => {
          const el = document.createElement('link')
          el.setAttribute('rel', 'canonical')
          return el
        },
        canonical,
      )
    }

    return () => {
      document.title = previousTitle
    }
  }, [title, description, path, noindex])

  return null
}
