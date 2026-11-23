import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2, Send } from 'lucide-react'
import { company } from '../data/company'
import SectionHeading from '../components/common/SectionHeading'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid contact number'),
  productInterest: z.string().min(1, 'Please select a product line'),
  estimatedVolume: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      productInterest: 'Floor Cleaner & Disinfectants',
    },
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact inquiry submission:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#56344F] via-[#7D2D76] to-[#61316B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#E3C058]/20 border border-[#E3C058]/40 text-[#E3C058] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Connect With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Varsha Products</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            For retail queries, wholesale quotes, technical data sheets (TDS), or custom contract manufacturing discussions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <SectionHeading
                eyebrow="Direct Channels"
                title="We Are Here to Assist"
                subtitle="Reach out directly to our commercial sales and technical chemical advisory desks."
              />
            </div>

            {/* Phone Card */}
            <div className="bg-[#FAF8FC] rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#7D2D76] flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#2B2430] text-sm">Direct Phone Line</h4>
                <a href={`tel:${company.phone}`} className="text-lg font-bold text-[#7D2D76] hover:underline block mt-0.5">
                  {company.phone}
                </a>
                <span className="text-xs text-[#77717B] block mt-1">{company.workingHours}</span>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#FAF8FC] rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#2B2430] text-sm">WhatsApp Technical Helpdesk</h4>
                <a
                  href={`https://wa.me/${company.whatsapp}?text=Hi! I want to enquire about Varsha Products`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-green-700 hover:underline block mt-0.5"
                >
                  Chat with Technical Team &rarr;
                </a>
                <span className="text-xs text-[#77717B] block mt-1">Instant support for specifications &amp; bulk estimates</span>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#FAF8FC] rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#56344F] flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#2B2430] text-sm">Corporate &amp; Order Email</h4>
                <a href={`mailto:${company.email}`} className="text-sm font-semibold text-[#2B2430] hover:text-[#7D2D76] block mt-0.5">
                  {company.email}
                </a>
                <span className="text-xs text-[#77717B] block mt-1">Inquiries: {company.techEmail}</span>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-[#FAF8FC] rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#D2AE34] flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#2B2430] text-sm">Manufacturing Plant &amp; Office</h4>
                <p className="text-sm text-[#77717B] mt-1 leading-relaxed">{company.address}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#7D2D76]">
                  <Clock className="w-3.5 h-3.5" /> Monday to Saturday: 9:00 AM – 6:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-xl">
              <h3 className="text-2xl font-bold text-[#2B2430] mb-2">Send Us an Inquiry</h3>
              <p className="text-[#77717B] text-sm mb-8 leading-relaxed">
                Fill in your specifications or volume needs below. Our chemical sales engineers typically respond within 2 business hours.
              </p>

              {submitted ? (
                <div className="p-8 bg-green-50 rounded-2xl border border-green-200 text-center animate-fade-in-up">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-green-900 mb-2">Inquiry Submitted Successfully!</h4>
                  <p className="text-sm text-green-800 leading-relaxed mb-6">
                    Thank you for reaching out to Varsha Products. One of our formulation specialists will review your requirements and reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#7D2D76] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#61316B] transition-colors"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('fullName')}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76] transition-colors"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        {...register('companyName')}
                        placeholder="Company, Hotel or Hospital"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76] transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76] transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                        Product Line of Interest
                      </label>
                      <select
                        {...register('productInterest')}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76] transition-colors bg-white"
                      >
                        <option value="Floor Cleaner & Disinfectants">Floor Cleaner &amp; Disinfectants</option>
                        <option value="Washing Liquid & Fabric Care">Washing Liquid &amp; Fabric Care</option>
                        <option value="Detergent Powders">Detergent Powders</option>
                        <option value="Specialty Chemicals (SLES / LABSA)">Specialty Chemicals (SLES / LABSA)</option>
                        <option value="Restroom & Surface Care">Restroom &amp; Surface Care</option>
                        <option value="Contract OEM & Private Label">Contract OEM &amp; Private Label</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                        Estimated Order Volume
                      </label>
                      <select
                        {...register('estimatedVolume')}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76] transition-colors bg-white"
                      >
                        <option value="Retail Pack (1 - 50 L)">Retail Pack (1 - 50 Litres)</option>
                        <option value="Commercial (100 - 1,000 L)">Commercial (100 - 1,000 Litres)</option>
                        <option value="Bulk Drums (1 - 10 Drums)">Bulk Drums (1 - 10 Drums)</option>
                        <option value="Full Truck Load (10 - 25 MT)">Full Truck Load (10 - 25 MT)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      {...register('subject')}
                      placeholder="e.g. Quotation for 500L Citrus Floor Cleaner"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                      Requirement Details *
                    </label>
                    <textarea
                      rows={4}
                      {...register('message')}
                      placeholder="Describe your packaging requirements, custom fragrance preferences, or delivery destination..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76] transition-colors"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#7D2D76] hover:bg-[#61316B] text-white font-bold py-4 rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry to Sales Team'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
