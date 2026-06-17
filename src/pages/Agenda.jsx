import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'

const WHATSAPP_NUMBER = '50687335115'

export default function Agenda() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const msg = encodeURIComponent(
      `Hola Jolie Vie! Me gustaría agendar una cita de video 📖\n\nNombre: ${data.nombre}\nTeléfono: +506 ${data.telefono}\nContacto preferido: ${data.contacto}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <Helmet>
        <title>Agendas personalizadas | Jolie Vie Costa Rica</title>
        <meta name="description" content="Agendas de cuero personalizadas hechas en Costa Rica. Organizá tu vida con estilo." />
      </Helmet>
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
        {/* Left — Photo */}
        <div className="rounded-2xl overflow-hidden md:sticky md:top-24">
          <img src="/agenda.jpg" alt="Agenda tu llamada" className="w-full h-full object-cover" />
        </div>

        {/* Right — Form */}
        <div>
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-brown mb-2">
            Agenda tu llamada
          </h1>
          <p className="font-alegreya text-brown/70 mb-4 leading-relaxed">
            Una videollamada dedicada a diseñar tu libreta junto a nosotras.
          </p>

          {/* Perks */}
          <ul className="space-y-2 mb-6">
            {[
              '30 minutos',
              'Gratis',
              'Sin compromiso de compra',
            ].map((perk) => (
              <li key={perk} className="flex items-center gap-3 font-alegreya text-brown">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs flex-shrink-0">
                  ✓
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <p className="font-alegreya text-brown/60 mb-7 text-sm leading-relaxed">
            Si tu orden se concreta durante la llamada, no será necesario que hagas una compra mediante el e-commerce.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">
                Nombre completo
              </label>
              <input
                {...register('nombre', { required: 'Este campo es requerido' })}
                className="w-full border border-blush rounded-lg px-4 py-3 bg-cream font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
                placeholder="Tu nombre"
              />
              {errors.nombre && (
                <p className="text-terracotta text-xs mt-1">{errors.nombre.message}</p>
              )}
            </div>

            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">
                Número de teléfono / WhatsApp
              </label>
              <div className="flex border border-blush rounded-lg overflow-hidden focus-within:border-dark-red transition-colors">
                <span className="flex items-center px-3 bg-blush/20 font-alegreya text-brown/70 text-sm border-r border-blush select-none whitespace-nowrap">
                  +506
                </span>
                <input
                  {...register('telefono', {
                    required: 'Este campo es requerido',
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
                  className="flex-1 px-3 py-3 font-alegreya text-brown focus:outline-none bg-cream"
                  placeholder="8888-8888"
                />
              </div>
              {errors.telefono && (
                <p className="text-terracotta text-xs mt-1">{errors.telefono.message}</p>
              )}
            </div>

            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">
                ¿Cómo preferís que te contactemos?
              </label>
              <select
                {...register('contacto', { required: 'Seleccioná una opción' })}
                className="w-full border border-blush rounded-lg px-4 py-3 bg-cream font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
              >
                <option value="">Seleccioná una opción</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Google Meet">Google Meet</option>
              </select>
              {errors.contacto && (
                <p className="text-terracotta text-xs mt-1">{errors.contacto.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-dark-red text-cream font-alegreya-sc font-bold py-4 text-base tracking-wider hover:bg-brown transition-colors mt-2"
            >
              ELEGIR MI HORARIO →
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
