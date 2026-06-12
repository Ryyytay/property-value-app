import { useState } from 'react'
import { fetchProperty, type PropertyResponse } from './api/property'
import ValuationCard from './components/ValuationCard'
import NearbySalesList from './components/NearbySalesList'
import PropertyMap from './components/PropertyMap'
import Skeleton from './components/Skeleton'

function App() {
  const [address, setAddress] = useState('')
  const [searchedAddress, setSearchedAddress] = useState('')
  const [data, setData] = useState<PropertyResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = address.trim()
    if (!trimmed) return
    setLoading(true)
    setError(null)
    setData(null)
    setSearched(true)
    setSearchedAddress(trimmed)
    document.title = `${trimmed} — Property Valuations`
    try {
      const result = await fetchProperty(trimmed)
      setData(result)
      setAddress('')
    } catch (err) {
      setError('Could not load property data. Check the address and try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setData(null)
    setError(null)
    setSearched(false)
    setAddress('')
    setSearchedAddress('')
    document.title = 'Property Valuations'
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '760px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '4px' }}>Property Valuations</h1>

      {!searched ? (
        /* Initial search form */
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter an address..."
            style={{ width: '100%', padding: '12px', fontSize: '16px', boxSizing: 'border-box' }}
          />
          <button
            type="submit"
            style={{ marginTop: '10px', padding: '12px 24px', fontSize: '16px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            Search
          </button>
        </form>
      ) : (
        /* Searched address + reset */
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <p style={{ margin: 0, color: '#374151', fontSize: '15px' }}>
            Results for <strong>{searchedAddress}</strong>
          </p>
          <button
            onClick={handleReset}
            style={{ padding: '6px 14px', fontSize: '13px', background: 'none', border: '1px solid #d1d5db', cursor: 'pointer', borderRadius: '4px', color: '#6b7280', whiteSpace: 'nowrap' }}
          >
            ← Search again
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && <Skeleton />}

      {/* Error state */}
      {error && (
        <div style={{ marginTop: '24px', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626' }}>
          {error}
        </div>
      )}

      {/* Results */}
      {data && <ValuationCard data={data} />}
      {data && <NearbySalesList sales={data.nearbySales} />}
      {data && <PropertyMap data={data} />}
    </div>
  )
}

export default App
