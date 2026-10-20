import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import ServiceIcon from '../components/ServiceIcon'
import { services } from '../data/services'
import { externalLinkProps, getWhatsAppUrl } from '../utils/whatsapp'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)

  if (!service) {
    return (
      <section className="bg-white" aria-labelledby="no-encontrado-title">
        <Seo
          title="Servicio no encontrado | FPJ Obras y Servicios Integrales"
          description="El servicio solicitado no existe. Revisa el listado de servicios de FPJ."
          path="/servicios"
        />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1 id="no-encontrado-title" className="text-3xl font-bold text-fpj-graphite">
            Servicio no encontrado
          </h1>
          <p className="mt-4 text-lg text-fpj-graphite/80">
            No encontramos el servicio que buscas. Revisa el listado completo.
          </p>
          <Link
            to="/servicios"
            className={`mt-8 inline-flex rounded-full bg-fpj-blue px-7 py-3 font-semibold text-white hover:bg-fpj-graphite ${focusRing}`}
          >
            Ver todos los servicios
          </Link>
        </div>
      </section>
    )
  }

  const quoteUrl = getWhatsAppUrl(`Hola, necesito cotizar el servicio de ${service.title} de FPJ.`)
  const others = services.filter((item) => item.id !== service.id)

  return (
    <>
      <Seo title={service.metaTitle} description={service.metaDescription} path={service.path} />

      <section className="bg-fpj-graphite text-white" aria-labelledby="servicio-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <nav aria-label="Ruta de navegación" className="text-sm text-slate-200">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="underline-offset-2 hover:underline">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/servicios" className="underline-offset-2 hover:underline">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{service.title}</li>
            </ol>
          </nav>
          <span className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-fpj-green">
            <ServiceIcon id={service.id} className="h-8 w-8" />
          </span>
          <h1 id="servicio-title" className="mt-4 text-4xl font-extrabold sm:text-5xl">
            {service.title}
          </h1>
          <div className="mt-4 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">
            {service.description}
          </p>
          <a
            href={quoteUrl}
            {...externalLinkProps}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-fpj-blue px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white hover:text-fpj-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Solicitar cotización
            <span className="sr-only"> por WhatsApp (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </section>

      <section className="bg-fpj-surface" aria-labelledby="evaluacion-title">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 id="evaluacion-title" className="text-3xl font-bold text-fpj-graphite">
            Cotización según tu proyecto
          </h2>
          <div className="mt-2 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <p className="mt-6 text-lg leading-relaxed text-fpj-graphite/85">
            Cada solicitud se evalúa según el tipo de trabajo, las características de las
            instalaciones y la ubicación del proyecto.
          </p>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="otros-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="otros-title" className="text-2xl font-bold text-fpj-graphite">
            Otros servicios
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl border border-slate-200 p-4 font-medium text-fpj-graphite hover:border-fpj-blue hover:text-fpj-blue ${focusRing}`}
                >
                  <ServiceIcon id={item.id} className="h-6 w-6 shrink-0 text-fpj-blue" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
