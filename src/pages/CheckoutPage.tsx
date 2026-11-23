import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CheckCircle2, MessageCircle, ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone or WhatsApp number'),
  companyName: z.string().optional(),
  deliveryAddress: z.string().min(5, 'Please provide delivery address or city'),
  notes: z.string().optional(),
  preferredContact: z.enum(['phone', 'whatsapp', 'email']),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore()
  const [orderComplete, setOrderComplete] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<CheckoutFormData | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      preferredContact: 'whatsapp',
    },
  })

  const sub = subtotal()

  const onSubmit = (data: CheckoutFormData) => {
    const orderId = `VP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    setOrderComplete(orderId)
    setSubmittedData(data)
    clearCart()
  }

  if (orderComplete && submittedData) {
    const itemsSummary = items.length > 0 
      ? items.map(i => `${i.name} (x${i.quantity})`).join(', ') 
      : 'Products inquiry'

    const whatsappText = encodeURIComponent(
      `Hi Varsha Products! I placed an order enquiry #${orderComplete}.\nName: ${submittedData.fullName}\nPhone: ${submittedData.phone}\nItems: ${itemsSummary}\nAddress: ${submittedData.deliveryAddress}`
    )

    return (
      <div className="bg-[#FAF8FC] min-h-[80vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-[#7D2D76] uppercase tracking-widest block mb-2">
            Enquiry Received
          </span>
          <h1 className="text-3xl font-bold text-[#2B2430] mb-3">Thank You for Your Order Request!</h1>
          <p className="text-sm text-[#77717B] leading-relaxed mb-6">
            Your order enquiry has been logged with reference number:
          </p>

          <div className="p-4 bg-[#FAF8FC] rounded-2xl border border-gray-200 mb-6 font-mono text-xl font-bold text-[#7D2D76]">
            {orderComplete}
          </div>

          <div className="text-left text-xs text-[#77717B] space-y-2 p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
            <div><span className="font-semibold text-[#2B2430]">Customer:</span> {submittedData.fullName}</div>
            <div><span className="font-semibold text-[#2B2430]">Phone:</span> {submittedData.phone}</div>
            <div><span className="font-semibold text-[#2B2430]">Destination:</span> {submittedData.deliveryAddress}</div>
            <div><span className="font-semibold text-[#2B2430]">Next Step:</span> Our sales logistics team will connect via {submittedData.preferredContact} with final invoice and dispatch schedules.</div>
          </div>

          <div className="space-y-3">
            <a
              href={`https://wa.me/919876543210?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4" /> Forward Reference to WhatsApp
            </a>

            <Link
              to="/products"
              className="w-full block border-2 border-[#7D2D76] text-[#7D2D76] hover:bg-[#7D2D76] hover:text-white font-semibold py-3.5 rounded-full transition-colors text-sm"
            >
              Continue to Product Catalogue
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center py-20 px-4 text-center">
        <div>
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2B2430] mb-2">No Items to Check Out</h2>
          <p className="text-sm text-[#77717B] mb-6">Please add products to your cart before proceeding.</p>
          <Link
            to="/products"
            className="bg-[#7D2D76] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#61316B] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF8FC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7D2D76] hover:underline mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2B2430]">Order Checkout Enquiry</h1>
          <p className="text-sm text-[#77717B] mt-1">
            Complete your details to submit your bulk or retail order request to our customer dispatch team.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#2B2430] mb-6">Customer &amp; Delivery Details</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76]"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76]"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    {...register('companyName')}
                    placeholder="Firm, Hotel or Facility"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                  Delivery Address / Destination City *
                </label>
                <textarea
                  rows={3}
                  {...register('deliveryAddress')}
                  placeholder="Street, City, State, PIN Code"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76]"
                />
                {errors.deliveryAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.deliveryAddress.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'whatsapp', label: 'WhatsApp' },
                    { value: 'phone', label: 'Phone Call' },
                    { value: 'email', label: 'Email' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-xs font-semibold text-[#2B2430] p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        value={opt.value}
                        {...register('preferredContact')}
                        className="text-[#7D2D76]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B2430] uppercase tracking-wider mb-2">
                  Special Instructions or Packaging Requirements
                </label>
                <input
                  type="text"
                  {...register('notes')}
                  placeholder="e.g. Need GST tax invoice, preferred transport service..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#7D2D76]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#7D2D76] hover:bg-[#61316B] text-white font-bold py-4 rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Order Enquiry...' : 'Confirm & Submit Order Enquiry'}
                </button>
              </div>
            </form>
          </div>

          {/* Cart Summary Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm sticky top-28 space-y-6">
            <h3 className="font-bold text-xl text-[#2B2430]">Order Items ({items.length})</h3>

            <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 pr-2 space-y-3">
              {items.map((i) => (
                <div key={i.productId} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={i.imageUrl} alt={i.name} className="w-12 h-12 rounded-xl object-cover bg-gray-50 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#2B2430] line-clamp-1">{i.name}</div>
                      <div className="text-xs text-[#77717B]">Qty: {i.quantity} &bull; {i.volume}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-[#2B2430] whitespace-nowrap">
                    ₹{(i.price * i.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#77717B]">
                <span>Total Items</span>
                <span className="font-semibold text-[#2B2430]">{items.reduce((s, i) => s + i.quantity, 0)} units</span>
              </div>
              <div className="flex justify-between text-[#77717B]">
                <span>Estimated Subtotal</span>
                <span className="font-bold text-xl text-[#7D2D76]">₹{sub.toFixed(0)}</span>
              </div>
            </div>

            <div className="bg-[#FAF8FC] p-4 rounded-2xl border border-purple-50 text-xs text-[#77717B] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#2B2430]">
                <ShieldCheck className="w-4 h-4 text-green-600" /> Genuine Factory Supply
              </div>
              <p>
                No advance payment is taken online. A confirmed GST proforma invoice is issued upon batch readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
