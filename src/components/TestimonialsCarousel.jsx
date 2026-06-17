import { useState, useEffect } from 'react'

const testimonials = [
  {
    quote: '¡Excelente y maravilloso trabajo! Las felicito por su profesionalismo y buen gusto. Soy un cliente satisfecho que además correrá la voz sobre la alta calidad de su trabajo.',
    name: 'José David',
  },
  {
    quote: 'Agradezco profundamente el excelente trabajo y paciencia, me ha encantado y lo he recomendado a todos mis amigos y familia. ¡Muchas gracias!',
    name: 'María Andrea',
  },
  {
    quote: 'Era un regalo para mi hija que inicia una maestría y le encantó. Muy responsable con la entrega y el envío.',
    name: 'Iliana',
  },
  {
    quote: 'Me llegó todo perfecto como siempre, muchísimas gracias. Son las mejores.',
    name: 'Ketsia',
  },
  {
    quote: 'Está hermosa, más de lo que imaginé. ¡Muchas gracias!',
    name: 'Silvia',
  },
  {
    quote: 'Como veo que es habitual en ustedes: ¡un excelente y lindo trabajo! Las felicito y agradezco.',
    name: 'José David',
  },
  {
    quote: 'Las libretas fueron un éxito, todas encantadísimas con sus charms personalizados y los colores. ¡Un éxito total y rotundo!',
    name: 'Melissa',
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className="bg-dark-red py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-alegreya-sc text-cream/50 text-xs tracking-widest uppercase mb-8">Lo que dicen nuestros clientes</p>

        <div className="relative min-h-[140px] flex items-center justify-center">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors text-3xl font-light p-3"
          >
            ‹
          </button>

          <div key={current} className="px-10 animate-fade-in">
            <p className="font-playfair italic text-cream text-xl md:text-2xl leading-relaxed mb-5">
              "{t.quote}"
            </p>
            <p className="font-alegreya-sc text-cream/60 text-sm tracking-wide">— {t.name}</p>
          </div>

          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors text-3xl font-light p-3"
          >
            ›
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonio ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-cream scale-125' : 'bg-cream/30 hover:bg-cream/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
