import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'
import SearchOverlay from './components/SearchOverlay'
import Home from './pages/Home'
import Libretas from './pages/Libretas'
import Repuestos from './pages/Repuestos'
import Accesorios from './pages/Accesorios'
import Agenda from './pages/Agenda'
import Nosotras from './pages/Nosotras'
import FAQ from './pages/FAQ'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Checkout from './pages/Checkout'

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <HelmetProvider>
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-cream font-alegreya text-brown">
          <Navbar onSearchOpen={() => setSearchOpen(true)} />
          <CartSidebar />
          {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/libretas" element={<Libretas />} />
              <Route path="/repuestos" element={<Repuestos />} />
              <Route path="/accesorios" element={<Accesorios />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/nosotras" element={<Nosotras />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
    </HelmetProvider>
  )
}
