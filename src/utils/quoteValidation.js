import { services } from '../data/services.js'
import { regions } from '../data/regions.js'

export const LIMITS = {
  name: 100,
  company: 100,
  phone: 20,
  email: 254,
  comuna: 80,
  message: 2000,
  messageMin: 10,
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/
const PHONE_RE = /^\+?[\d\s()-]+$/
// Caracteres de control (salvo salto de línea y tabulación en la descripción).
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

const clean = (value, multiline = false) => {
  if (typeof value !== 'string') return ''
  let text = value.replace(CONTROL_RE, '')
  if (!multiline) text = text.replace(/[\r\n\t]+/g, ' ')
  return text.trim()
}

export function validateQuote(input) {
  const data = input && typeof input === 'object' ? input : {}
  const values = {
    name: clean(data.name),
    company: clean(data.company),
    phone: clean(data.phone),
    email: clean(data.email),
    service: clean(data.service),
    region: clean(data.region),
    comuna: clean(data.comuna),
    message: clean(data.message, true),
    consent: data.consent === true,
  }
  const errors = {}

  if (!values.name) errors.name = 'Ingresa tu nombre y apellido.'
  else if (values.name.length < 3 || !/\s/.test(values.name))
    errors.name = 'Ingresa tu nombre y apellido.'
  else if (values.name.length > LIMITS.name) errors.name = `Máximo ${LIMITS.name} caracteres.`

  if (values.company.length > LIMITS.company) errors.company = `Máximo ${LIMITS.company} caracteres.`

  const digits = values.phone.replace(/\D/g, '')
  if (!values.phone) errors.phone = 'Ingresa un teléfono de contacto.'
  else if (!PHONE_RE.test(values.phone) || digits.length < 8 || digits.length > 15)
    errors.phone = 'Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.'
  else if (values.phone.length > LIMITS.phone) errors.phone = 'Teléfono demasiado largo.'

  if (!values.email) errors.email = 'Ingresa tu correo electrónico.'
  else if (values.email.length > LIMITS.email || !EMAIL_RE.test(values.email))
    errors.email = 'Ingresa un correo electrónico válido.'

  if (!values.service) errors.service = 'Selecciona un servicio.'
  else if (!services.some((s) => s.id === values.service))
    errors.service = 'Selecciona un servicio de la lista.'

  if (!values.region) errors.region = 'Selecciona una región.'
  else if (!regions.includes(values.region)) errors.region = 'Selecciona una región de la lista.'

  if (!values.comuna) errors.comuna = 'Ingresa la comuna.'
  else if (values.comuna.length > LIMITS.comuna) errors.comuna = `Máximo ${LIMITS.comuna} caracteres.`

  if (!values.message) errors.message = 'Describe el trabajo que necesitas.'
  else if (values.message.length < LIMITS.messageMin)
    errors.message = 'Entrega un poco más de detalle (mínimo 10 caracteres).'
  else if (values.message.length > LIMITS.message)
    errors.message = `Máximo ${LIMITS.message} caracteres.`

  if (!values.consent)
    errors.consent = 'Debes aceptar el tratamiento de tus datos para recibir la cotización.'

  return { values, errors, valid: Object.keys(errors).length === 0 }
}
