import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { useCart } from '../context/CartContext'
import { PROVINCIAS, getcantones, getDistritos, getCodigoPostal } from '../data/costaRicaPostalCodes'

const ORDERS_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_ORDERS_SCRIPT_ID/exec'

const SINPE_NUMBER = '6048-9469'
const SINPE_NAME   = 'Arlene Navarro'
const BANK_NAME    = 'Banco Nacional'
const BANK_IBAN    = 'CR31 0151 1672 0010 0916 12'
const BANK_NAME_OWNER = 'Arlene Navarro'

const deliveryOptions = [
  { value: 'correos', label: 'Correos de Costa Rica', needsAddress: true },
  { value: 'uber', label: 'Uber Flash', needsAddress: true },
  { value: 'recoger', label: 'Paso a recogerlo', needsAddress: false },
]

const ACCESSORIES = [
  { id: 'carpeta-pequena', label: 'Carpeta pequeña', price: 2000 },
  { id: 'carpeta-mediana', label: 'Carpeta mediana', price: 2000 },
  { id: 'cuaderno-acuarela', label: 'Cuaderno de acuarela', price: 6000 },
  { id: 'planificador', label: 'Planificador', price: 5000 },
]

function fireConfetti() {
  const colors = ['#802d20', '#e8c84a', '#dca791', '#c4cac3', '#f2e7df']
  const end = Date.now() + 7000

  confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 }, colors })

  const frame = () => {
    confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors })
    confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [delivery, setDelivery] = useState('')
  const [selectedAccessories, setSelectedAccessories] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const needsAddress = deliveryOptions.find((d) => d.value === delivery)?.needsAddress ?? false

  const [provincia, setProvincia] = useState('')
  const [canton, setCanton] = useState('')
  const [distrito, setDistrito] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')

  const cantones = getcantones(provincia)
  const distritos = getDistritos(provincia, canton)

  const handleProvinciaChange = (e) => {
    setProvincia(e.target.value)
    setCanton('')
    setDistrito('')
    setCodigoPostal('')
  }

  const handleCantonChange = (e) => {
    setCanton(e.target.value)
    setDistrito('')
    setCodigoPostal('')
  }

  const handleDistritoChange = (e) => {
    const dist = e.target.value
    setDistrito(dist)
    const code = getCodigoPostal(provincia, canton, dist)
    setCodigoPostal(code)
  }

  const toggleAccessory = (id) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const onSubmit = async (data) => {
    if (!delivery) {
      alert('Por favor seleccioná un método de entrega.')
      return
    }

    const accessoryLabels = selectedAccessories
      .map((id) => ACCESSORIES.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(', ')

    const orderData = {
      timestamp: new Date().toISOString(),
      nombre: `${data.firstName} ${data.lastName1} ${data.lastName2 || ''}`.trim(),
      telefono: `+506 ${data.phone}`,
      productos: items.map((i) => `${i.name} x${i.quantity}`).join(', '),
      colores: items.map((i) => i.color).filter(Boolean).join(', '),
      personalizacion: items.map((i) => i.customization).filter(Boolean).join(', '),
      accesorios: accessoryLabels || 'Ninguno',
      cantidad: items.reduce((s, i) => s + i.quantity, 0),
      metodo_envio: delivery,
      direccion: data.address || 'Paso a recogerlo',
      codigo_postal: codigoPostal || '',
      ubicacion: codigoPostal ? `${provincia} / ${canton} / ${distrito} (${codigoPostal})` : '',
      total: `₡${total.toLocaleString()}`,
    }

    try {
      if (!ORDERS_WEBHOOK_URL.includes('YOUR_ORDERS_SCRIPT_ID')) {
        await fetch(ORDERS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })
      }
    } catch {
      // webhook error — still confirm the order
    } finally {
      clearCart()
      setSubmitted(true)
    }
  }

  useEffect(() => {
    if (submitted) {
      fireConfetti()
    }
  }, [submitted])

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center px-4 animate-fade-in">
        <div className="max-w-sm">
          <img src="/joliejolie.png" alt="Jolie Vie" className="h-40 w-auto object-contain mx-auto mb-6" style={{ mixBlendMode: 'darken' }} />
          <h1 className="font-playfair text-3xl font-bold text-brown mb-3">¡Muchas gracias!</h1>
          <p className="font-playfair text-lg text-brown/70 italic mb-2">Tu pedido fue confirmado</p>
          <p className="font-alegreya text-brown/60 mb-6 leading-relaxed">
            Nos pondremos de acuerdo con vos para confirmar el envío de tu pedido. El pago lo podés realizar por:
          </p>
          <div className="bg-blush/25 border border-blush rounded-xl p-5 mb-8 text-left space-y-3">
            <div>
              <p className="font-alegreya-sc text-xs text-brown/50 uppercase tracking-widest mb-1">SINPE Móvil</p>
              <p className="font-playfair font-bold text-dark-red text-lg">{SINPE_NUMBER}</p>
              <p className="font-alegreya text-brown/70 text-sm">A nombre de {SINPE_NAME}</p>
            </div>
            <div className="border-t border-blush/50 pt-3">
              <p className="font-alegreya-sc text-xs text-brown/50 uppercase tracking-widest mb-1">Transferencia bancaria</p>
              <p className="font-alegreya text-brown font-bold">{BANK_NAME}</p>
              <p className="font-alegreya text-brown/70 text-sm">IBAN: {BANK_IBAN}</p>
              <p className="font-alegreya text-brown/70 text-sm">A nombre de {BANK_NAME_OWNER}</p>
            </div>
          </div>
          <p className="font-alegreya text-brown/60 text-sm mb-8 leading-relaxed">
            Una vez realizado el pago,{' '}
            <a
              href="https://wa.me/50687335115"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-dark-red underline underline-offset-2 hover:text-brown transition-colors"
            >
              envianos el comprobante por WhatsApp
            </a>
            .
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-dark-red text-cream font-alegreya-sc font-bold px-10 py-3 hover:bg-brown transition-colors tracking-wide"
          >
            VOLVER AL INICIO
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="font-playfair text-3xl font-bold text-brown mb-8">Confirmar pedido</h1>

      <div className="grid md:grid-cols-2 gap-10 md:gap-12">
        {/* Order Summary */}
        <div>
          <h2 className="font-playfair text-xl font-bold text-brown mb-4">Tu pedido</h2>

          {items.length === 0 ? (
            <p className="font-alegreya text-brown/50 italic">Tu carrito está vacío.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between font-alegreya text-brown border-b border-blush pb-3">
                  <div>
                    <p className="font-bold">
                      {item.name} × {item.quantity}
                    </p>
                    {item.color && <p className="text-sm text-brown/55">{item.color}</p>}
                    {item.customization && (
                      <p className="text-sm text-terracotta italic">{item.customization}</p>
                    )}
                  </div>
                  <p className="font-alegreya-sc text-dark-red font-bold whitespace-nowrap ml-4">
                    ₡{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
              {selectedAccessories.length > 0 && (
                <div className="flex justify-between font-alegreya text-brown/70 text-sm pt-1">
                  <span>Accesorios</span>
                  <span>₡{selectedAccessories.reduce((s, id) => s + (ACCESSORIES.find(a => a.id === id)?.price ?? 0), 0).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-playfair font-bold text-brown pt-2 text-lg">
                <span>Total</span>
                <span className="text-dark-red">₡{(total + selectedAccessories.reduce((s, id) => s + (ACCESSORIES.find(a => a.id === id)?.price ?? 0), 0)).toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Accessories add-on */}
          <div className="mt-6">
            <h3 className="font-playfair font-bold text-brown text-base mb-3">Agregar accesorios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ACCESSORIES.map((acc) => {
                const checked = selectedAccessories.includes(acc.id)
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => toggleAccessory(acc.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 font-alegreya text-sm transition-colors text-left ${
                      checked
                        ? 'border-dark-red bg-dark-red/10 text-dark-red'
                        : 'border-blush text-brown hover:border-dark-red/50'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      checked ? 'border-dark-red bg-dark-red' : 'border-blush'
                    }`}>
                      {checked && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span className="flex-1">{acc.label}</span>
                    <span className="font-alegreya-sc text-xs">₡{acc.price.toLocaleString()}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-blush/25 border border-blush rounded-xl p-4 mt-6 space-y-2">
            <p className="font-alegreya-sc text-xs text-brown/50 uppercase tracking-widest">Métodos de pago</p>
            <p className="font-alegreya text-sm text-brown">
              <span className="font-bold">SINPE Móvil:</span> {SINPE_NUMBER}
            </p>
            <p className="font-alegreya text-sm text-brown">
              <span className="font-bold">{BANK_NAME}:</span> IBAN {BANK_IBAN}
            </p>
            <p className="font-alegreya text-xs text-brown/50 italic mt-1">
              Enviá el comprobante al WhatsApp de Jolie Vie una vez realizado el pago.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre + Primer apellido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">Nombre</label>
              <input
                {...register('firstName', { required: 'Requerido' })}
                className="w-full border border-blush rounded-lg px-3 py-2 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
                placeholder="María"
              />
              {errors.firstName && (
                <p className="text-terracotta text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">Primer apellido</label>
              <input
                {...register('lastName1', { required: 'Requerido' })}
                className="w-full border border-blush rounded-lg px-3 py-2 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
                placeholder="González"
              />
              {errors.lastName1 && (
                <p className="text-terracotta text-xs mt-1">{errors.lastName1.message}</p>
              )}
            </div>
          </div>

          {/* Segundo apellido */}
          <div>
            <label className="font-alegreya-sc text-sm text-brown block mb-1">
              Segundo apellido <span className="text-brown/40 font-normal">(opcional)</span>
            </label>
            <input
              {...register('lastName2')}
              className="w-full border border-blush rounded-lg px-3 py-2 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
              placeholder="Mora"
            />
          </div>

          <div>
            <label className="font-alegreya-sc text-sm text-brown block mb-1">Teléfono</label>
            <div className="flex border border-blush rounded-lg overflow-hidden focus-within:border-dark-red transition-colors">
              <span className="flex items-center px-3 bg-blush/20 font-alegreya text-brown/70 text-sm border-r border-blush select-none whitespace-nowrap">
                +506
              </span>
              <input
                {...register('phone', {
                  required: 'Requerido',
                  minLength: { value: 8, message: 'Mínimo 8 dígitos' },
                  maxLength: { value: 8, message: 'Máximo 8 dígitos' },
                })}
                inputMode="numeric"
                maxLength={8}
                onKeyDown={(e) => {
                  if (!/[0-9]|Backspace|Delete|Tab|ArrowLeft|ArrowRight/.test(e.key)) {
                    e.preventDefault()
                  }
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '')
                }}
                className="flex-1 px-3 py-2 font-alegreya text-brown focus:outline-none bg-transparent"
                placeholder="8888-8888"
              />
            </div>
            {errors.phone && (
              <p className="text-terracotta text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Delivery */}
          <div>
            <label className="font-alegreya-sc text-sm text-brown block mb-2">Método de entrega</label>
            <div className="flex flex-wrap gap-2">
              {deliveryOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDelivery(opt.value)}
                  className={`px-4 py-2 rounded-full border-2 font-alegreya-sc text-sm transition-colors ${
                    delivery === opt.value
                      ? 'bg-dark-red border-dark-red text-cream'
                      : 'border-dark-red/40 text-brown hover:border-dark-red'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {delivery === 'recoger' && (
            <div className="flex items-start gap-3 bg-blush/20 border border-blush rounded-lg px-4 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-dark-red flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <p className="font-alegreya-sc text-xs text-brown/50 uppercase tracking-widest mb-1">Dirección de retiro</p>
                <p className="font-alegreya text-brown text-sm leading-relaxed">
                  De la Iglesia Evangélica Metodista Faro del Este, 50 metros norte, frente a Green Minds Eco Kinder.
                </p>
                <a
                  href="https://maps.app.goo.gl/gCpcdwsRGag6RAqp6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-alegreya-sc text-xs text-dark-red underline underline-offset-2 hover:text-brown transition-colors mt-2"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          )}

          {needsAddress && (
            <>
              {delivery === 'correos' && (
                <div className="space-y-3">
                  <p className="font-alegreya-sc text-sm text-brown">Código postal</p>

                  {/* Provincia */}
                  <div>
                    <label className="font-alegreya text-xs text-brown/60 block mb-1">Provincia</label>
                    <select
                      value={provincia}
                      onChange={handleProvinciaChange}
                      className="w-full border border-blush rounded-lg px-3 py-2 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors bg-white"
                    >
                      <option value="">— Seleccioná tu provincia —</option>
                      {PROVINCIAS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Cantón */}
                  {provincia && (
                    <div>
                      <label className="font-alegreya text-xs text-brown/60 block mb-1">Cantón</label>
                      <select
                        value={canton}
                        onChange={handleCantonChange}
                        className="w-full border border-blush rounded-lg px-3 py-2 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors bg-white"
                      >
                        <option value="">— Seleccioná tu cantón —</option>
                        {cantones.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Distrito */}
                  {canton && (
                    <div>
                      <label className="font-alegreya text-xs text-brown/60 block mb-1">Distrito</label>
                      <select
                        value={distrito}
                        onChange={handleDistritoChange}
                        className="w-full border border-blush rounded-lg px-3 py-2 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors bg-white"
                      >
                        <option value="">— Seleccioná tu distrito —</option>
                        {distritos.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Código postal autofill */}
                  {codigoPostal && (
                    <div className="flex items-center gap-3 bg-blush/20 border border-blush rounded-lg px-4 py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-dark-red flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <div>
                        <p className="font-alegreya text-xs text-brown/50">Código postal</p>
                        <p className="font-playfair font-bold text-dark-red text-lg tracking-widest">{codigoPostal}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="font-alegreya-sc text-sm text-brown block mb-1">Dirección de entrega</label>
                <textarea
                  {...register('address', { required: 'Por favor ingresá tu dirección' })}
                  className="w-full border border-blush rounded-lg px-3 py-2 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors resize-none"
                  rows={3}
                  placeholder={delivery === 'correos' ? 'Señas exactas para Correos (ej: 100m al norte de la iglesia...)' : 'Tu dirección completa para Uber Flash...'}
                />
                {errors.address && (
                  <p className="text-terracotta text-xs mt-1">{errors.address.message}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="w-full bg-dark-red text-cream font-alegreya-sc font-bold py-4 text-base tracking-wider hover:bg-brown transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR PEDIDO'}
          </button>
        </form>
      </div>
    </div>
  )
}
