import { validateQuote } from '../src/utils/quoteValidation.js'
import { services } from '../src/data/services.js'

const RESEND_URL = 'https://api.resend.com/emails'
const MAX_BODY_BYTES = 10_000
const MIN_FILL_MS = 3000
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5

// Límite en memoria: es un freno básico por instancia, no una defensa distribuida.
const hits = new Map()

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const oneLine = (value) => String(value).replace(/[\r\n]+/g, ' ').trim()

function isRateLimited(ip) {
  const now = Date.now()
  for (const [key, list] of hits) {
    const fresh = list.filter((t) => now - t < RATE_WINDOW_MS)
    if (fresh.length) hits.set(key, fresh)
    else hits.delete(key)
  }
  const list = hits.get(ip) ?? []
  if (list.length >= RATE_MAX) return true
  list.push(now)
  hits.set(ip, list)
  return false
}

function allowedOrigins() {
  const list = [
    'https://www.obrasyserviciosintegralesfpj.cl',
    'https://obrasyserviciosintegralesfpj.cl',
  ]
  if (process.env.VERCEL_URL) list.push(`https://${process.env.VERCEL_URL}`)
  if (process.env.VERCEL_BRANCH_URL) list.push(`https://${process.env.VERCEL_BRANCH_URL}`)
  if (process.env.ALLOWED_ORIGINS) {
    list.push(...process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean))
  }
  return list
}

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store')
  res.status(status).json(body)
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body)
  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { ok: false, message: 'Método no permitido.' })
  }

  const origin = req.headers.origin
  if (!origin || !allowedOrigins().includes(origin)) {
    return send(res, 403, { ok: false, message: 'Solicitud no autorizada.' })
  }

  if (!String(req.headers['content-type'] ?? '').includes('application/json')) {
    return send(res, 415, { ok: false, message: 'Formato no soportado.' })
  }
  if (Number(req.headers['content-length'] ?? 0) > MAX_BODY_BYTES) {
    return send(res, 413, { ok: false, message: 'La solicitud es demasiado grande.' })
  }

  let body
  try {
    body = await readBody(req)
    if (!body || JSON.stringify(body).length > MAX_BODY_BYTES) throw new Error('invalid')
  } catch {
    return send(res, 400, { ok: false, message: 'Solicitud inválida.' })
  }

  // Honeypot: se responde como éxito para no orientar a bots, sin enviar nada.
  if (body.website) return send(res, 200, { ok: true })

  // Un envío casi instantáneo no es humano; a una persona real se le pide reintentar.
  const elapsed = Date.now() - Number(body.startedAt)
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return send(res, 400, { ok: false, message: 'Espera unos segundos e intenta nuevamente.' })
  }

  const forwarded = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()
  if (isRateLimited(forwarded || 'unknown')) {
    return send(res, 429, {
      ok: false,
      message: 'Has enviado varias solicitudes seguidas. Intenta nuevamente en unos minutos.',
    })
  }

  const { values, errors, valid } = validateQuote(body)
  if (!valid) {
    return send(res, 422, { ok: false, message: 'Revisa los campos del formulario.', errors })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) {
    console.error('Cotización: faltan variables de entorno del proveedor de correo.')
    return send(res, 503, {
      ok: false,
      message: 'El envío de formularios no está disponible por ahora. Contáctanos por WhatsApp.',
    })
  }

  const service = services.find((s) => s.id === values.service)
  const rows = [
    ['Nombre', values.name],
    ['Empresa', values.company || 'No informada'],
    ['Teléfono', values.phone],
    ['Correo', values.email],
    ['Servicio', service.title],
    ['Región', values.region],
    ['Comuna', values.comuna],
  ]
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', 'Descripción:', values.message].join('\n')
  const html = `<h2>Nueva solicitud de cotización</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table><p><strong>Descripción:</strong></p><p style="white-space:pre-wrap">${escapeHtml(
    values.message,
  )}</p><p style="color:#666;font-size:12px">El cliente aceptó el tratamiento de sus datos para responder esta cotización.</p>`

  try {
    const response = await fetch(RESEND_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: oneLine(`Cotización: ${service.title} - ${values.name}`).slice(0, 150),
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) {
      console.error('Cotización: el proveedor de correo respondió', response.status)
      return send(res, 502, {
        ok: false,
        message: 'No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos por WhatsApp.',
      })
    }
  } catch (error) {
    console.error('Cotización: error al contactar al proveedor', error?.name)
    return send(res, 502, {
      ok: false,
      message: 'No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos por WhatsApp.',
    })
  }

  return send(res, 200, { ok: true })
}
