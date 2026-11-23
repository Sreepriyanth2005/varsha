import { Link } from 'react-router-dom'
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, clearCart } = useCartStore()
  const sub = subtotal()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#7D2D76]" />
            <h2 className="font-bold text-[#2B2430] text-lg">Your Cart</h2>
            {items.length > 0 && (
              <span className="bg-[#7D2D76] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-[#DDCFE6]" />
              </div>
              <h3 className="font-bold text-[#2B2430] mb-2">Your cart is empty</h3>
              <p className="text-sm text-[#77717B] mb-6">Add products to get started.</p>
              <button
                onClick={closeCart}
                className="bg-[#7D2D76] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#61316B] transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 bg-[#FAF8FC] rounded-2xl p-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#2B2430] leading-snug line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#77717B] mb-2">{item.volume}</p>
                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center gap-1 bg-white rounded-full border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#7D2D76] hover:bg-purple-50 rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#7D2D76] hover:bg-purple-50 rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#2B2430]">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors self-start"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#77717B]">Subtotal</span>
              <span className="font-bold text-[#2B2430]">₹{sub.toFixed(0)}</span>
            </div>
            <p className="text-xs text-[#77717B] bg-[#FAF8FC] rounded-xl p-3">
              🔒 Prices are indicative. Final invoice issued upon order confirmation.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={closeCart}
                className="flex items-center justify-center gap-2 border-2 border-[#7D2D76] text-[#7D2D76] text-sm font-semibold py-3 rounded-full hover:bg-purple-50 transition-colors"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="flex items-center justify-center gap-2 bg-[#7D2D76] text-white text-sm font-semibold py-3 rounded-full hover:bg-[#61316B] transition-colors"
              >
                Enquire <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <a
              href={`https://wa.me/919876543210?text=Hi! I'd like to enquire about my cart items`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white text-sm font-semibold py-3 rounded-full hover:bg-green-600 transition-colors w-full"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry
            </a>
            <button
              onClick={clearCart}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors w-full text-center"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
