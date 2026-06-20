function toHex(r, g, b) {
  return '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')
}

function color(name, r, g, b, options = {}) {
  return { name, r, g, b, hex: toHex(r, g, b), ...options }
}

// ─── Notebook cover colors ────────────────────────────────────────────────────
// To add a color: color('Name', R, G, B)
// To make it seasonal (dashed border): color('Name', R, G, B, { seasonal: true })
// coverColors = Grande (B5) only. extendedCoverColors = all other sizes.
// Both arrays are ordered by hue (rainbow: red → orange → yellow → green → blue → neutrals).
export const coverColors = [
  color('Borgoña',        100,  35,  38, { texture: '/Borgoña AÑEJADO.png' }),
  color('Borgoña Labrado',128,  45,  55, { texture: '/Borgoña LABRADO.png' }),
  color('Borgoña Liso',   128,  55,  60, { texture: '/Borgoña LISO.png' }),
  color('Naranja',        201,  97,  72, { texture: '/Naranja LABRADO.png' }),
  color('Rosado',         220, 167, 145, { texture: '/Rosa labrado.jpg', blendMode: 'multiply' }),
  color('Café frío',       61,  28,   2, { texture: '/Café frío AÑEJADO.png' }),
  color('Camel',          196, 138,  63, { texture: '/Camel LISO.png' }),
  color('Verde Liso',      72, 130,  80, { texture: '/verde liso.jpg' }),
  color('Negro',           26,  26,  26, { texture: '/Negro LISO.png' }),
]

export const extendedCoverColors = [
  color('Borgoña',        100,  35,  38, { texture: '/Borgoña AÑEJADO.png' }),
  color('Borgoña Labrado',128,  45,  55, { texture: '/Borgoña LABRADO.png' }),
  color('Borgoña Liso',   128,  55,  60, { texture: '/Borgoña LISO.png' }),
  color('Rojo',           195,  58,  62, { texture: '/Rojo labrado.jpg' }),
  color('Rojo Liso',      200,  45,  45, { texture: '/rojo liso.jpg' }),
  color('Naranja',        201,  97,  72, { texture: '/Naranja LABRADO.png' }),
  color('Rosado',         220, 167, 145, { texture: '/Rosa labrado.jpg', blendMode: 'multiply' }),
  color('Café frío',       61,  28,   2, { texture: '/Café frío AÑEJADO.png' }),
  color('Café oscuro',     60,  38,  32, { texture: '/Café liso.jpg' }),
  color('Camel',          196, 138,  63, { texture: '/Camel LISO.png' }),
  color('Amarillo',       235, 233,   0, { texture: '/Amarillo liso.jpg' }),
  color('Verde Liso',      72, 130,  80, { texture: '/verde liso.jpg' }),
  color('Verde oscuro',    55, 115, 108, { texture: '/verde oscuro labrado.jpg' }),
  color('Azul',            58,  73,  98, { texture: '/Azul liso.jpg' }),
  color('Gris azulado',    75,  76,  82, { texture: '/Azul grisaseo añejado.jpg', blendMode: 'multiply' }),
  color('Negro',           26,  26,  26, { texture: '/Negro LISO.png' }),
  color('Negro Labrado',   22,  22,  22, { texture: '/Negro labrado.jpg' }),
  color('Negro Reptil',    18,  18,  18, { texture: '/Negro reptil.jpg' }),
]

// ─── Cord colors ──────────────────────────────────────────────────────────────
// To add a cord color: color('Name', R, G, B)
// Ordered by hue (rainbow: red → orange → yellow → green → teal → blue → purple → pink → neutrals).
export const cordonColors = [
  color('Rojo puro',          253,   0,   0),
  color('Rojo granate',       122,  11,  45),
  color('Vino oscuro',        110,  49,  74),
  color('Marrón casi negro',   46,  31,  34),
  color('Naranja brillante',  254, 102,   3),
  color('Marrón tostado',     156, 108,  90),
  color('Ámbar dorado',       254, 154,   0),
  color('Melocotón dorado',   241, 204, 150),
  color('Beige arena',        225, 217, 195),
  color('Amarillo limón',     235, 233,   0),
  color('Verde esmeralda',      0, 165,  42),
  color('Verde bosque',        17,  59,  50),
  color('Menta pálida',       189, 229, 221),
  color('Verde azulado',        0, 166, 161),
  color('Aguamarina',          84, 205, 216),
  color('Azul cielo profundo',  5, 161, 191),
  color('Azul cobalto',         2,  89, 198),
  color('Azul marino oscuro',  19,  35,  61),
  color('Violeta oscuro',      89,  59, 155),
  color('Lila suave',         200, 152, 230),
  color('Rosa bubblegum',     250, 163, 215),
  color('Rosa fucsia',        254,   1, 142),
  color('Rosa flamingo',      254, 129, 161),
  color('Rosa claro',         255, 181, 180),
  color('Gris perla',         217, 218, 208),
  color('Gris pizarra',        68,  75,  77),
  color('Negro carbón',        42,  42,  40),
]
