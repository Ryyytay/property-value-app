import type { PropertyResponse } from '../api/property'

const currency = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })

interface Props {
  data: PropertyResponse
}

function confidenceLabel(saleCount: number): { label: string; bg: string; color: string } {
  if (saleCount >= 5) return { label: 'High Confidence', bg: '#dcfce7', color: '#166534' }
  if (saleCount >= 3) return { label: 'Medium Confidence', bg: '#fef9c3', color: '#854d0e' }
  return { label: 'Low Confidence', bg: '#fee2e2', color: '#991b1b' }
}

export default function ValuationCard({ data }: Props) {
  const low = Math.round(data.estimatedValue * 0.9)
  const high = Math.round(data.estimatedValue * 1.1)
  const confidence = confidenceLabel(data.nearbySales.length)

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', marginTop: '24px' }}>

      {/* Estimated value */}
      <h2 style={{ fontSize: '2.5rem', margin: '0', color: '#111827' }}>
        {currency.format(data.estimatedValue)}
      </h2>

      {/* Range */}
      <p style={{ color: '#6b7280', margin: '4px 0 16px 0' }}>
        {currency.format(low)} – {currency.format(high)} estimated range
      </p>

      {/* Confidence badge */}
      <span style={{ background: confidence.bg, color: confidence.color, padding: '4px 12px', borderRadius: '999px', fontSize: '14px' }}>
        {confidence.label}
      </span>

      {/* Property details grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
        <Stat label="Bedrooms" value={data.bedrooms} />
        <Stat label="Bathrooms" value={data.bathrooms} />
        <Stat label="Car Spaces" value={data.carSpaces} />
        <Stat label="Land Size" value={`${data.landSize} m²`} />
        <Stat label="Property Type" value={data.propertyType} />
        <Stat label="Last Sold" value={`${currency.format(data.lastSoldPrice)} (${data.lastSoldDate})`} />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p style={{ margin: '0', fontSize: '13px', color: '#6b7280' }}>{label}</p>
      <p style={{ margin: '4px 0 0 0', fontWeight: '600' }}>{value}</p>
    </div>
  )
}