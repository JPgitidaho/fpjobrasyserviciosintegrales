import { services } from '../data/services'
import ServiceIcon from '../components/ServiceIcon'
import { externalLinkProps, getWhatsAppUrl } from '../utils/whatsapp'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue'

function ServiceCard({ service }) {
  const url = getWhatsAppUrl(`Hola, necesito cotizar el servicio de ${service.title} de FPJ.`)

  return (
    <li>
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-fpj-surface text-fpj-blue">
          <ServiceIcon id={service.id} className="h-8 w-8" />
        </span>
        <h3 className="text-xl font-bold text-fpj-graphite">{service.title}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-fpj-graphite/80">{service.description}</p>
        <a
          href={url}
          {...externalLinkProps}
          className={`mt-6 inline-flex items-center justify-center rounded-full bg-fpj-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-fpj-graphite ${focusRing}`}
        >
          Solicitar cotización
          <span className="sr-only">
            {' '}
            de {service.title} por WhatsApp (se abre en una pestaña nueva)
          </span>
        </a>
      </article>
    </li>
  )
}

export default function Services() {
  return (
    <>
      <section className="bg-fpj-graphite text-white" aria-labelledby="servicios-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h1 id="servicios-title" className="text-4xl font-extrabold sm:text-5xl">
            Nuestros servicios
          </h1>
          <div className="mt-4 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            Ofrecemos soluciones de limpieza, mantención y obras para empresas, edificios e
            instalaciones, según las necesidades de cada proyecto.
          </p>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="catalogo-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="catalogo-title" className="sr-only">
            Catálogo de servicios
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-fpj-surface" aria-labelledby="necesidades-title">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 id="necesidades-title" className="text-3xl font-bold text-fpj-graphite">
            Soluciones según las necesidades de tu proyecto
          </h2>
          <div className="mt-2 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <p className="mt-6 text-lg leading-relaxed text-fpj-graphite/85">
            Cada solicitud se evalúa según el tipo de trabajo, las características de las
            instalaciones y la ubicación del proyecto.
          </p>
        </div>
      </section>

      <section className="bg-fpj-graphite text-white" aria-labelledby="cta-title">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 id="cta-title" className="text-3xl font-bold">
            ¿Necesitas un servicio para tu empresa o proyecto?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Cuéntanos qué necesitas realizar y dónde se encuentra tu proyecto.
          </p>
          <a
            href={getWhatsAppUrl()}
            {...externalLinkProps}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-fpj-green px-7 py-3 text-base font-semibold text-fpj-graphite transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Solicitar cotización por WhatsApp
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </section>
    </>
  )
}
