import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/common/ProductCard'
import SectionHeading from '../components/common/SectionHeading'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initCategory = searchParams.get('category') || 'all'
  const initSearch = searchParams.get('search') || ''

  const [search, setSearch] = useState(initSearch)
  const [category, setCategory] = useState(initCategory)
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== 'all') list = list.filter((p) => p.categorySlug === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      )
    }
    if (sort === 'price-low') list.sort((a, b) => (a.price ?? 999) - (b.price ?? 999))
    else if (sort === 'price-high') list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    else list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    return list
  }, [search, category, sort])

  const handleCategory = (slug: string) => {
    setCategory(slug)
    setSearchParams(slug !== 'all' ? { category: slug } : {})
  }

  const handleSearch = (val: string) => {
    setSearch(val)
    if (val) setSearchParams({ search: val })
    else setSearchParams({})
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setSort('featured')
    setSearchParams({})
  }

  const hasFilters = category !== 'all' || search.trim() !== ''

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#56344F] to-[#7D2D76] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#E3C058]/20 border border-[#E3C058]/30 text-[#E3C058] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Product Catalogue
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Floor cleaners, washing liquids, detergent powders, and specialty surfactants — directly from the manufacturer.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77717B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7D2D76] transition-colors"
              />
              {search && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#2B2430] focus:outline-none focus:border-[#7D2D76] transition-colors bg-white"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors md:hidden ${showFilters ? 'bg-[#7D2D76] text-white border-[#7D2D76]' : 'border-gray-200 text-[#2B2430]'}`}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className={`flex flex-wrap gap-2 mb-8 ${showFilters || 'hidden md:flex'}`}>
          <button
            onClick={() => handleCategory('all')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${category === 'all' ? 'bg-[#7D2D76] text-white shadow-sm' : 'bg-[#FAF8FC] text-[#2B2430] hover:bg-[#DDCFE6]/30 border border-gray-200'}`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length
            return (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.slug)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${category === cat.slug ? 'bg-[#7D2D76] text-white shadow-sm' : 'bg-[#FAF8FC] text-[#2B2430] hover:bg-[#DDCFE6]/30 border border-gray-200'}`}
              >
                {cat.name} ({count})
              </button>
            )
          })}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-[#EE6B8B] border border-[#EE6B8B]/30 hover:bg-[#EE6B8B]/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#77717B]">
            Showing <span className="font-bold text-[#2B2430]">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
            {category !== 'all' && <span> in <span className="text-[#7D2D76] font-semibold">{categories.find(c => c.slug === category)?.name}</span></span>}
          </p>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-[#FAF8FC] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#DDCFE6]" />
            </div>
            <h3 className="text-xl font-bold text-[#2B2430] mb-2">No products found</h3>
            <p className="text-[#77717B] mb-6">Try adjusting your search or filter.</p>
            <button
              onClick={clearFilters}
              className="bg-[#7D2D76] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#61316B] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
