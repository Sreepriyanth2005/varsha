import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, MessageCircle, Phone, Package, Droplets, FlaskConical, ChevronRight, Check } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { useCartStore } from '../store/cartStore'
import ProductCard from '../components/common/ProductCard'
import NotFoundPage from './NotFoundPage'

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug || '')
  const { addItem, openCart } = useCartStore()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return <NotFoundPage />

  const related = getRelatedProducts(product, 3)
  const hasPrice = product.price !== undefined && !product.isSpecialtyChemical

  const handleAdd = () => {
    addItem(product, qty)
    openCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in: ${product.name} (SKU: ${product.sku}). Please share pricing and availability.`
  )

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#FAF8FC] border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#77717B]">
            <Link to="/" className="hover:text-[#7D2D76] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-[#7D2D76] transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/products?category=${product.categorySlug}`} className="hover:text-[#7D2D76] transition-colors">{product.categoryName}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#2B2430] font-medium line-clamp-1">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div>
            <div className="rounded-3xl overflow-hidden bg-[#FAF8FC] border border-gray-100 shadow-sm aspect-square flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.isSpecialtyChemical && (
                <span className="bg-[#D2AE34]/10 text-[#D2AE34] border border-[#D2AE34]/30 text-xs font-bold px-3 py-1.5 rounded-full">
                  B2B Specialty Chemical
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-[#7D2D76]/10 text-[#7D2D76] border border-[#7D2D76]/20 text-xs font-bold px-3 py-1.5 rounded-full">
                  Best Seller
                </span>
              )}
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                product.availability === 'In Stock'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-orange-50 text-orange-700 border-orange-200'
              }`}>
                {product.availability}
              </span>
            </div>
          </div>

          {/* Details */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7D2D76]">{product.categoryName}</span>
            <h1 className="text-3xl font-bold text-[#2B2430] mt-2 mb-4 leading-tight">{product.name}</h1>
            <p className="text-[#77717B] leading-relaxed mb-6">{product.description}</p>

            {/* Price */}
            {hasPrice ? (
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-[#2B2430]">₹{product.price!.toFixed(0)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toFixed(0)}</span>
                    <span className="bg-[#EE6B8B] text-white text-sm font-bold px-3 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price!) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-[#FAF8FC] rounded-2xl p-4 mb-6 border border-gray-100">
                <p className="text-sm text-[#77717B]">💬 This product is available on enquiry. Contact us for pricing and minimum order quantities.</p>
              </div>
            )}

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.volume && (
                <div className="flex items-center gap-2 bg-[#FAF8FC] rounded-xl p-3">
                  <Package className="w-4 h-4 text-[#7D2D76] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#77717B]">Volume / Pack</div>
                    <div className="text-sm font-semibold text-[#2B2430]">{product.volume}</div>
                  </div>
                </div>
              )}
              {product.phLevel && (
                <div className="flex items-center gap-2 bg-[#FAF8FC] rounded-xl p-3">
                  <FlaskConical className="w-4 h-4 text-[#7D2D76] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#77717B]">pH Level</div>
                    <div className="text-sm font-semibold text-[#2B2430]">{product.phLevel}</div>
                  </div>
                </div>
              )}
              {product.fragrance && (
                <div className="flex items-center gap-2 bg-[#FAF8FC] rounded-xl p-3">
                  <Droplets className="w-4 h-4 text-[#7D2D76] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#77717B]">Fragrance</div>
                    <div className="text-sm font-semibold text-[#2B2430]">{product.fragrance}</div>
                  </div>
                </div>
              )}
              {product.dilutionRatio && (
                <div className="flex items-center gap-2 bg-[#FAF8FC] rounded-xl p-3">
                  <Droplets className="w-4 h-4 text-[#7D2D76] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#77717B]">Dilution</div>
                    <div className="text-sm font-semibold text-[#2B2430] text-xs">{product.dilutionRatio}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold text-[#2B2430] mb-3 text-sm">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#77717B]">
                    <div className="w-5 h-5 bg-[#7D2D76] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* SKU */}
            <div className="text-xs text-[#77717B] mb-6">SKU: <span className="font-mono font-semibold">{product.sku}</span></div>

            {/* Actions */}
            {hasPrice && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-[#7D2D76] hover:bg-purple-50 font-bold text-lg transition-colors">−</button>
                  <span className="px-4 font-bold text-[#2B2430] min-w-[40px] text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-[#7D2D76] hover:bg-purple-50 font-bold text-lg transition-colors">+</button>
                </div>
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-full transition-all ${added ? 'bg-green-500 text-white' : 'bg-[#7D2D76] hover:bg-[#61316B] text-white'}`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-3">
              <a
                href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-full transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 border-2 border-[#7D2D76] text-[#7D2D76] hover:bg-[#7D2D76] hover:text-white font-semibold py-3.5 rounded-full transition-colors text-sm"
              >
                <Phone className="w-4 h-4" /> Get Quote
              </Link>
            </div>

            {/* 3D Model Studio Quick Button */}
            <Link
              to="/3d-experience"
              className="w-full bg-[#FAF8FC] hover:bg-purple-100/60 border border-[#DDCFE6] text-[#7D2D76] font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2 text-xs shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#E3C058] animate-pulse" />
              Inspect Packaging in 3D WebGL Studio &rarr;
            </Link>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && (
          <div className="mb-16 bg-[#FAF8FC] rounded-3xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-[#2B2430] mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="text-xs text-[#77717B] mb-1">{key}</div>
                  <div className="text-sm font-bold text-[#2B2430]">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2B2430]">Related Products</h2>
              <Link to={`/products?category=${product.categorySlug}`} className="text-sm text-[#7D2D76] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-[#77717B] hover:text-[#7D2D76] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}
