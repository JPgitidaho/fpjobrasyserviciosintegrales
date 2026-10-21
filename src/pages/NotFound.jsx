import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { pageMetadata } from '../data/pageMetadata'

export default function NotFound() {
  return (
    <>
      <Seo {...pageMetadata.notFound} />
      <section className="bg-white" aria-labelledby="not-found-title">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1 id="not-found-title" className="text-3xl font-bold text-fpj-graphite">
            Página no encontrada
          </h1>
          <p className="mt-4 text-lg text-fpj-graphite/80">
            La dirección que buscas no está disponible. Puedes revisar nuestros servicios o
            solicitar una cotización.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex rounded-full bg-fpj-blue px-7 py-3 font-semibold text-white hover:bg-fpj-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue"
            >
              Ir al inicio
            </Link>
            <Link
              to="/servicios"
              className="inline-flex rounded-full border border-fpj-blue px-7 py-3 font-semibold text-fpj-blue hover:bg-fpj-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
