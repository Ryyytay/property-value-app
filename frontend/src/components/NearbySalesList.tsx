import type { NearbySale } from '../api/property'

const currency = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })

function timeAgo(dateStr: string): string {
  const months = Math.round((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24 * 30))
  return new Intl.RelativeTimeFormat('en-AU', { numeric: 'auto' }).format(-months, 'month')
}

export default function NearbySalesList({ sales }: { sales: NearbySale[] }) {
  return (
    <div style={{ marginTop: '32px' }}>
      <h3 style={{ marginBottom: '12px' }}>Nearby Sales ({sales.length})</h3>
      {sales.map((sale, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
          <div>
            <p style={{ margin: 0, fontWeight: '600' }}>{sale.address}</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#6b7280' }}>
              {sale.bedrooms} bed · {sale.distanceKm} km away · {timeAgo(sale.soldDate)}
            </p>
          </div>
          <p style={{ margin: 0, fontWeight: '700', color: '#111827' }}>
            {currency.format(sale.soldPrice)}
          </p>
        </div>
      ))}
    </div>
  )
}
