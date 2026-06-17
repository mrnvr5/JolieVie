import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('jolie-vie-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('jolie-vie-cart', JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.findIndex(
        (i) => i.id === item.id && i.color === item.color && i.customization === item.customization
      )
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + item.quantity }
        return updated
      }
      return [...prev, item]
    })
    setIsOpen(true)
  }

  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index))

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return removeItem(index)
    setItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], quantity }
      return updated
    })
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
