import { site } from '../data/site'

export const QUOTE_MESSAGE = 'Hola, necesito cotizar un servicio de FPJ.'

export function getWhatsAppUrl(message = QUOTE_MESSAGE) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}
