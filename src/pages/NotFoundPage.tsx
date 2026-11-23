import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md">
        <span className="text-8xl font-black text-[#DDCFE6] block mb-4">404</span>
        <h1 className="text-3xl font-bold text-[#2B2430] mb-3">Page Not Found</h1>
        <p className="text-sm text-[#77717B] mb-8 leading-relaxed">
          The page or product category you are looking for does not exist or has been relocated.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#7D2D76] hover:bg-[#61316B] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm shadow-sm"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 border-2 border-[#7D2D76] text-[#7D2D76] hover:bg-purple-50 font-semibold px-6 py-3 rounded-full transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
