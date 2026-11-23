import type { Category } from '../types'

export const categories: Category[] = [
  {
    id: 'floor-cleaner',
    slug: 'floor-cleaner',
    name: 'Floor Cleaners',
    description: 'Citrus & pine herbal floor disinfectants for homes, offices and commercial spaces.',
    icon: 'Sparkles',
    imageUrl: '/images/hero_products.jpg',
  },
  {
    id: 'washing-liquid',
    slug: 'washing-liquid',
    name: 'Washing Liquids',
    description: 'Bio-enzyme washing liquids for all fabrics including delicates, wool and silks.',
    icon: 'Droplets',
    imageUrl: '/images/hero_products.jpg',
  },
  {
    id: 'detergents',
    slug: 'detergents',
    name: 'Detergent Powders',
    description: 'Micro-granulated oxygen-active detergent powders for all washing machines.',
    icon: 'Package',
    imageUrl: '/images/hero_products.jpg',
  },
  {
    id: 'specialty-chemical',
    slug: 'specialty-chemical',
    name: 'Specialty Chemicals',
    description: 'High-purity industrial surfactants: SLES 70%, LABSA 90% for B2B manufacturing.',
    icon: 'FlaskConical',
    imageUrl: '/images/specialty_chemicals.jpg',
  },
  {
    id: 'surface-restroom',
    slug: 'surface-restroom',
    name: 'Restroom & Surface',
    description: 'Heavy descalers, toilet bowl cleaners and glass surface care products.',
    icon: 'Shield',
    imageUrl: '/images/hero_products.jpg',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
