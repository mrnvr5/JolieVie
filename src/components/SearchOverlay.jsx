import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const searchItems = [
  { label: 'Libretas de cuero', path: '/libretas', category: 'Producto' },
  { label: 'Repuestos', path: '/repuestos', category: 'Producto' },
  { label: 'Accesorios', path: '/accesorios', category: 'Producto' },
  { label: 'Libreta Pasaporte', path: '/libretas', category: 'Producto' },
  { label: 'Libreta Pequeña (A6)', path: '/libretas', category: 'Producto' },
  { label: 'Libreta Mediana (A5)', path: '/libretas', category: 'Producto' },
  { label: 'Libreta Grande (B5)', path: '/libretas', category: 'Producto' },
  { label: 'Agenda tu llamada', path: '/agenda', category: 'Página' },
  { label: 'Sobre nosotras', path: '/nosotras', category: 'Página' },
  { label: 'Mi cuenta', path: '/login', category: 'Cuenta' },
  { label: 'Carrito y checkout', path: '/checkout', category: 'Compra' },
]

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const results = query.trim().length < 2
    ? []
    : searchItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSelect = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-brown/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-cream rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-blush/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-brown/50 flex-shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M20 20l-3-3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos, páginas..."
            className="flex-1 bg-transparent font-alegreya text-brown text-lg placeholder-brown/30 focus:outline-none"
          />
          <button onClick={onClose} className="text-brown/40 hover:text-brown transition-colors font-alegreya-sc text-xs">
            ESC
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="py-2 max-h-72 overflow-y-auto">
            {results.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-blush/20 transition-colors text-left"
                >
                  <span className="font-alegreya text-brown">{item.label}</span>
                  <span className="font-alegreya-sc text-xs text-brown/40">{item.category}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query.trim().length >= 2 && results.length === 0 && (
          <p className="font-alegreya text-brown/40 italic text-center py-8">
            No se encontraron resultados para "{query}"
          </p>
        )}

        {query.trim().length < 2 && (
          <p className="font-alegreya text-brown/40 text-sm text-center py-6">
            Escribí al menos 2 letras para buscar
          </p>
        )}
      </div>
    </div>
  )
}
