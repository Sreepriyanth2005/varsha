import { Link } from 'react-router-dom'
import { ShieldCheck, Award, Factory, Leaf, CheckCircle2, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import { company } from '../data/company'

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#56344F] via-[#7D2D76] to-[#61316B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#E3C058]/20 border border-[#E3C058]/40 text-[#E3C058] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Our Heritage &amp; Commitment
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Varsha Products</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Formulating next-generation hygiene solutions, eco-friendly floor cleansers, bio-enzyme washing liquids, and industrial specialty surfactants for over 15 years.
          </p>
        </div>
      </div>

      {/* Main Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Precision Chemistry for Everyday Hygiene"
                subtitle="From laboratory innovation to integrated chemical manufacturing powerhouse."
              />
              <div className="space-y-4 text-[#77717B] text-base leading-relaxed mt-6">
                <p>
                  Varsha Products began with a clear mission: to formulate hospital-grade disinfectants, high-yield laundry detergents, and raw surfactants that deliver uncompromising cleaning power while being gentler on people and the planet.
                </p>
                <p>
                  Today, our modern plant operates under ISO 9001:2015 and WHO-GMP standards with strict Zero Liquid Discharge (ZLD) environmental protocols. We formulate products that eradicate 99.9% of harmful pathogens without corroding stone surfaces, fading delicate textile fibers, or polluting municipal waterways.
                </p>
                <p>
                  Whether serving retail households, commercial hospitality chains, or industrial detergent manufacturers through our bulk B2B division, Varsha Products stands for consistent purity, transparent partnerships, and technical integrity.
                </p>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
                {company.stats.map((s) => (
                  <div key={s.label} className="bg-[#FAF8FC] p-4 rounded-2xl border border-gray-100 text-center">
                    <div className="text-2xl font-bold text-[#7D2D76]">{s.value}</div>
                    <div className="text-xs text-[#77717B] mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="/images/infrastructure_lab.jpg"
                  alt="Varsha Products Manufacturing Plant and Analytical Lab"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-purple-50 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-[#7D2D76]">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#2B2430]">120,000 Litres</div>
                    <div className="text-xs text-[#77717B]">Daily Bottling &amp; Formulation Output</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#FAF8FC] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[#DDCFE6] transition-all">
              <div className="w-14 h-14 bg-[#7D2D76]/10 text-[#7D2D76] rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-[#7D2D76] uppercase tracking-wider block mb-2">Our Mission</span>
              <h3 className="text-2xl font-bold text-[#2B2430] mb-4">Empower Clean Living with Responsible Science</h3>
              <p className="text-[#77717B] leading-relaxed">
                To formulate, manufacture, and distribute world-class hygiene and chemical solutions that ensure pristine cleanliness, prevent infectious spread, and safeguard water ecosystems using biodegradable surfactant technologies.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-[#DDCFE6] transition-all">
              <div className="w-14 h-14 bg-[#D2AE34]/15 text-[#D2AE34] rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-[#D2AE34] uppercase tracking-wider block mb-2">Our Vision</span>
              <h3 className="text-2xl font-bold text-[#2B2430] mb-4">The Preferred Choice for Industrial &amp; Consumer Hygiene</h3>
              <p className="text-[#77717B] leading-relaxed">
                To be recognized as India's most dependable chemical partner — known for uncompromising batch consistency, ethical OEM manufacturing, and revolutionary bio-enzyme laundry solutions across domestic and global markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Principles"
            title="Our Guiding Core Values"
            subtitle="The ethical and technical pillars underpinning every batch we produce."
            centered
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {company.coreValues.map((val) => (
              <div key={val.title} className="bg-[#FAF8FC] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-[#7D2D76]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-[#2B2430] mb-2">{val.title}</h4>
                <p className="text-sm text-[#77717B] leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure & Capabilities */}
      <section className="py-20 bg-[#46394A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#E3C058] text-xs font-bold uppercase tracking-widest block mb-2">Manufacturing Scale</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">High-Tech Infrastructure &amp; Quality Control</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Our manufacturing plant integrates SS-316L chemical reaction tanks, computerized dosing systems, and high-speed rotary bottling lines operating at zero manual contamination.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'SS-316L Chemical Reactors', desc: 'Precision continuous sulfonation and high-shear emulsification vessels.' },
                  { title: 'Analytical Testing Center', desc: 'In-house HPLC, UV-Vis spectrophotometers, and Brookfield viscometers.' },
                  { title: 'Zero Liquid Discharge (ZLD)', desc: '100% industrial wastewater recycled via RO and multi-effect evaporators.' },
                  { title: '8-Stage Testing Lifecycle', desc: 'From raw material quarantine to final carton vacuum integrity seal audits.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-[#E3C058] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-sm">{item.title}</div>
                      <div className="text-xs text-white/60 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <img
                src="/images/specialty_chemicals.jpg"
                alt="Varsha Products raw surfactants and specialty chemical storage"
                className="rounded-3xl shadow-2xl border border-white/10 w-full h-[460px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FAF8FC] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2B2430] mb-4">Partner With Varsha Products</h2>
          <p className="text-[#77717B] mb-8 leading-relaxed">
            Whether you require retail inventory, bulk institutional supplies, or private label contract manufacturing, our team is at your disposal.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-[#7D2D76] hover:bg-[#61316B] text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md inline-flex items-center gap-2"
            >
              Contact Our Engineers <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="border-2 border-[#7D2D76] text-[#7D2D76] hover:bg-[#7D2D76] hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
