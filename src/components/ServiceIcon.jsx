const serviceIconPaths = {
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

export default function ServiceIcon({ id, className = 'h-7 w-7' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {serviceIconPaths[id]}
    </svg>
  )
}
