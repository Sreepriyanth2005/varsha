import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, MessageCircle } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCartStore()
  const sub = subtotal()

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-20">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#7D2D76]">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-[#2B2430] mb-3">Your Cart is Empty</h1>
          <p className="text-[#77717B] text-base mb-8">
            Explore our range of floor cleaners, bio-enzyme washing liquids, and detergents.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#7D2D76] hover:bg-[#61316B] text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md"
          >
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF8FC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2B2430]">Shopping Cart</h1>
            <p className="text-sm text-[#77717B] mt-1">
              Review your selected items before proceeding to product enquiry.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.productId} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#7D2D76] uppercase tracking-wider block mb-1">
                        {item.categoryName}
                      </span>
                      <h3 className="font-bold text-base text-[#2B2430] leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#77717B] mt-1">{item.volume}</p>
                      <p className="text-sm font-semibold text-[#2B2430] mt-1 sm:hidden">
                        ₹{item.price > 0 ? (item.price * item.quantity).toFixed(0) : 'Enquire'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-200 rounded-full bg-[#FAF8FC]">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#7D2D76] hover:bg-purple-100 rounded-full transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#2B2430]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#7D2D76] hover:bg-purple-100 rounded-full transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="hidden sm:block text-right min-w-[90px]">
                      <span className="text-lg font-bold text-[#2B2430]">
                        ₹{item.price > 0 ? (item.price * item.quantity).toFixed(0) : 'Quote'}
                      </span>
                      {item.price > 0 && (
                        <span className="text-xs text-[#77717B] block">
                          ₹{item.price.toFixed(0)} each
                        </span>
                      )}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm sticky top-28 space-y-6">
            <h3 className="font-bold text-xl text-[#2B2430]">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#77717B]">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#2B2430]">₹{sub.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-[#77717B]">
                <span>Estimated Packaging &amp; Freight</span>
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                  Confirmed on Order
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-[#2B2430]">
                <span>Estimated Total</span>
                <span className="text-2xl text-[#7D2D76]">₹{sub.toFixed(0)}</span>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8FC] rounded-2xl text-xs text-[#77717B] leading-relaxed border border-purple-50">
              💡 As a chemical manufacturer, all orders are processed via our customer enquiry desk to confirm batch availability, transit discounts, and GST invoice details.
            </div>

            <div className="space-y-3">
              <Link
                to="/checkout"
                className="w-full bg-[#7D2D76] hover:bg-[#61316B] text-white font-bold py-4 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
              >
                Proceed to Order Enquiry <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi! I have ${items.length} items in my cart on Varsha Products and would like to place an order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" /> Enquire via WhatsApp
              </a>
            </div>

            <div className="text-center">
              <Link to="/products" className="text-xs font-semibold text-[#7D2D76] hover:underline">
                &larr; Continue Browsing Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
