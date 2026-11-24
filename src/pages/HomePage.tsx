import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, ChevronRight, ShieldCheck, Leaf, Truck, MessageCircle, Phone, Sparkles, Box, Camera, Star, Award, Zap } from 'lucide-react'
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

const categoryColors: Record<string, string> = {
  'floor-cleaner': 'from-[#7D2D76] to-[#56344F]',
  'washing-liquid': 'from-[#61316B] to-[#7D2D76]',
  'detergents': 'from-[#56344F] to-[#46394A]',
  'specialty-chemical': 'from-[#D2AE34] to-[#E3C058]',
  'surface-restroom': 'from-[#EE6B8B] to-[#7D2D76]',
}

const whyUs = [
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: 'Quality Assured',
    desc: 'Multi-stage quality control from raw materials to finished products.',
    color: 'bg-[#7D2D76]',
    lightColor: 'bg-[#DDCFE6]/20',
    textColor: 'text-[#7D2D76]',
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: 'Eco-Safe Formulas',
    desc: 'Biodegradable, phosphate-free formulations safe for families and the environment.',
    color: 'bg-[#56344F]',
    lightColor: 'bg-[#DDCFE6]/20',
    textColor: 'text-[#56344F]',
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: 'Pan-India Delivery',
    desc: 'Reliable logistics network with timely delivery across all major cities.',
    color: 'bg-[#D2AE34]',
    lightColor: 'bg-[#E3C058]/20',
    textColor: 'text-[#D2AE34]',
  },
  {
    icon: <MessageCircle className="w-7 h-7" />,
    title: 'Expert Support',
    desc: 'Dedicated technical team available for guidance and custom formulation needs.',
    color: 'bg-[#EE6B8B]',
    lightColor: 'bg-[#EE6B8B]/10',
    textColor: 'text-[#EE6B8B]',
  },
]

const trustedBy = [
  { label: 'Hotels & Hospitality', icon: '🏨' },
  { label: 'Hospitals & Clinics', icon: '🏥' },
  { label: 'Schools & Universities', icon: '🎓' },
  { label: 'Retail Homes', icon: '🏠' },
  { label: 'Industrial Plants', icon: '🏭' },
  { label: 'Restaurant Chains', icon: '🍽️' },
]

