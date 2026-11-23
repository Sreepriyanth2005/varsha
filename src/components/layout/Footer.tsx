import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react'
import { company } from '../../data/company'
import { categories } from '../../data/categories'

export default function Footer() {
  return (
    <footer className="bg-[#46394A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/Varsalogo.png"
                alt="Varsha Products"
                className="h-16 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  const t = e.currentTarget
                  t.onerror = null
                  t.style.display = 'none'
                }}
              />
              <span className="text-2xl font-bold text-white mt-1 block">Varsha Products</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Premium hygiene and specialty chemical manufacturer serving homes, businesses, and industrial clients across India.
            </p>
            <div className="flex gap-3">
              <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-white/70">ISO Certified</span>
              <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-white/70">Eco-Safe</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'About Us', to: '/about' },
                { label: 'Our Services', to: '/services' },
                { label: 'Contact Us', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-[#E3C058] transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-[#E3C058] transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E3C058] mt-0.5 flex-shrink-0" />
                  <span>{company.phone}<br /><span className="text-xs">{company.workingHours}</span></span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#E3C058] mt-0.5 flex-shrink-0" />
                  {company.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-[#E3C058] mt-0.5 flex-shrink-0" />
                  {company.address}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Varsha Products. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms of Use</Link>
            <Link to="/contact" className="text-white/40 hover:text-white/70 text-xs transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
