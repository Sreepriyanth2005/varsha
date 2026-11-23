import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, ChevronRight, ShieldCheck, Leaf, Truck, MessageCircle, Phone, Sparkles, Box, Camera } from 'lucide-react'
import { featuredProducts } from '../data/products'
import { categories } from '../data/categories'
import { company } from '../data/company'
import ProductCard from '../components/common/ProductCard'
import SectionHeading from '../components/common/SectionHeading'
import ProductViewer3D from '../components/3d/ProductViewer3D'

const categoryIcons: Record<string, ReactNode> = {
  'floor-cleaner': <span className="text-3xl">🧹</span>,
  'washing-liquid': <span className="text-3xl">💧</span>,
  'detergents': <span className="text-3xl">📦</span>,
  'specialty-chemical': <span className="text-3xl">⚗️</span>,
  'surface-restroom': <span className="text-3xl">🛡️</span>,
}

const whyUs = [
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Quality Assured', desc: 'Multi-stage quality control from raw materials to finished products.' },
  { icon: <Leaf className="w-6 h-6" />, title: 'Eco-Safe Formulas', desc: 'Biodegradable, phosphate-free formulations safe for families and the environment.' },
  { icon: <Truck className="w-6 h-6" />, title: 'Pan-India Delivery', desc: 'Reliable logistics network with timely delivery across all major cities.' },
  { icon: <MessageCircle className="w-6 h-6" />, title: 'Expert Support', desc: 'Dedicated technical team available for guidance and custom formulation needs.' },
]

