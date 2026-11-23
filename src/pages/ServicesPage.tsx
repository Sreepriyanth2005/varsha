import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Factory, Tag, Truck, FlaskConical, MessageSquare, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import { company } from '../data/company'

const serviceIconMap: Record<string, ReactNode> = {
  Factory: <Factory className="w-8 h-8 text-[#7D2D76]" />,
  Tag: <Tag className="w-8 h-8 text-[#D2AE34]" />,
  Truck: <Truck className="w-8 h-8 text-[#EE6B8B]" />,
  FlaskConical: <FlaskConical className="w-8 h-8 text-[#7D2D76]" />,
  MessageSquare: <MessageSquare className="w-8 h-8 text-[#D2AE34]" />,
  MapPin: <MapPin className="w-8 h-8 text-[#56344F]" />,
}

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#56344F] via-[#7D2D76] to-[#61316B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#E3C058]/20 border border-[#E3C058]/40 text-[#E3C058] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Industrial &amp; Commercial Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services &amp; Solutions</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            From consumer hygiene manufacturing and private-label contract packaging to bulk surfactant synthesis and supply.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Comprehensive Chemical &amp; Hygiene Services"
            subtitle="Tailored manufacturing, private-labeling, and bulk intermediate solutions designed for global standards."
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {company.services.map((svc) => (
              <div
                key={svc.id}
                className="bg-[#FAF8FC] rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#DDCFE6] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                    {serviceIconMap[svc.icon] || <Factory className="w-8 h-8 text-[#7D2D76]" />}
                  </div>
                  <h3 className="text-2xl font-bold text-[#2B2430] mb-3">{svc.title}</h3>
                  <p className="text-[#77717B] text-sm leading-relaxed mb-6">{svc.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-200/60">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#7D2D76] hover:text-[#61316B] group transition-colors"
                  >
                    Enquire for this service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM / Private Label Focus Section */}
      <section className="py-20 bg-gradient-to-br from-[#46394A] to-[#56344F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-[#E3C058] text-[#2B2430] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 inline-block">
                Contract OEM &amp; Private Label
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Launch Your Own Cleaning Brand with Varsha Products</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                We formulate, bottle, seal, and label high-performance floor cleaners, bio-enzyme detergents, and dishwash liquids under your brand. Benefit from our established R&amp;D expertise and certified facility.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Custom fragrance formulation (Citrus, Pine, Lavender, Ocean Breeze)',
                  'Custom active matter, pH, and viscosity rheology tuning',
                  'Multiple packaging options: 500ml, 1L, 5L cans, 200L drums, 1000L IBCs',
                  'Full regulatory documentation: TDS, MSDS, GHS compliance certificates',
                  'Tamper-evident induction cap sealing and high-speed rotary labeling',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E3C058] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{point}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="bg-[#E3C058] hover:bg-[#D2AE34] text-[#2B2430] font-bold px-8 py-3.5 rounded-full transition-all shadow-lg inline-flex items-center gap-2"
              >
                Request OEM Proposal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <img
                src="/images/infrastructure_lab.jpg"
                alt="Automated chemical manufacturing line"
                className="rounded-3xl shadow-2xl border border-white/10 w-full h-[440px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process / How It Works */}
      <section className="py-20 bg-[#FAF8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Execute Your Bulk &amp; Custom Orders"
            subtitle="A transparent, quality-first lifecycle ensuring zero discrepancies from consultation to delivery."
            centered
          />

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { step: '01', title: 'Consultation & Scope', desc: 'Discuss target volume, fragrance, packaging size, and specifications.' },
              { step: '02', title: 'Formulation & Lab Test', desc: 'Pilot batch synthesis, viscosity assays, and sample approval.' },
              { step: '03', title: 'Full-Scale Synthesis', desc: 'Automated SS-316L reactor compounding and high-speed bottling.' },
              { step: '04', title: 'QA Release & Dispatch', desc: '8-stage laboratory verification, COA issue, and freight loading.' },
            ].map((st) => (
              <div key={st.step} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
                <span className="text-3xl font-extrabold text-[#DDCFE6] block mb-2">{st.step}</span>
                <h4 className="font-bold text-lg text-[#2B2430] mb-2">{st.title}</h4>
                <p className="text-xs text-[#77717B] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2B2430] mb-4">Have Specific Formulation Requirements?</h2>
          <p className="text-[#77717B] mb-8">
            Speak directly with our chemical formulation engineers for sample kits, technical data sheets, and custom quote estimations.
          </p>
          <Link
            to="/contact"
            className="bg-[#7D2D76] hover:bg-[#61316B] text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md inline-flex items-center gap-2"
          >
            Submit an Enquiry <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
