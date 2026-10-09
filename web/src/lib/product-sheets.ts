import type { CatalogueProduct } from '@/lib/catalogue'

export type ProductSheet = {
  pdf: string
  description: string
  properties: string[]
  approvals: string[]
  recommendations: string[]
  technicalData: { label: string; value: string; method: string }[]
  areasOfApplication: string
  application: string
}

export const PRODUCT_INFORMATION_PDF = '/product-sheets/P000385-Steering-Gear-Oil-3100-28-en_GB.pdf'

const SHEETS: Record<string, ProductSheet> = {
  'steering gear oil 3100': {
    pdf: PRODUCT_INFORMATION_PDF,
    description:
      'Hydraulic fluid designed for the high requirements of Daimler. Steering Gear Oil 3100 can be used in mechanical steering systems and in the power steering systems of a number of Mercedes-Benz vehicles. Selected base oils and additive components keep viscosity and friction stable, protect against wear, and resist heat, aging, and corrosion. It also stays fluid at low temperatures.',
    properties: [
      'Optimum stability to aging',
      'Excellent low-temperature behavior',
      'Friction and wear reducing',
      'Excellent viscosity/temperature properties',
      'Excellent corrosion protection',
      'Highest thermal stability',
    ],
    approvals: ['Dexron II D', 'DTFR 38B100 (236.3)', 'MB-Approval 236.3'],
    recommendations: [
      'VW G 009 300',
      'ZF TE-ML 03D',
      'ZF TE-ML 04D',
      'ZF TE-ML 09',
      'ZF TE-ML 11',
      'ZF TE-ML 14A',
      'ZF TE-ML 17C',
    ],
    technicalData: [
      { label: 'Density at 15 °C', value: '0.855 g/cm³', method: 'DIN 51757' },
      { label: 'Viscosity at 40 °C', value: '33 mm²/s', method: 'ASTM D 7042-04' },
      { label: 'Viscosity at 100 °C', value: '6.65 mm²/s', method: 'ASTM D 7042-04' },
      { label: 'Viscosity at −40 °C (Brookfield)', value: '≤ 40000 mPas', method: 'ASTM D 2983-09' },
      { label: 'Viscosity index', value: '163', method: 'DIN ISO 2909' },
      { label: 'Flash point', value: '198 °C', method: 'DIN ISO 2592' },
      { label: 'Pour point', value: '−36 °C', method: 'DIN ISO 3016' },
      { label: 'Color number (ASTM)', value: 'L 3.5', method: 'DIN ISO 2049' },
    ],
    areasOfApplication: 'For use in mechanical steering systems and in power steering systems.',
    application:
      'Follow the instructions from the unit or vehicle manufacturer. Steering Gear Oil 3100 can also refill systems that already use traditional ATFs meeting these specifications. It works best when used on its own, without mixing.',
  },
}

export function productDetailsHref(
  _product: Pick<CatalogueProduct, 'id' | 'path' | 'categorySlug' | 'name'>,
) {
  return PRODUCT_INFORMATION_PDF
}

export function sheetForProduct(product: Pick<CatalogueProduct, 'name'>): ProductSheet | null {
  const key = product.name.trim().toLowerCase().replace(/\s+/g, ' ')
  return SHEETS[key] ?? null
}
