import { Link } from 'react-router-dom'

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
      <picture>
        <source media="(max-width: 640px)" srcSet={image.mobile} type="image/webp" />
        <source media="(max-width: 1100px)" srcSet={image.tablet} type="image/webp" />
        <img
          src={image.desktop}
          alt=""
          width="1920"
          height="840"
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      </picture>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-fpj-graphite/95 via-fpj-graphite/70 to-fpj-graphite/25"
        aria-hidden="true"
      />
      <div className="mx-auto flex min-h-[26rem] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 md:min-h-[32rem] md:py-24">
        {breadcrumb}
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-fpj-green">
            {eyebrow}
          </p>
        )}
        <h1 id={id} className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          {title}
        </h1>
        <div className="mt-5 h-1 w-16 rounded bg-fpj-green" aria-hidden="true" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-100">{description}</p>
        <Link
          to={ctaTo}
          className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-fpj-green px-8 py-3 text-base font-semibold text-fpj-graphite transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}
