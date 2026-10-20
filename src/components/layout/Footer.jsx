import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { site } from '../../data/site'
import { externalLinkProps, getWhatsAppUrl } from '../../utils/whatsapp'

const SERVICES_PATH = '/servicios'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: SERVICES_PATH, label: 'Servicios' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

const linkClass =
  'rounded-sm text-slate-300 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-green'

function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '')
  return `+${digits.slice(0, 2)} ${digits[2]} ${digits.slice(3, 7)} ${digits.slice(7)}`
}

function Column({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h2>
      <div className="mt-2 h-0.5 w-8 rounded bg-fpj-green" aria-hidden="true" />
      <div className="mt-5">{children}</div>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-fpj-graphite text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Link
            to="/"
            aria-label="FPJ Obras y Servicios Integrales, ir al inicio"
            className="inline-block rounded-lg bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-green"
          >
            <img
              src="/assets/logo-fpj-footer.webp"
              alt="FPJ Obras y Servicios Integrales"
              width="640"
              height="320"
              loading="lazy"
              className="h-20 w-auto"
            />
          </Link>
          <p className="mt-5 text-base font-semibold text-white">{site.legalName}</p>
          <p className="mt-2 text-sm leading-relaxed">
            Servicios de limpieza, mantención y obras para empresas, edificios e instalaciones.
          </p>
        </div>

        <Column title="Servicios">
          <ul className="space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link to={SERVICES_PATH} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Navegación">
          <ul className="space-y-3 text-sm">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Contacto">
          <ul className="space-y-4 text-sm">
            <li>
              <span className="block text-xs uppercase tracking-wide text-slate-400">Teléfono</span>
              <a href={`tel:${site.phone}`} className={linkClass}>
                {formatPhone(site.phone)}
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wide text-slate-400">Cobertura</span>
              Distintas regiones de Chile, según disponibilidad del servicio.
            </li>
            <li>
              <a
                href={getWhatsAppUrl()}
                {...externalLinkProps}
                className="inline-flex items-center justify-center rounded-full bg-fpj-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-fpj-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-green"
              >
                Solicitar cotización
                <span className="sr-only"> por WhatsApp (se abre en una pestaña nueva)</span>
              </a>
            </li>
          </ul>
        </Column>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 pr-20 text-sm text-slate-300 sm:px-6">
          © {year} {site.legalName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
