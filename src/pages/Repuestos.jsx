import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const REPUESTO_PRICE = 2000
const REPUESTO_PRICE_A6_BASIC = 700
const REPUESTO_PRICE_A5_BASIC = 1000

const repuestoTypes = [
  {
    id: 'regular',
    name: 'Rayado',
    description: 'Hojas rayadas para escritura diaria.',
    image: '/Rayas.jpg',
    sizes: ['A6', 'A5', 'B5'],
    a6Price: REPUESTO_PRICE_A6_BASIC,
    a5Price: REPUESTO_PRICE_A5_BASIC,
    b5Price: 1250,
  },
  {
    id: 'liso',
    name: 'Liso',
    description: 'Página en blanco, libertad total.',
    image: '/liso.jpg',
    sizes: ['A6', 'A5', 'B5'],
    a6Price: REPUESTO_PRICE_A6_BASIC,
    a5Price: REPUESTO_PRICE_A5_BASIC,
    b5Price: 1250,
  },
  {
    id: 'punteado',
    name: 'Punteado',
    description: 'Página con puntos para escribir, dibujar o diseñar con guía.',
    image: '/puntos.jpg',
    sizes: ['A6', 'A5'],
    a6Price: REPUESTO_PRICE_A6_BASIC,
    a5Price: REPUESTO_PRICE_A5_BASIC,
  },
  {
    id: 'acuarela',
    name: 'Acuarela',
    description: 'Papel de 300 g/m² especial para acuarelas.',
    image: '/acuarela.jpg',
    sizes: ['A5'],
    a5Price: 6000,
  },
  {
    id: 'agenda',
    name: 'Agenda',
    description: 'Planificador sin fechas con vista mensual y semanal.',
    image: '/planificador.jpg',
    sizes: ['A5'],
    a5Price: 5000,
  },
]

function RepuestoCard({ repuesto }) {
  const [size, setSize] = useState(repuesto.sizes[0] === 'A6' ? 'A5' : repuesto.sizes[0])
  const { addItem } = useCart()

  const price = size === 'A6' && repuesto.a6Price
    ? repuesto.a6Price
    : size === 'A5' && repuesto.a5Price
      ? repuesto.a5Price
      : size === 'B5' && repuesto.b5Price
        ? repuesto.b5Price
        : REPUESTO_PRICE

  const handleAdd = () => {
    addItem({
      id: `repuesto-${repuesto.id}-${size}`,
      name: `Repuesto ${repuesto.name} (${size})`,
      price,
      color: '',
      customization: '',
      quantity: 1,
    })
  }

  return (
    <div className="group flex flex-col">
      <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
        <img src={repuesto.image} alt={repuesto.name} loading="lazy" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-alegreya-sc font-bold text-brown text-sm tracking-widest uppercase mb-1">
            {repuesto.name}
          </h3>
          <p className="font-alegreya text-brown/55 text-sm leading-snug">{repuesto.description}</p>
        </div>

        <p className="font-playfair text-dark-red font-bold text-base">
          ₡{price.toLocaleString()}
        </p>

        {/* Size selector */}
        <div className="flex gap-2">
          {repuesto.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1 text-xs font-alegreya-sc tracking-wide border rounded-full transition-colors ${
                size === s
                  ? 'bg-dark-red text-cream border-dark-red'
                  : 'border-blush text-brown/60 hover:border-dark-red hover:text-dark-red'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-dark-red text-cream font-alegreya-sc font-bold py-3 text-xs tracking-wider hover:bg-brown transition-colors"
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  )
}

export default function Repuestos() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 animate-fade-in">
      <Helmet>
        <title>Repuestos para libretas | Jolie Vie Costa Rica</title>
        <meta name="description" content="Repuestos y recargas para tus libretas Jolie Vie. Hojas lisas, rayadas y más." />
        <link rel="canonical" href="https://jolieviecr.com/repuestos" />
        <meta property="og:url" content="https://jolieviecr.com/repuestos" />
        <meta property="og:title" content="Repuestos para libretas | Jolie Vie Costa Rica" />
        <meta property="og:description" content="Repuestos y recargas para tus libretas Jolie Vie. Hojas lisas, rayadas y más." />
        <meta property="og:image" content="https://jolieviecr.com/liso.jpg" />
        <meta name="twitter:title" content="Repuestos para libretas | Jolie Vie Costa Rica" />
        <meta name="twitter:description" content="Repuestos y recargas para tus libretas Jolie Vie. Hojas lisas, rayadas y más." />
        <meta name="twitter:image" content="https://jolieviecr.com/liso.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: repuestoTypes.map((r, i) => {
              const prices = [r.a6Price, r.a5Price, r.b5Price].filter(Boolean)
              return {
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'Product',
                  name: `Repuesto ${r.name}`,
                  description: r.description,
                  image: `https://jolieviecr.com${r.image}`,
                  url: 'https://jolieviecr.com/repuestos',
                  brand: { '@type': 'Brand', name: 'Jolie Vie' },
                  offers: {
                    '@type': 'AggregateOffer',
                    priceCurrency: 'CRC',
                    lowPrice: Math.min(...prices),
                    highPrice: Math.max(...prices),
                    offerCount: prices.length,
                    availability: 'https://schema.org/InStock',
                  },
                },
              }
            }),
          })}
        </script>
      </Helmet>
      <div className="mb-8 md:mb-12">
        <p className="font-alegreya-sc font-bold text-brown/50 text-xs tracking-widest uppercase mb-2">Recargas</p>
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-brown">Repuestos de libretas</h1>
        <p className="font-alegreya text-brown/55 mt-2">Seleccioná el tipo de papel y el tamaño de tu libreta.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
        {repuestoTypes.map((r) => (
          <RepuestoCard key={r.id} repuesto={r} />
        ))}
      </div>
    </div>
  )
}