export default function HomePage() {
  const [heroMode, setHeroMode] = useState<'3d' | 'photo'>('3d')

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative bg-[#46394A] overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#46394A] via-[#56344F] to-[#7D2D76]" />

        {/* Decorative geometric shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EE6B8B]/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E3C058]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#DDCFE6]/5 rounded-full blur-2xl -translate-y-1/2" />
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#E3C058] rounded-full" />
        <div className="absolute top-40 right-40 w-1.5 h-1.5 bg-[#EE6B8B] rounded-full" />
        <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-[#DDCFE6]/60 rounded-full" />

        {/* Diagonal accent strip */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#E3C058] to-transparent" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#DDCFE6] to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="text-white animate-fade-in-up">
              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2 bg-[#E3C058]/15 border border-[#E3C058]/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 bg-[#E3C058] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#E3C058] uppercase tracking-wider">Premium Hygiene & Chemical Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
                Clean Homes,{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3C058] via-[#EE6B8B] to-[#DDCFE6]">
                    Healthier
                  </span>
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DDCFE6] to-white/90">
                  Lives
                </span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Varsha Products manufactures premium floor cleaners, bio-enzyme washing liquids, detergent powders, and specialty surfactants — trusted by homes, businesses, and industrial clients across India.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E3C058] to-[#D2AE34] hover:from-[#D2AE34] hover:to-[#E3C058] text-[#46394A] font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-[#E3C058]/20 hover:shadow-xl hover:shadow-[#E3C058]/30 hover:-translate-y-0.5"
                >
                  Shop Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/3d-experience"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#E3C058]" /> Launch 3D Studio
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 pt-8 border-t border-white/10">
                {company.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#E3C058]">{s.value}</div>
                    <div className="text-[11px] text-white/50 leading-tight mt-1">{s.label}</div>
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
                      ? 'bg-[#E3C058] text-[#46394A] shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" /> 3D Interactive
                </button>
                <button
                  onClick={() => setHeroMode('photo')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    heroMode === 'photo'
                      ? 'bg-[#E3C058] text-[#46394A] shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" /> Photo View
                </button>
              </div>

              {heroMode === '3d' ? (
                <div className="bg-white/8 backdrop-blur-md rounded-3xl p-4 border border-white/15 shadow-2xl relative">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#46394A]/50 via-transparent to-transparent" />
                </div>
              )}

              {/* Floating badge 1 */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 animate-float hidden sm:flex" style={{ animationDelay: '1s' }}>
                <div className="w-9 h-9 bg-[#DDCFE6]/30 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#7D2D76]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#46394A]">99.9% Germ Kill</div>
                  <div className="text-[10px] text-[#56344F]/60">Proven formula</div>
                </div>
              </div>
              {/* Floating badge 2 */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 animate-float hidden sm:flex" style={{ animationDelay: '2s' }}>
                <div className="w-9 h-9 bg-[#E3C058]/15 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#D2AE34]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#46394A]">Eco-Safe</div>
                  <div className="text-[10px] text-[#56344F]/60">Biodegradable</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,64 L0,32 Q360,0 720,32 Q1080,64 1440,32 L1440,64 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── TRUSTED BY STRIP ── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#56344F]/50 mb-6">Trusted Across Industries</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {trustedBy.map((t) => (
              <div key={t.label} className="flex items-center gap-2 bg-[#DDCFE6]/20 hover:bg-[#DDCFE6]/40 border border-[#DDCFE6]/50 rounded-full px-4 py-2 transition-colors cursor-default">
                <span className="text-base">{t.icon}</span>
                <span className="text-xs font-semibold text-[#56344F]">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
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
                className="group relative overflow-hidden bg-white rounded-2xl p-6 text-center border-2 border-[#DDCFE6]/30 hover:border-[#7D2D76]/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#7D2D76]/10 transition-all duration-300"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[cat.slug] || 'from-[#7D2D76] to-[#56344F]'} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className="w-14 h-14 bg-[#DDCFE6]/25 group-hover:bg-[#7D2D76] rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-[#7D2D76]/30">
                  <span className="group-hover:grayscale group-hover:brightness-200 transition-all">
                    {categoryIcons[cat.slug] || <span className="text-3xl">🧪</span>}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#46394A] group-hover:text-[#7D2D76] mb-1 transition-colors">{cat.name}</h3>
                <p className="text-xs text-[#56344F]/60 leading-relaxed">{cat.description.split('.')[0]}</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs font-bold text-[#7D2D76] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 relative overflow-hidden">
        {/* Vibrant gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#46394A] via-[#56344F] to-[#7D2D76]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE6B8B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E3C058]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionHeading
              eyebrow="Why Varsha Products"
              title="Built on Trust, Quality & Innovation"
              subtitle="We combine scientific expertise with a commitment to safe, effective, and eco-responsible product formulations."
              centered
              light
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={i}
                className="group bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-5 text-white shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10">
            {company.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold text-[#E3C058] mb-1">{s.value}</div>
                <div className="text-sm text-white/50 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 bg-[#FAF8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <SectionHeading
              eyebrow="Best Sellers"
              title="Featured Products"
              subtitle="Our most popular hygiene and cleaning formulations."
            />
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#7D2D76] hover:gap-3 transition-all whitespace-nowrap bg-[#DDCFE6]/30 hover:bg-[#DDCFE6]/50 px-5 py-2.5 rounded-full"
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

      {/* ── 3D STUDIO SHOWCASE BANNER ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#56344F] via-[#7D2D76] to-[#61316B] text-white p-8 lg:p-14">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#EE6B8B]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#E3C058]/10 rounded-full blur-3xl" />
            <div className="absolute top-6 right-6 w-20 h-20 border border-white/10 rounded-full" />
            <div className="absolute top-10 right-10 w-10 h-10 border border-white/10 rounded-full" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 bg-[#E3C058] text-[#46394A] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Next-Gen 3D WebGL Studio
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Inspect Varsha Products<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3C058] to-[#DDCFE6]">in 360° 3D</span>
                </h2>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                  Rotate 3D contoured bottles, switch active formulations from Citrus to Ocean Breeze and B2B Surfactant Drums, and inspect tamper-evident seals in real-time 3D.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {['Real-time 3D Rotation', 'Multiple SKUs', 'HD Textures', 'Mobile Ready'].map((f) => (
                    <span key={f} className="text-xs bg-white/10 border border-white/15 px-3 py-1 rounded-full text-white/80">{f}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 shrink-0">
                <Link
                  to="/3d-experience"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E3C058] to-[#D2AE34] hover:from-[#D2AE34] hover:to-[#E3C058] text-[#46394A] font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
                >
                  Launch 3D Studio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="py-24 bg-[#FAF8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <img
                src="/images/infrastructure_lab.jpg"
                alt="Varsha Products manufacturing facility"
                className="rounded-3xl shadow-2xl w-full h-80 lg:h-[440px] object-cover"
              />
              {/* Color overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#46394A]/30 to-transparent" />

              {/* Year Founded badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#7D2D76] to-[#61316B] text-white rounded-2xl p-6 shadow-2xl hidden sm:block">
                <div className="text-3xl font-bold">{company.yearFounded}</div>
                <div className="text-xs text-[#DDCFE6]">Year Founded</div>
              </div>

              {/* Floating accent */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#E3C058] to-[#D2AE34] rounded-2xl shadow-lg flex items-center justify-center hidden sm:flex">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="About Us"
                title="Precision Chemistry for Everyday Hygiene"
                subtitle="Varsha Products has been a trusted manufacturer of premium hygiene chemicals since our founding. We are committed to quality, innovation, and eco-responsible formulations."
              />

              {/* Core values */}
              <div className="grid grid-cols-1 gap-3 mt-8 mb-8">
                {company.coreValues.slice(0, 4).map((v, i) => (
                  <div key={v.title} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-[#DDCFE6]/40 hover:border-[#7D2D76]/30 hover:shadow-sm transition-all">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      i % 4 === 0 ? 'bg-[#7D2D76]' :
                      i % 4 === 1 ? 'bg-[#D2AE34]' :
                      i % 4 === 2 ? 'bg-[#EE6B8B]' : 'bg-[#56344F]'
                    }`}>
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#46394A]">{v.title}</div>
                      <div className="text-xs text-[#56344F]/60 leading-relaxed mt-0.5">{v.description.substring(0, 70)}…</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7D2D76] to-[#61316B] hover:from-[#61316B] hover:to-[#56344F] text-white font-semibold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#46394A] via-[#56344F] to-[#7D2D76]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EE6B8B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#E3C058]/10 rounded-full blur-3xl" />

        {/* Mustard accent strip */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#E3C058] via-[#EE6B8B] to-[#DDCFE6]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-3xl mx-auto">
            <div className="inline-block bg-gradient-to-r from-[#E3C058] to-[#D2AE34] text-[#46394A] text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full mb-6">
              B2B & Bulk Orders Welcome
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Custom Formulations &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3C058] to-[#DDCFE6]">
                Private Label
              </span>{' '}
              Available
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              We manufacture products under your brand name with custom fragrances, packaging, and regulatory documentation.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['Custom Fragrance', 'Private Label', 'Bulk Pricing', 'Full Documentation', 'Pan-India Delivery'].map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 text-xs bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-white/80">
                  <Zap className="w-3 h-3 text-[#E3C058]" /> {f}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E3C058] to-[#D2AE34] hover:from-[#D2AE34] hover:to-[#E3C058] text-[#46394A] font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi! I'm interested in bulk/OEM orders from Varsha Products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / TRUST SECTION ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionHeading
              eyebrow="Our Commitment"
              title="Why Thousands Trust Us"
              centered
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Star className="w-5 h-5" />,
                color: 'from-[#7D2D76] to-[#61316B]',
                accent: '#E3C058',
                title: 'ISO 9001:2015 Certified',
                desc: 'Every batch manufactured under internationally recognized quality management systems.',
              },
              {
                icon: <Leaf className="w-5 h-5" />,
                color: 'from-[#56344F] to-[#46394A]',
                accent: '#DDCFE6',
                title: 'Zero Liquid Discharge',
                desc: '100% wastewater recycled — our environmental commitment is built into every step.',
              },
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                color: 'from-[#D2AE34] to-[#E3C058]',
                accent: '#7D2D76',
                title: '8-Stage Quality Testing',
                desc: 'From raw material quarantine to final dispatch — zero compromise on integrity.',
              },
            ].map((card) => (
              <div key={card.title} className="relative overflow-hidden rounded-2xl group">
                <div className={`bg-gradient-to-br ${card.color} p-8 h-full text-white`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                  <div className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5 text-white group-hover:bg-white/20 transition-colors`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{card.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENQUIRY CTA ── */}
      <section className="py-24 bg-[#DDCFE6]/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#7D2D76]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-[#DDCFE6]/50">
            <span className="inline-flex items-center gap-1.5 bg-[#7D2D76]/10 text-[#7D2D76] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Phone className="w-3.5 h-3.5" /> Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#46394A] mb-4">
              Looking for the Right Products<br />for Your Business?
            </h2>
            <p className="text-[#56344F]/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Our team is ready to help you find the perfect formulation — from consumer packs to industrial bulk supply.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7D2D76] to-[#61316B] hover:from-[#61316B] hover:to-[#56344F] text-white font-bold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" /> Contact Us
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border-2 border-[#7D2D76] text-[#7D2D76] hover:bg-[#7D2D76] hover:text-white font-bold px-8 py-4 rounded-full transition-all"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
