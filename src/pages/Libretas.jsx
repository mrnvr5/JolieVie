import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ColorSwatch from '../components/ColorSwatch'
import PersonalizePanel from '../components/PersonalizePanel'
import NotebookPreview from '../components/NotebookPreview'
import { products } from '../data/products'

const THUMBNAIL_COUNT = 6

export default function Libretas() {
  const [searchParams] = useSearchParams()
  const initialProduct = products.find((p) => p.id === searchParams.get('product')) ?? products[0]
  const [selectedProduct, setSelectedProduct] = useState(initialProduct)
  const [currentImg, setCurrentImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(null)
  const [personalize, setPersonalize] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(true)
  const [customization, setCustomization] = useState({})
  const { addItem } = useCart()

  const handleSelectProduct = (p) => {
    setSelectedProduct(p)
    setSelectedColor(null)
    setCurrentImg(0)
    setPersonalize(false)
    setPreviewOpen(true)
    setCustomization({})
  }

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('Por favor seleccioná un color para continuar.')
      return
    }
    const repuestos = [
      customization.notebook1 && `Libreta 1: ${customization.notebook1}`,
      customization.notebook2 && `Libreta 2: ${customization.notebook2}`,
      customization.notebook3 && `Libreta 3: ${customization.notebook3}`,
    ].filter(Boolean)

    const customParts = [
      customization.grabado && `Grabado${customization.grabadoText ? `: ${customization.grabadoText}` : ''}`,
      customization.cordon && `Cordón ${customization.cordon}`,
      customization.charmFrontal && `Charm frontal: ${customization.charmFrontal}`,
      customization.charm1Costado && `Charm N°1 costado: ${customization.charm1Costado}`,
      customization.charm2Costado && `Charm N°2 costado: ${customization.charm2Costado}`,
      customization.charm3Costado && `Charm N°3 costado: ${customization.charm3Costado}`,
      ...repuestos,
    ].filter(Boolean)

    addItem({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price + (customization.repuestoCost ?? 0),
      color: selectedColor,
      customization: customParts.join(', '),
      quantity: 1,
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      <Helmet>
        <title>Libretas personalizadas de cuero | Jolie Vie Costa Rica</title>
        <meta name="description" content="Libretas de cuero genuino personalizadas con tu nombre o diseño favorito. Pequeña, mediana y grande. Pedí la tuya en línea." />
      </Helmet>

      {/* Product tabs */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 mb-8 md:mb-10 border-b border-blush/40 pb-4">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectProduct(p)}
            className={`px-3 py-2 font-alegreya-sc text-xs md:text-sm tracking-wide transition-colors rounded-full border ${
              selectedProduct.id === p.id
                ? 'bg-dark-red text-cream border-dark-red'
                : 'border-blush text-brown/60 hover:border-dark-red hover:text-dark-red'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left — Image Gallery */}
        <div>
          <div className="bg-sage rounded-2xl aspect-square overflow-hidden">
            {selectedProduct.image
              ? <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center"><div className="w-32 h-48 bg-brown/15 rounded-lg border-2 border-brown/20" /></div>
            }
          </div>
        </div>

        {/* Right — Product Info */}
        <div className="space-y-5">
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-brown">{selectedProduct.name}</h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow text-lg tracking-wide">★★★★½</span>
            <span className="font-alegreya text-brown/50 text-sm">({selectedProduct.reviews} reseñas)</span>
          </div>

          <p className="font-playfair text-2xl text-dark-red font-bold">
            ₡{selectedProduct.price.toLocaleString()}
          </p>

          <div className="flex gap-4 text-sm font-alegreya text-brown/50">
            {selectedProduct.dimensions && <span>{selectedProduct.dimensions}</span>}
            {selectedProduct.includes && <span>· {selectedProduct.includes}</span>}
          </div>

          <p className="font-alegreya text-brown/75 leading-relaxed">{selectedProduct.description}</p>

          {/* Color Swatches */}
          {selectedProduct.colors.length > 0 && (
            <div>
              <p className="font-alegreya-sc text-sm font-bold text-brown mb-1">
                Color:{' '}
                <span className="font-normal text-dark-red">
                  {selectedColor || 'Seleccioná un color'}
                </span>
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedProduct.colors.map((c) => (
                  <ColorSwatch
                    key={c.name}
                    color={c}
                    selected={selectedColor === c.name}
                    onSelect={setSelectedColor}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Personalize toggle */}
          <div className="border-t border-blush/50 pt-4">
            <label className="flex items-center gap-2 cursor-pointer font-alegreya-sc text-sm text-brown">
              <input
                type="checkbox"
                checked={personalize}
                onChange={(e) => {
                  setPersonalize(e.target.checked)
                  if (e.target.checked) setPreviewOpen(true)
                }}
                className="accent-dark-red w-4 h-4"
              />
              Personalizar mi libreta
            </label>
          </div>

          {personalize && (
            <PersonalizePanel onChange={setCustomization} hideInserts={selectedProduct.id === 'portapasaporte'} productId={selectedProduct.id} />
          )}

          {personalize && !previewOpen && (
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="text-xs font-alegreya text-dark-red underline underline-offset-2 hover:text-brown transition-colors"
            >
              Ver vista previa de la libreta
            </button>
          )}

          <button
            onClick={handleAddToCart}
            className="w-full bg-dark-red text-cream font-alegreya-sc font-bold py-4 text-base tracking-wider hover:bg-brown transition-colors"
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>
      {personalize && previewOpen && (
        <NotebookPreview
          selectedColorName={selectedColor}
          cordonName={customization.cordon}
          grabado={customization.grabado}
          grabadoText={customization.grabadoText}
          onClose={() => setPreviewOpen(false)}
          productId={selectedProduct.id}
        />
      )}
    </div>
  )
}
