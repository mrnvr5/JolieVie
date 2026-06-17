import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart()
  const navigate = useNavigate()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-cream shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-blush">
            <h2 className="font-playfair text-xl font-bold text-brown">Tu carrito</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brown hover:text-dark-red text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-brown/50 font-alegreya mt-8 italic">Tu carrito está vacío</p>
            ) : (
              items.map((item, i) => (
                <div key={i} className="border border-blush rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-alegreya-sc font-bold text-brown text-sm">{item.name}</p>
                      {item.color && <p className="text-xs text-brown/60">{item.color}</p>}
                      {item.customization && (
                        <p className="text-xs text-terracotta italic">{item.customization}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(i)}
                      className="text-brown/30 hover:text-dark-red text-xl leading-none ml-2"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(i, item.quantity - 1)}
                        className="w-6 h-6 rounded border border-blush text-brown hover:bg-blush transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm font-alegreya w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(i, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-blush text-brown hover:bg-blush transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-alegreya-sc text-dark-red font-bold">
                      ₡{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-blush space-y-3">
            <div className="flex justify-between font-playfair font-bold text-brown text-lg">
              <span>Total</span>
              <span className="text-dark-red">₡{total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false)
                navigate('/checkout')
              }}
              className="w-full bg-dark-red text-cream py-3 font-alegreya-sc font-bold hover:bg-brown transition-colors rounded"
            >
              PAGAR
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full border border-dark-red text-dark-red py-2 font-alegreya-sc text-sm hover:bg-blush/20 transition-colors rounded"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
