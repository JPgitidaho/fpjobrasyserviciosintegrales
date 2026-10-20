import { Link } from 'react-router-dom'

// Las imágenes ya no llevan texto incrustado: título y descripción son HTML.
export default function PageHero({
  id,
  image,
  title,
  description,
  eyebrow,
  breadcrumb,
  ctaLabel = 'Solicitar cotización',
  ctaTo = '/contacto',
  priority = true,
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-fpj-graphite text-white"
      aria-labelledby={id}
    >
      <div className="relative h-56 sm:h-72 md:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
        <picture>
          <source media="(max-width: 640px)" srcSet={image.mobile} type="image/webp" />
          <source media="(max-width: 1100px)" srcSet={image.tablet} type="image/webp" />
          <img
            src={image.desktop}
            alt=""
            width="1100"
            height="480"
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            style={{ objectPosition: image.position }}
            className="h-full w-full object-cover"
          />
        </picture>
        <div
          className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-fpj-blue to-fpj-green lg:hidden"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-fpj-graphite to-transparent lg:block"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:min-h-[24rem] lg:py-16">
        <div className="lg:max-w-[42%]">
          {breadcrumb}
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-fpj-green">
              {eyebrow}
            </p>
          )}
          <h1
            id={id}
            className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl xl:text-[2.6rem]"
          >
            {title}
          </h1>
          <div className="mt-5 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
          <p className="mt-5 text-lg leading-relaxed text-slate-100">{description}</p>
          <Link
            to={ctaTo}
            className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-fpj-green px-8 py-3 text-base font-semibold text-fpj-graphite transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