export default function HomePage() {
  const [heroMode, setHeroMode] = useState<'3d' | 'photo'>('3d')

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-[#56344F] via-[#7D2D76] to-[#61316B] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE6B8B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#D2AE34]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#DDCFE6]/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="text-white animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-[#E3C058] mb-6">
                <span className="w-1.5 h-1.5 bg-[#E3C058] rounded-full animate-pulse" />
                Premium Hygiene &amp; Chemical Solutions
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                Clean Homes,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3C058] to-[#DDCFE6]">
                  Healthier Lives
                </span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Varsha Products manufactures premium floor cleaners, bio-enzyme washing liquids, detergent powders, and specialty surfactants — trusted by homes, businesses, and industrial clients across India.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#E3C058] hover:bg-[#D2AE34] text-[#2B2430] font-bold px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Shop Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/3d-experience"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#E3C058]" /> Launch 3D Studio
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {company.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-[#E3C058]">{s.value}</div>
                    <div className="text-xs text-white/50 leading-tight mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Interactive 3D Canvas / Gallery */}
            <div className="relative">
              {/* View Toggle Tabs */}
              <div className="flex items-center justify-end gap-2 mb-3">
                <button
                  onClick={() => setHeroMode('3d')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    heroMode === '3d'
                      ? 'bg-[#E3C058] text-[#2B2430] shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" /> 3D Interactive
                </button>
                <button
                  onClick={() => setHeroMode('photo')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    heroMode === 'photo'
                      ? 'bg-[#E3C058] text-[#2B2430] shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" /> Photo View
                </button>
              </div>

              {heroMode === '3d' ? (
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-2xl relative">
                  <ProductViewer3D height="460px" showControls={true} />
                  <div className="text-center mt-2">
                    <Link
                      to="/3d-experience"
                      className="inline-flex items-center gap-1.5 text-xs text-[#E3C058] font-bold hover:underline"
                    >
                      Open in Full-Screen 3D Studio &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-float">
                  <img
                    src="/images/hero_products.jpg"
                    alt="Varsha Products – floor cleaners, washing liquids and detergents"
                    className="w-full h-96 lg:h-[480px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#56344F]/30 to-transparent" />
                </div>
              )}

              {/* Floating badge 1 */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 animate-float hidden sm:flex" style={{ animationDelay: '1s' }}>
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2B2430]">99.9% Germ Kill</div>
                  <div className="text-[10px] text-[#77717B]">Proven formula</div>
                </div>
              </div>
              {/* Floating badge 2 */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 animate-float hidden sm:flex" style={{ animationDelay: '2s' }}>
                <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#7D2D76]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2B2430]">Eco-Safe</div>
                  <div className="text-[10px] text-[#77717B]">Biodegradable</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-20 bg-[#FAF8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Product Lines"
              title="Our Product Categories"
              subtitle="From everyday floor cleaners to industrial specialty chemicals — we have the right product for every need."
              centered
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-[#DDCFE6] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#FAF8FC] group-hover:bg-[#DDCFE6]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  {categoryIcons[cat.slug] || <span className="text-3xl">🧪</span>}
                </div>
                <h3 className="font-bold text-sm text-[#2B2430] mb-1">{cat.name}</h3>
                <p className="text-xs text-[#77717B] leading-relaxed">{cat.description.split('.')[0]}</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-[#7D2D76] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionHeading
              eyebrow="Best Sellers"
              title="Featured Products"
              subtitle="Our most popular hygiene and cleaning formulations."
            />
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7D2D76] hover:gap-3 transition-all whitespace-nowrap"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-[#FAF8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Why Varsha Products"
              title="Built on Trust, Quality & Innovation"
              subtitle="We combine scientific expertise with a commitment to safe, effective, and eco-responsible product formulations."
              centered
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#DDCFE6] hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#DDCFE6]/30 group-hover:bg-[#7D2D76] rounded-xl flex items-center justify-center mb-4 transition-colors text-[#7D2D76] group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#2B2430] mb-2">{item.title}</h3>
                <p className="text-sm text-[#77717B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D STUDIO SHOWCASE BANNER ── */}
      <section className="py-14 bg-gradient-to-r from-[#56344F] via-[#7D2D76] to-[#61316B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/20 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 bg-[#E3C058] text-[#2B2430] text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen 3D WebGL Studio
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                Inspect Varsha Products in 360° 3D
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Rotate 3D contoured bottles, switch active formulations from Citrus to Ocean Breeze and B2B Surfactant Drums, and inspect tamper-evident seals in real-time 3D.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/3d-experience"
                className="inline-flex items-center gap-2 bg-[#E3C058] hover:bg-[#D2AE34] text-[#2B2430] font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
              >
                Launch 3D Studio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/images/infrastructure_lab.jpg"
                alt="Varsha Products manufacturing facility"
                className="rounded-3xl shadow-xl w-full h-80 lg:h-[420px] object-cover"
              />
              <div className="absolute -bottom-5 -right-5 bg-[#7D2D76] text-white rounded-2xl p-5 shadow-xl hidden sm:block">
                <div className="text-3xl font-bold">{company.yearFounded}</div>
                <div className="text-xs text-purple-200">Year Founded</div>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="About Us"
                title="Precision Chemistry for Everyday Hygiene"
                subtitle="Varsha Products has been a trusted manufacturer of premium hygiene chemicals since our founding. We are committed to quality, innovation, and eco-responsible formulations."
              />
              <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
                {company.coreValues.slice(0, 4).map((v) => (
                  <div key={v.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#DDCFE6]/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#7D2D76] text-sm">✓</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#2B2430]">{v.title}</div>
                      <div className="text-xs text-[#77717B] leading-relaxed mt-0.5">{v.description.substring(0, 60)}…</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#7D2D76] hover:bg-[#61316B] text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-sm"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-[#56344F] to-[#7D2D76]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-block bg-[#E3C058] text-[#2B2430] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              B2B &amp; Bulk Orders Welcome
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Custom Formulations &amp; Private Label Available
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              We manufacture products under your brand name with custom fragrances, packaging, and regulatory documentation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#E3C058] hover:bg-[#D2AE34] text-[#2B2430] font-bold px-7 py-3.5 rounded-full transition-all shadow-lg"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi! I'm interested in bulk/OEM orders from Varsha Products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 rounded-full transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY CTA ── */}
      <section className="py-20 bg-[#FAF8FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Looking for the Right Products for Your Business?"
            subtitle="Our team is ready to help you find the perfect formulation — from consumer packs to industrial bulk supply."
            centered
          />
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#7D2D76] hover:bg-[#61316B] text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" /> Contact Us
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-[#7D2D76] text-[#7D2D76] hover:bg-[#7D2D76] hover:text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
