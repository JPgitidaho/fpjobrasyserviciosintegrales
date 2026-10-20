import { externalLinkProps, getWhatsAppUrl } from '../../utils/whatsapp'

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl()}
      {...externalLinkProps}
      aria-label="Cotizar por WhatsApp (se abre en una pestaña nueva)"
      className="whatsapp-float fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-graphite sm:bottom-6 sm:right-6"
    >
      <span
        aria-hidden="true"
        className="whatsapp-float__wave pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366]"
      />
      <span
        aria-hidden="true"
        className="whatsapp-float__wave pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366]"
      />
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="relative h-8 w-8">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.17-3.1.82.83-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8zM8.7 7.6c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.48.7.3 1.26.49 1.69.62.7.22 1.35.19 1.86.12.57-.09 1.75-.72 2-1.4.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.75-.87-2.02-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57z" />
      </svg>
    </a>
  )
}
