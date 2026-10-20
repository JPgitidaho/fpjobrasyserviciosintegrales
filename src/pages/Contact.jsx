import Seo from '../components/Seo'
import QuoteForm from '../components/QuoteForm'
import { site } from '../data/site'
import { externalLinkProps, getWhatsAppUrl } from '../utils/whatsapp'

const linkClass =
  'rounded-sm font-semibold text-fpj-blue underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue [overflow-wrap:anywhere]'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contacto y cotizaciones | FPJ Obras y Servicios Integrales"
        description="Solicita tu cotización a FPJ Obras y Servicios Integrales: limpieza, mantención, pintura, remodelaciones y obras menores. Escríbenos por formulario o WhatsApp."
        path="/contacto"
      />

      <section className="bg-fpj-graphite text-white" aria-labelledby="contacto-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <h1 id="contacto-title" className="text-4xl font-extrabold sm:text-5xl">
            Contacto y cotizaciones
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Cuéntanos qué necesitas y prepararemos una cotización según las características de tu
            proyecto.
          </p>
        </div>
      </section>

      <section className="bg-fpj-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[2fr_3fr]">
          <aside aria-labelledby="info-title" className="min-w-0 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 id="info-title" className="text-xl font-bold text-fpj-graphite">
                Información de contacto
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Razón social
                  </dt>
                  <dd className="mt-1 text-fpj-graphite">{site.legalName}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    RUT
                  </dt>
                  <dd className="mt-1 text-fpj-graphite">{site.rut}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Teléfono
                  </dt>
                  <dd className="mt-1">
                    <a href={`tel:${site.phone}`} className={linkClass}>
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Correo
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className={linkClass}>
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Cobertura
                  </dt>
                  <dd className="mt-1 text-fpj-graphite">
                    Las solicitudes se evalúan según la ubicación del proyecto y la disponibilidad
                    del servicio.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-fpj-graphite p-6 text-white">
              <h2 className="text-xl font-bold">¿Prefieres WhatsApp?</h2>
              <p className="mt-2 text-sm text-slate-200">
                Escríbenos directamente y cuéntanos tu requerimiento.
              </p>
              <a
                href={getWhatsAppUrl()}
                {...externalLinkProps}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-fpj-green px-6 py-3 font-semibold text-fpj-graphite transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Cotizar por WhatsApp
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </div>
          </aside>

          <div className="relative min-w-0 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-fpj-graphite">Solicita tu cotización</h2>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  )
}
