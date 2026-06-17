import { useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    q: '¿El cuero es real?',
    a: 'Sí, trabajamos con cuero 100% real y nos aseguramos de que sea de una calidad óptima para que tu libreta sea duradera.',
  },
  {
    q: '¿Tienen opciones veganas/sintéticas?',
    a: 'No, de momento no hemos logrado encontrar una alternativa que nos permita ofrecerte la calidad que queremos entregarte con tu libreta.',
  },
  {
    q: '¿Cómo es la entrega?',
    a: 'Hacemos envíos por Correos de Costa Rica por un adicional de ₡2.000 para el GAM y ₡2.500 fuera del GAM. También hacemos entregas personales o por Uber Flash en San Rafael de Montes de Oca.',
  },
  {
    q: '¿Tienen tienda física?',
    a: 'No, ¡pero esperamos tenerla pronto! Si te gustaría personalizar tu libreta en tiempo real, ofrecemos sesiones de videollamada donde podés escoger lo que más te guste con nuestra asesoría.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-blush/60">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center py-5 text-left font-playfair text-lg text-brown hover:text-dark-red transition-colors"
      >
        {q}
        <span className="text-2xl leading-none text-brown/40 ml-4 flex-shrink-0">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="pb-5 font-alegreya text-brown/70 leading-relaxed text-base animate-fade-in">
          {a}
        </p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">

        {/* Left — content */}
        <div>
          <div className="mb-12">
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-brown mb-2">Preguntas frecuentes</h1>
            <p className="font-alegreya italic text-brown/50">Todo lo que necesitás saber sobre Jolie Vie.</p>
          </div>

          <div>
            {faqs.map((item) => (
              <FAQItem key={item.q} {...item} />
            ))}
          </div>

          <div className="mt-14 bg-blush/30 rounded-2xl p-8 text-center">
            <p className="font-playfair text-xl text-brown mb-2">¿Tenés otra pregunta?</p>
            <p className="font-alegreya text-brown/60 mb-6">
              Agendá una videollamada gratuita y la resolvemos juntas.
            </p>
            <Link
              to="/agenda"
              className="inline-block bg-dark-red text-cream font-alegreya-sc font-bold px-8 py-3 hover:bg-brown transition-colors tracking-wide"
            >
              AGENDAR MI CITA
            </Link>
          </div>
        </div>

        {/* Right — photo */}
        <div className="rounded-2xl overflow-hidden md:sticky md:top-24">
          <img src="/faq-vertical.jpg" alt="Preguntas frecuentes" className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  )
}
