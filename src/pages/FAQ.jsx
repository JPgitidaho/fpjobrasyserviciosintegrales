import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { pageMetadata } from '../data/pageMetadata'

export default function FAQ() {
  const faqs = [
    {
      question: '¿Cómo solicito una cotización?',
      answer:
        'Puedes escribirnos por WhatsApp o completar el formulario de contacto con los detalles de tu proyecto.',
    },
    {
      question: '¿En qué lugares presta servicios FPJ?',
      answer:
        'Nuestra base está en Rancagua, Región de O’Higgins, y atendemos solicitudes de empresas de todo Chile. La coordinación depende de cada proyecto.',
    },
    {
      question: '¿Qué servicios ofrece FPJ?',
      answer:
        'Ofrecemos limpieza de oficinas y empresas, limpieza de vidrios y ventanales, aseo industrial, mantención de edificios, pintura, remodelaciones y obras menores.',
    },
    {
      question: '¿Cómo se prepara una cotización?',
      answer:
        'Revisamos el tipo de servicio, las características de las instalaciones y la ubicación para evaluar el alcance y coordinar una cotización.',
    },
  ]

  return (
    <>
      <Seo {...pageMetadata.faq} />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Preguntas frecuentes</h1>
          <p className="mt-4 text-lg text-slate-600">
            Resolvemos tus dudas sobre los servicios para empresas de FPJ.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-7">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">¿Tienes otra pregunta? Contáctanos directamente.</p>
          <Link
            to="/contacto"
            className="inline-block rounded-full bg-sky-600 px-8 py-3 font-semibold text-white hover:bg-sky-700 transition"
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </>
  )
}