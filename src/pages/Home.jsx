import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { services } from '../data/services'
import { site } from '../data/site'
import { externalLinkProps, getWhatsAppUrl } from '../utils/whatsapp'
import { pageMetadata } from '../data/pageMetadata'

const quoteUrl = getWhatsAppUrl()
const SERVICES_PATH = '/servicios'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue'

const iconPaths = {
  'limpieza-oficinas-empresas': (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M14 10h5a1 1 0 0 1 1 1v10" />
      <path d="M8 8h2M8 12h2M8 16h2M2 21h20" />
    </>
  ),
  'limpieza-vidrios-ventanales': (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M12 3v18M4 12h16" />
    </>
  ),
  'pintura-remodelaciones': (
    <>
      <rect x="3" y="3" width="14" height="6" rx="1" />
      <path d="M17 6h3v6h-9v3" />
      <rect x="9" y="15" width="4" height="6" rx="1" />
    </>
  ),
  'mantencion-edificios': (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.6-.6-2.1z" />
  ),
  'aseo-industrial': (
    <>
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z" />
    </>
  ),
  'construccion-obras-menores': (
    <>
      <path d="M3 21h18M5 21v-6a7 7 0 0 1 14 0v6" />
      <path d="M12 8v3M9 21v-4h6v4" />
    </>
  ),
}

function ServiceIcon({ id }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      {iconPaths[id]}
    </svg>
  )
}

function ServiceCard({ service }) {
  return (
    <li>
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-fpj-surface text-fpj-blue">
          <ServiceIcon id={service.id} />
        </span>
        <h3 className="text-lg font-bold text-fpj-graphite">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fpj-graphite/80">
          {service.description}
        </p>
        <Link
          to={service.path}
          className={`mt-2 inline-flex w-fit items-center gap-1 rounded-md py-2 text-sm font-semibold text-fpj-blue hover:underline ${focusRing}`}
        >
          Ver servicio
          <span className="sr-only">: {service.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </article>
    </li>
  )
}

function QuoteButton({ children, className = '' }) {
  return (
    <a
      href={quoteUrl}
      {...externalLinkProps}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold transition-colors ${focusRing} ${className}`}
    >
      {children}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  )
}

export default function Home() {
  return (
    <>
      <Seo {...pageMetadata.home} />
      <section
        className="relative isolate flex min-h-[580px] items-center overflow-hidden bg-fpj-graphite md:min-h-[650px]"
        aria-labelledby="hero-title"
      >
        <img
          src="/assets/hero-fpj.webp"
          srcSet="/assets/hero-fpj-800.webp 800w, /assets/hero-fpj.webp 1536w"
          sizes="100vw"
          alt="Trabajadores con casco y chaleco reflectante realizando limpieza y mantención en la fachada y los ventanales de un edificio corporativo moderno"
          width="1536"
          height="1024"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_50%] md:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-fpj-graphite/85 via-fpj-graphite/75 to-fpj-graphite/85 md:bg-gradient-to-r md:from-fpj-graphite/85 md:via-fpj-graphite/55 md:to-fpj-graphite/10"
        />
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-2xl">
            <h1
              id="hero-title"
              className="text-4xl font-extrabold leading-tight text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.35)] sm:text-5xl lg:text-6xl"
            >
              Limpieza, mantención y obras para empresas en Rancagua y todo Chile
            </h1>
            <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-slate-100">
              Servicios de limpieza, mantención, pintura, remodelaciones y obras menores para
              empresas, edificios e instalaciones. Nuestra base está en Rancagua y atendemos
              proyectos en todo Chile.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton className="bg-fpj-blue text-white hover:bg-white hover:text-fpj-graphite focus-visible:outline-white">
                Solicitar cotización
              </QuoteButton>
              <Link
                to={SERVICES_PATH}
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white hover:text-fpj-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Conocer servicios
              </Link>
            </div>
          </div>
        </div>
        <p className="absolute bottom-2 left-4 text-xs text-white/80 md:left-auto md:right-4">Imagen ilustrativa</p>
      </section>

      <section className="bg-white" aria-labelledby="servicios-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="servicios-title" className="text-3xl font-bold text-fpj-graphite">
            Nuestros servicios
          </h2>
          <div className="mt-2 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-fpj-surface" aria-labelledby="empresa-title">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 id="empresa-title" className="text-3xl font-bold text-fpj-graphite">
            Soluciones para cada proyecto
          </h2>
          <div className="mt-2 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <p className="mt-6 text-lg leading-relaxed text-fpj-graphite/85">
            {site.legalName} reúne en un solo equipo servicios de limpieza, mantención y obras.
            Esto permite atender distintas necesidades de empresas, edificios e instalaciones
            con un mismo interlocutor, desde el aseo y la limpieza de vidrios hasta la pintura,
            las remodelaciones y las obras menores.
          </p>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="cobertura-title">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 id="cobertura-title" className="text-3xl font-bold text-fpj-graphite">
            Base en Rancagua, atención en todo Chile
          </h2>
          <div className="mt-2 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <p className="mt-6 text-lg leading-relaxed text-fpj-graphite/85">
            Operamos desde Rancagua, en la Región de O&apos;Higgins, y recibimos solicitudes de
            empresas de todas las regiones de Chile. La coordinación y disponibilidad se confirman
            según las características de cada proyecto.
          </p>
        </div>
      </section>

      <section className="bg-fpj-graphite text-white" aria-labelledby="cotizar-title">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 id="cotizar-title" className="text-3xl font-bold">
            ¿Necesitas cotizar un servicio?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Cuéntanos qué trabajo necesitas realizar y dónde se encuentra tu proyecto.
          </p>
          <QuoteButton className="mt-8 bg-fpj-green text-fpj-graphite hover:bg-white focus-visible:outline-white">
            Cotizar por WhatsApp
          </QuoteButton>
        </div>
      </section>
    </>
  )
}
