import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { services } from '../../data/services'
import { externalLinkProps, getWhatsAppUrl } from '../../utils/whatsapp'

const quoteUrl = getWhatsAppUrl()

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-fpj-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue ${
    isActive ? 'text-fpj-blue' : 'text-fpj-graphite'
  }`

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuPath, setMenuPath] = useState(null)
  const [servicesPath, setServicesPath] = useState(null)
  const servicesRef = useRef(null)

  // Los menús se consideran abiertos solo en la ruta donde se abrieron.
  const isMenuOpen = menuPath === pathname
  const isServicesOpen = servicesPath === pathname

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuPath(null)
        setServicesPath(null)
      }
    }
    const onPointerDown = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesPath(null)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  const closeAll = () => {
    setMenuPath(null)
    setServicesPath(null)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          onClick={closeAll}
          aria-label="FPJ Obras y Servicios Integrales, ir al inicio"
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue"
        >
          <img
            src="/assets/logo-fpj-header.webp"
            alt="FPJ Obras y Servicios Integrales"
            width="480"
            height="240"
            className="h-14 w-auto sm:h-16 lg:h-[72px]"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            Inicio
          </NavLink>

          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              aria-expanded={isServicesOpen}
              aria-controls="menu-servicios"
              onClick={() => setServicesPath(isServicesOpen ? null : pathname)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-fpj-graphite transition-colors hover:text-fpj-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue"
            >
              Servicios
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
              >
                <path d="M5.5 7.5 10 12l4.5-4.5-1.4-1.4L10 9.2 6.9 6.1z" />
              </svg>
            </button>
            {isServicesOpen && (
              <ul
                id="menu-servicios"
                className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-slate-200 bg-white py-2 shadow-lg"
              >
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={service.path}
                      onClick={closeAll}
                      className="block px-4 py-2 text-sm text-fpj-graphite hover:bg-fpj-surface hover:text-fpj-blue focus-visible:bg-fpj-surface focus-visible:outline-none"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <NavLink to="/nosotros" className={linkClass}>
            Nosotros
          </NavLink>
          <NavLink to="/contacto" className={linkClass}>
            Contacto
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={quoteUrl}
            {...externalLinkProps}
            className="rounded-full bg-fpj-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-fpj-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue sm:px-5"
          >
            Cotizar
            <span className="sr-only"> por WhatsApp (se abre en una pestaña nueva)</span>
          </a>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="menu-movil"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuPath(isMenuOpen ? null : pathname)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-fpj-graphite hover:bg-fpj-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6"
            >
              {isMenuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="menu-movil"
          aria-label="Navegación móvil"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink to="/" end onClick={closeAll} className={linkClass}>
                <span className="block py-1">Inicio</span>
              </NavLink>
            </li>
            <li>
              <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-fpj-graphite/70">
                Servicios
              </p>
              <ul>
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={service.path}
                      onClick={closeAll}
                      className="block rounded-md px-3 py-2 text-sm text-fpj-graphite hover:bg-fpj-surface hover:text-fpj-blue focus-visible:outline-2 focus-visible:outline-fpj-blue"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <NavLink to="/nosotros" onClick={closeAll} className={linkClass}>
                <span className="block py-1">Nosotros</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" onClick={closeAll} className={linkClass}>
                <span className="block py-1">Contacto</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
