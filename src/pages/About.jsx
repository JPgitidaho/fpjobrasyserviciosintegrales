import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import ServiceIcon from '../components/ServiceIcon'
import { services } from '../data/services'
import PageHero from '../components/PageHero'
import { heroImages } from '../data/heroImages'
import { site } from '../data/site'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue'

const steps = [
  {
    title: 'Recepción del requerimiento',
    text: 'Recibimos tu solicitud con el detalle del trabajo que necesitas.',
  },
  {
    title: 'Evaluación del trabajo',
    text: 'Revisamos las características del servicio solicitado.',
  },
  {
    title: 'Preparación de la cotización',
    text: 'Elaboramos una cotización según la información entregada.',
  },
  {
    title: 'Coordinación del servicio',
    text: 'Una vez aprobada la cotización, coordinamos la ejecución contigo.',
  },
]

const values = [
  {
    title: 'Responsabilidad',
    text: 'Cumplimos lo acordado y cuidamos las instalaciones donde trabajamos.',
  },
  {
    title: 'Compromiso',
    text: 'Atendemos cada requerimiento con dedicación, de principio a fin.',
  },
  {
    title: 'Calidad',
    text: 'Buscamos resultados prolijos y duraderos en cada servicio.',
  },
  {
    title: 'Trabajo en equipo',
    text: 'Coordinamos personas y tareas para responder a las necesidades de cada proyecto.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="Nosotros | FPJ Obras y Servicios Integrales"
        description="Conoce a Obras y Servicios Integrales FPJ Limitada: soluciones de limpieza, mantención, pintura, remodelaciones y obras menores para empresas e instalaciones."
        path="/nosotros"
      />

      <PageHero
        id="nosotros-title"
        image={heroImages.nosotros}
        eyebrow="Nosotros"
        title="Comprometidos con espacios más limpios, seguros y funcionales"
        description="Entregamos soluciones integrales de limpieza, mantención y obras menores para empresas, edificios e instalaciones."
      />

      <section className="bg-white" aria-labelledby="quienes-title">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 id="quienes-title" className="text-3xl font-bold text-fpj-graphite">
              Quiénes somos
            </h2>
            <div className="mt-2 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              {site.legalName} es una empresa dedicada a entregar soluciones integrales de
              limpieza, mantención y obras menores para empresas, edificios e instalaciones.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Reunimos en un solo proveedor servicios que suelen contratarse por separado, para que
              cada espacio se mantenga ordenado, seguro y listo para funcionar.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4" aria-label="Imágenes referenciales de servicios">
            <img
              src={heroImages['mantencion-edificios'].mobile}
              alt="Técnico con casco revisando un tablero eléctrico"
              width="800"
              height="900"
              loading="lazy"
              decoding="async"
              className="row-span-2 h-full w-full rounded-2xl border-b-4 border-fpj-green object-cover"
            />
            <img
              src={heroImages['limpieza-vidrios-ventanales'].tablet}
              alt="Trabajadores limpiando los ventanales de un edificio"
              width="1280"
              height="560"
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-2xl object-cover"
            />
            <img
              src={heroImages['pintura-remodelaciones'].tablet}
              alt="Trabajador pintando una pared interior"
              width="1280"
              height="560"
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-2xl border-b-4 border-fpj-blue object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-fpj-graphite text-white" aria-labelledby="valores-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="valores-title" className="text-3xl font-bold">
            Nuestros valores
          </h2>
          <div className="mt-2 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-fpj-blue font-bold text-white"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-fpj-green">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-100">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-fpj-surface" aria-labelledby="hacemos-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="hacemos-title" className="text-3xl font-bold text-fpj-graphite">
            Qué hacemos
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  to={service.path}
                  className={`flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md ${focusRing}`}
                >
                  <ServiceIcon
                    id={service.id}
                    className="h-8 w-8 text-fpj-blue"
                  />
                  <span className="mt-4 text-lg font-semibold text-fpj-graphite">
                    {service.title}
                  </span>
                  <span className="mt-2 text-sm text-slate-600">{service.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="trabajo-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="trabajo-title" className="text-3xl font-bold text-fpj-graphite">
            Nuestra forma de trabajar
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 p-6">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-fpj-blue font-bold text-white"
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-fpj-graphite">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-fpj-surface" aria-labelledby="cobertura-title">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="cobertura-title" className="text-3xl font-bold text-fpj-graphite">
            Cobertura
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
            Las solicitudes se evalúan según la ubicación del proyecto y la disponibilidad del
            servicio.
          </p>
        </div>
      </section>

      <section className="bg-fpj-graphite text-white" aria-labelledby="cta-title">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <h2 id="cta-title" className="text-3xl font-bold">
            Cuéntanos sobre tu proyecto
          </h2>
          <Link
            to="/contacto"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-fpj-green px-8 py-3 font-semibold text-fpj-graphite transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </>
  )
}
