import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, Factory, ArrowRight, MessageCircle, RefreshCw } from 'lucide-react'
import ProductViewer3D, { presets3D, type Preset3D } from '../components/3d/ProductViewer3D'
import SectionHeading from '../components/common/SectionHeading'

export default function Experience3DPage() {
  const [currentPreset, setCurrentPreset] = useState<Preset3D>(presets3D[0])

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#56344F] via-[#7D2D76] to-[#61316B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E3C058]/20 border border-[#E3C058]/40 text-[#E3C058] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Interactive 3D Lab
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">3D Interactive Product Studio</h1>
          <p className="text-white/80 text-base max-w-2xl mx-auto leading-relaxed">
            Inspect our chemical containers, formulation colors, and packaging engineering in full 360-degree real-time 3D.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* 3D Canvas Column */}
          <div className="lg:col-span-8 bg-[#FAF8FC] rounded-3xl p-6 border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-[#7D2D76] uppercase tracking-wider">
                  WebGL 3D Studio Live
                </span>
              </div>
              <span className="text-xs text-[#77717B]">
                Rotate • Zoom • Inspect Formulations
              </span>
            </div>

            {/* 3D Viewer Component */}
            <ProductViewer3D
              presetId={currentPreset.id}
              height="580px"
              showControls={true}
              onPresetChange={(p) => setCurrentPreset(p)}
            />
          </div>

          {/* Product Specifications & Interactive Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7D2D76] block mb-1">
                {currentPreset.category}
              </span>
              <h2 className="text-2xl font-bold text-[#2B2430] mb-2">{currentPreset.name}</h2>
              <p className="text-xs font-semibold text-[#EE6B8B] mb-4">{currentPreset.subtitle}</p>

              {/* Volume tag */}
              <div className="inline-block bg-purple-50 text-[#7D2D76] font-bold text-xs px-3.5 py-1.5 rounded-full mb-6 border border-purple-100">
                Packaging: {currentPreset.volumeText}
              </div>

              {/* Formulation Highlights */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-[#2B2430] uppercase tracking-wider">
                  Key Formulation Attributes:
                </h4>
                {currentPreset.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs text-[#77717B]">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-700">
                      ✓
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Container Anatomy */}
              <div className="p-4 bg-[#FAF8FC] rounded-2xl border border-gray-100 mb-6 text-xs text-[#77717B] space-y-2">
                <div className="font-bold text-[#2B2430] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#7D2D76]" /> Container Anatomy
                </div>
                <p>
                  • <strong>Cap:</strong> Tamper-evident torque cap with hermetic seal ring.
                </p>
                <p>
                  • <strong>Liquid:</strong> Micro-filtered active matter with bio-enzyme floating complexes.
                </p>
                <p>
                  • <strong>Shell:</strong> High-density impact-resistant translucent polymer.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  to={`/products`}
                  className="w-full bg-[#7D2D76] hover:bg-[#61316B] text-white font-bold py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  View Product in Store <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919876543210?text=Hi! I am inspecting the 3D model for ${currentPreset.name} on your website and would like pricing for bulk supply.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
                </a>
              </div>
            </div>

            {/* B2B Private Label Box */}
            <div className="bg-gradient-to-br from-[#46394A] to-[#56344F] text-white rounded-3xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-[#E3C058] text-xs font-bold uppercase tracking-wider mb-2">
                <Factory className="w-4 h-4" /> Custom 3D Prototyping
              </div>
              <h3 className="text-lg font-bold mb-2">Want Custom Colors &amp; Label?</h3>
              <p className="text-white/70 text-xs leading-relaxed mb-4">
                We manufacture bespoke formulations under your brand with custom fragrances, colors, and container molds.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E3C058] hover:underline"
              >
                Discuss OEM Manufacturing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillars */}
      <section className="py-16 bg-[#FAF8FC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Precision Engineering"
            title="Why 3D Quality Inspection Matters"
            subtitle="Every bottle and drum is manufactured with precise volumetric dosing, leak-proof seals, and tested shelf stability."
            centered
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: 'High-Density Translucent Polymers',
                desc: 'Permits UV stability and prevents photodegradation of active bio-enzymes and natural citrus extracts.',
              },
              {
                title: 'Leak-Proof Induction Torque Caps',
                desc: 'Vacuum pressure tested to prevent leakage during rough highway logistics and maritime ocean freight.',
              },
              {
                title: 'Recyclable Eco-Safe Resins',
                desc: 'Manufactured from 100% recyclable HDPE and PET resins that minimize single-use environmental impact.',
              },
            ].map((col, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-purple-50 text-[#7D2D76] rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-base text-[#2B2430] mb-2">{col.title}</h4>
                <p className="text-xs text-[#77717B] leading-relaxed">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
