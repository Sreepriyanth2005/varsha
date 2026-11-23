// Types for the Varsha Products website

export interface Product {
  id: number
  name: string
  slug: string
  categorySlug: string
  categoryName: string
  shortDescription: string
  description: string
  price?: number
  originalPrice?: number
  volume: string
  features: string[]
  fragrance?: string
  phLevel?: string
  dilutionRatio?: string
  imageUrl: string
  isFeatured: boolean
  isSpecialtyChemical: boolean
  sku: string
  availability: 'In Stock' | 'Made to Order' | 'B2B Only'
  specifications?: Record<string, string>
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  imageUrl: string
}

export interface CartItem {
  productId: number
  name: string
  price: number
  volume: string
  imageUrl: string
  quantity: number
  categoryName: string
}

export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  phone: string
  whatsapp: string
  email: string
  techEmail: string
  address: string
  workingHours: string
  yearFounded: string
  stats: { label: string; value: string }[]
  coreValues: { title: string; description: string; icon: string }[]
  services: Service[]
  whyChooseUs: { title: string; description: string; icon: string }[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface EnquiryFormData {
  name: string
  phone: string
  email: string
  company?: string
  address?: string
  productInterest: string
  quantity?: string
  message: string
}
