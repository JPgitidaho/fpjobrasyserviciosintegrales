import { useEffect, useRef, useState } from 'react'
import { services } from '../data/services'
import { regions } from '../data/regions'
import { LIMITS, validateQuote } from '../utils/quoteValidation'

const initialValues = {
  name: '',
  company: '',
  phone: '',
  email: '',
  service: '',
  region: '',
  comuna: '',
  message: '',
  consent: false,
}

const inputClass =
  'mt-1 block w-full rounded-lg border border-slate-400 bg-white px-3 py-2.5 text-base text-fpj-graphite focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-fpj-blue aria-[invalid=true]:border-red-700'

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-fpj-graphite">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-red-700">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-slate-600"> (opcional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-slate-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function QuoteForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')
  const startedAt = useRef(0)
  const honeypot = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const fieldProps = (field) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    className: inputClass,
  })

  const focusFirstError = (found) => {
    const first = Object.keys(initialValues).find((key) => found[key])
    if (first) document.getElementById(first)?.focus()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    const { errors: found, valid } = validateQuote(values)
    setErrors(found)
    if (!valid) {
      setStatus('idle')
      setServerMessage('')
      focusFirstError(found)
      return
    }

    setStatus('sending')
    setServerMessage('')
    try {
      const response = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value ?? '',
          startedAt: startedAt.current,
        }),
      })
      const data = await response.json().catch(() => null)

      if (response.ok && data?.ok === true) {
        setValues(initialValues)
        setErrors({})
        setStatus('success')
        startedAt.current = Date.now()
      } else {
        if (data?.errors) {
          setErrors(data.errors)
          focusFirstError(data.errors)
        }
        setServerMessage(
          data?.message || 'No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos por WhatsApp.',
        )
        setStatus('error')
      }
    } catch {
      setServerMessage(
        'No pudimos conectar con el servidor. Revisa tu conexión o escríbenos por WhatsApp.',
      )
      setStatus('error')
    }
    statusRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby="form-intro">
      <p id="form-intro" className="text-sm text-slate-600">
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> son obligatorios.
      </p>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {status === 'success' ? (
          <p className="rounded-lg border border-green-700 bg-green-50 p-4 font-medium text-green-900">
            Recibimos tu solicitud. Te responderemos al correo o teléfono indicado.
          </p>
        ) : null}
        {status === 'error' ? (
          <p role="alert" className="rounded-lg border border-red-700 bg-red-50 p-4 font-medium text-red-900">
            {serverMessage}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nombre y apellido" required error={errors.name}>
          <input {...fieldProps('name')} type="text" autoComplete="name" maxLength={LIMITS.name} />
        </Field>
        <Field id="company" label="Empresa" error={errors.company}>
          <input
            {...fieldProps('company')}
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
          />
        </Field>
        <Field id="phone" label="Teléfono" required error={errors.phone}>
          <input
            {...fieldProps('phone')}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={LIMITS.phone}
          />
        </Field>
        <Field id="email" label="Correo electrónico" required error={errors.email}>
          <input
            {...fieldProps('email')}
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
          />
        </Field>
      </div>

      <Field id="service" label="Servicio solicitado" required error={errors.service}>
        <select {...fieldProps('service')}>
          <option value="">Selecciona un servicio</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="region" label="Región" required error={errors.region}>
          <select {...fieldProps('region')}>
            <option value="">Selecciona una región</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </Field>
        <Field id="comuna" label="Comuna" required error={errors.comuna}>
          <input {...fieldProps('comuna')} type="text" maxLength={LIMITS.comuna} />
        </Field>
      </div>

      <Field
        id="message"
        label="Descripción del trabajo"
        required
        error={errors.message}
        hint="Cuéntanos qué necesitas, el tipo de instalación y cualquier detalle relevante."
      >
        <textarea
          {...fieldProps('message')}
          rows={5}
          maxLength={LIMITS.message}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
        />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No completar este campo
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={update('consent')}
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-1 h-5 w-5 shrink-0 rounded border-slate-400 accent-fpj-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue"
          />
          <label htmlFor="consent" className="text-sm text-slate-700">
            Acepto que FPJ trate los datos que ingreso en este formulario únicamente para responder
            mi solicitud de cotización.
            <span aria-hidden="true" className="text-red-700">
              {' '}
              *
            </span>
          </label>
        </div>
        {errors.consent ? (
          <p id="consent-error" className="mt-1 text-sm font-medium text-red-700">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center rounded-full bg-fpj-blue px-8 py-3 font-semibold text-white transition-colors hover:bg-fpj-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fpj-blue disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === 'sending' ? 'Enviando…' : 'Solicitar cotización'}
      </button>
    </form>
  )
}
