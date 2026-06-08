import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { PropertyResponse } from '../api/property'

// Leaflet's default marker icons break with Vite — this fixes it
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const currency = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })

export default function PropertyMap({ data }: { data: PropertyResponse }) {
  return (
    <div style={{ marginTop: '32px', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
      <h3 style={{ marginBottom: '12px' }}>Map</h3>
      <MapContainer
        center={[data.lat, data.lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Subject property marker */}
        <Marker position={[data.lat, data.lng]}>
          <Popup>
            <strong>{data.address}</strong><br />
            Est. {currency.format(data.estimatedValue)}
          </Popup>
        </Marker>

        {/* Nearby sales markers */}
        {data.nearbySales.map((sale, i) => (
          <Marker key={i} position={[sale.lat, sale.lng]}>
            <Popup>
              {sale.address}<br />
              Sold {currency.format(sale.soldPrice)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
