import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Package } from 'lucide-react'
import type { Product } from '../../types'
import { useCartStore } from '../../store/cartStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (product.isSpecialtyChemical || !product.price) return
    addItem(product)
    openCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const hasPrice = product.price !== undefined && !product.isSpecialtyChemical

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:border-[#DDCFE6] transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link to={`/products/${product.slug}`} className="relative overflow-hidden block">
        <div className="relative h-56 bg-[#FAF8FC] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isSpecialtyChemical && (
              <span className="bg-[#D2AE34] text-white text-xs font-bold px-3 py-1 rounded-full">
                B2B Only
              </span>
            )}
            {product.isFeatured && !product.isSpecialtyChemical && (
              <span className="bg-[#7D2D76] text-white text-xs font-bold px-3 py-1 rounded-full">
                Best Seller
              </span>
            )}
            {product.originalPrice && product.price && (
              <span className="bg-[#EE6B8B] text-white text-xs font-bold px-3 py-1 rounded-full">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
          {/* Quick View */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white rounded-full p-2 shadow-md">
              <Eye className="w-4 h-4 text-[#7D2D76]" />
            </div>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7D2D76]">
            {product.categoryName}
          </span>
        </div>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-bold text-[#2B2430] text-sm leading-snug mb-2 line-clamp-2 hover:text-[#7D2D76] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[#77717B] mb-3 line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        {/* Volume Badge */}
        <div className="flex items-center gap-1.5 mb-4">
          <Package className="w-3.5 h-3.5 text-[#77717B]" />
          <span className="text-xs text-[#77717B]">{product.volume}</span>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-3 mt-auto">
          {hasPrice ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-[#2B2430]">
                ₹{product.price!.toFixed(0)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm font-semibold text-[#77717B]">Enquire for Price</span>
          )}

          {product.isSpecialtyChemical ? (
            <Link
              to="/contact"
              className="text-xs font-bold px-3 py-2 rounded-full border-2 border-[#D2AE34] text-[#D2AE34] hover:bg-[#D2AE34] hover:text-white transition-colors whitespace-nowrap"
            >
              B2B Quote
            </Link>
          ) : hasPrice ? (
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full transition-all whitespace-nowrap ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-[#7D2D76] hover:bg-[#61316B] text-white'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          ) : (
            <Link
              to="/contact"
              className="text-xs font-bold px-3 py-2 rounded-full bg-[#7D2D76] text-white hover:bg-[#61316B] transition-colors whitespace-nowrap"
            >
              Get Quote
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
