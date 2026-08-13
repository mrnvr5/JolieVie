import { Helmet } from 'react-helmet-async'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import { useCart } from '../context/CartContext'

const accesorios = [
  {
    id: 'carpeta-pequena',
    name: 'Carpeta pequeña',
    description: 'Para Portapasaporte y A6. Carpeta plástica con 2 espacios para tarjetas y un bolsillo pequeño.',
    price: 2000,
    image: '/carpeta-pequena.png',
    contain: true,
  },
  {
    id: 'carpeta-mediana',
    name: 'Carpeta mediana',
    description: 'Para A5. Carpeta plástica con 6 espacios para tarjetas y un bolsillo pequeño.',
    price: 2000,
    image: '/carpeta-mediana.png',
    contain: true,
  },
  {
    id: 'cuaderno-acuarela',
    name: 'Cuaderno de acuarela',
    description: 'Para A5. Cuaderno con hojas para acuarelas de 300 g/m².',
    price: 6000,
    image: '/acuarela.jpg',
  },
  {
    id: 'planificador',
    name: 'Planificador',
    description: 'Para A5. Planificador sin fechas para cuatro meses con vista mensual y semanal.',
    price: 5000,
    image: '/planificador.jpg',
  },
]

function AccesorioCard({ acc }) {
  const { addItem } = useCart()
  return (
    <div className="group flex flex-col">
      <div className="w-full aspect-[3/4] bg-sage/30 overflow-hidden mb-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
        {acc.image
          ? <img src={acc.image} alt={acc.name} className={acc.contain ? 'w-full h-full object-contain p-6' : 'w-full h-full object-cover'} />
          : <div className="w-1/3 h-1/2 bg-brown/10 border border-brown/15 rounded-sm" />}
      </div>
      <div className="flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-alegreya-sc font-bold text-brown text-sm tracking-widest uppercase mb-1">{acc.name}</h3>
          <p className="font-alegreya text-brown/55 text-sm leading-snug">{acc.description}</p>
        </div>
        <p className="font-playfair text-dark-red font-bold text-base">₡{acc.price.toLocaleString()}</p>
        <button
          onClick={() => addItem({ id: acc.id, name: acc.name, price: acc.price, color: '', customization: '', quantity: 1 })}
          className="w-full bg-dark-red text-cream font-alegreya-sc font-bold py-3 text-xs tracking-wider hover:bg-brown transition-colors"
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  )
}


export default function Accesorios() {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Accesorios de cuero | Jolie Vie Costa Rica</title>
        <meta name="description" content="Carpetas, cuadernos de acuarela y planificadores de cuero. Accesorios personalizados hechos en Costa Rica." />
        <link rel="canonical" href="https://jolieviecr.com/accesorios" />
        <meta property="og:url" content="https://jolieviecr.com/accesorios" />
        <meta property="og:title" content="Accesorios de cuero | Jolie Vie Costa Rica" />
        <meta property="og:description" content="Carpetas, cuadernos de acuarela y planificadores de cuero. Accesorios personalizados hechos en Costa Rica." />
        <meta property="og:image" content="https://jolieviecr.com/planificador.jpg" />
        <meta name="twitter:title" content="Accesorios de cuero | Jolie Vie Costa Rica" />
        <meta name="twitter:description" content="Carpetas, cuadernos de acuarela y planificadores de cuero. Accesorios personalizados hechos en Costa Rica." />
        <meta name="twitter:image" content="https://jolieviecr.com/planificador.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: accesorios.map((acc, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Product',
                name: acc.name,
                description: acc.description,
                image: `https://jolieviecr.com${acc.image}`,
                url: 'https://jolieviecr.com/accesorios',
                brand: { '@type': 'Brand', name: 'Jolie Vie' },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'CRC',
                  price: acc.price,
                  availability: 'https://schema.org/InStock',
                  url: 'https://jolieviecr.com/accesorios',
                },
              },
            })),
          })}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <p className="font-alegreya-sc font-bold text-brown/50 text-xs tracking-widest uppercase mb-2">Complementos</p>
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-brown">Accesorios</h1>
        </div>

        {/* First row — 3 products */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-16">
          {accesorios.slice(0, 3).map((acc) => (
            <AccesorioCard key={acc.id} acc={acc} />
          ))}
        </div>

        {/* Second row — remaining products */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          <AccesorioCard acc={accesorios[3]} />
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsCarousel />
    </div>
  )
}
