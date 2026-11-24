import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Search, Phone } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: '3D Studio', to: '/3d-experience', is3D: true },
  { label: 'About Us', to: '/about' },
  { label: 'Our Services', to: '/services' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg shadow-[#7D2D76]/5' : 'bg-white border-b border-[#DDCFE6]/30'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/images/Varsalogo.png"
              alt="Varsha Products"
              className="h-14 w-auto object-contain"
              onError={(e) => {
                const t = e.currentTarget
                t.onerror = null
                t.src = '/images/Varsa-rectangle.png'
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to ||
                (link.to !== '/' && location.pathname.startsWith(link.to))
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 flex items-center gap-1.5 ${
                      active
                        ? 'text-[#7D2D76] bg-purple-50'
                        : 'text-[#2B2430] hover:text-[#7D2D76] hover:bg-purple-50'
                    }`}
                  >
                    {link.label}
                    {link.is3D && (
                      <span className="bg-gradient-to-r from-[#E3C058] to-[#D2AE34] text-[#2B2430] text-[10px] font-black px-1.5 py-0.2 rounded-md shadow-xs animate-pulse">
                        3D
                      </span>
                    )}
                    {active && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7D2D76]" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-full text-[#77717B] hover:text-[#7D2D76] hover:bg-purple-50 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-full text-[#77717B] hover:text-[#7D2D76] hover:bg-purple-50 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EE6B8B] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 bg-[#7D2D76] hover:bg-[#61316B] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-full text-[#77717B] hover:text-[#7D2D76]"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EE6B8B] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-full text-[#2B2430] hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="hidden lg:block pb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value
                if (q.trim()) window.location.href = `/products?search=${encodeURIComponent(q)}`
              }}
              className="relative max-w-md mx-auto"
            >
              <input
                name="q"
                type="text"
                placeholder="Search floor cleaner, washing liquid, SLES..."
                autoFocus
                className="w-full border-2 border-[#DDCFE6] rounded-full px-5 py-2.5 pr-12 text-sm focus:outline-none focus:border-[#7D2D76] transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D2D76]">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 pb-4 pt-2 animate-fade-in-up">
            <ul className="space-y-1 mb-4">
              {navLinks.map((link) => {
                const active = location.pathname === link.to ||
                  (link.to !== '/' && location.pathname.startsWith(link.to))
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-purple-50 text-[#7D2D76]'
                          : 'text-[#2B2430] hover:bg-gray-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.is3D && (
                        <span className="bg-[#E3C058] text-[#2B2430] text-[10px] font-black px-2 py-0.5 rounded-full">
                          3D
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="px-4 flex gap-3">
              <a
                href="tel:+919876543210"
                className="flex-1 flex items-center justify-center gap-2 bg-[#7D2D76] text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center border-2 border-[#7D2D76] text-[#7D2D76] text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
