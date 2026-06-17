import { coverColors, extendedCoverColors } from './colors'

export const products = [
  {
    id: 'portapasaporte',
    name: 'Portapasaporte (B7)',
    reviews: 34,
    image: '/portapasaporte.jpg',
    price: 18000,
    dimensions: '9.5cm x 12cm',
    includes: 'Incluye 1 cuaderno',
    description:
      'Envoltura de cuero personalizada para llevar tu pasaporte junto a una libreta que podés usar para que no se te olvide ningún detalle.',
    colors: extendedCoverColors,
  },
  {
    id: 'pequena',
    name: 'Pequeña (A6)',
    reviews: 61,
    image: '/pequena.jpg',
    price: 22000,
    dimensions: '10.5cm x 14.5cm',
    includes: 'Incluye 3 cuadernos',
    description:
      'La libreta ideal si siempre estás en movimiento y querés algo que te pueda acompañar a todas partes.',
    colors: extendedCoverColors,
  },
  {
    id: 'mediana',
    name: 'Mediana (A5)',
    reviews: 89,
    image: '/mediana.jpg',
    price: 28000,
    dimensions: '15cm x 21cm',
    includes: 'Incluye 3 cuadernos',
    description:
      'La libreta ideal si lo tuyo es la flexibilidad y querés algo que se adapte a todas tus necesidades.',
    colors: extendedCoverColors,
  },
  {
    id: 'grande',
    name: 'Grande (B5)',
    reviews: 47,
    image: '/grande.jpg',
    price: 35000,
    dimensions: '17.5cm x 25cm',
    includes: 'Incluye 3 cuadernos',
    description:
      'La libreta ideal si necesitás un canva amplio que pueda sostener todas tus ideas.',
    colors: coverColors,
  },
]
