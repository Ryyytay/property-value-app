import { useState } from 'react'
import { fetchProperty, type PropertyResponse } from './api/property'
import ValuationCard from './components/ValuationCard'
import NearbySalesList from './components/NearbySalesList'
import PropertyMap from './components/PropertyMap'
import Skeleton from './components/Skeleton'

function App() {
  const [address, setAddress] = useState('')
  const [data, setData] = useState<PropertyResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setData(null)
    setSearched(true)
    try {
      const result = await fetchProperty(address)
      setData(result)
      setAddress('')
    } catch (err) {
      setError('Could not load property. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setData(null)
    setError(null)
    setSearched(false)
    setAddress('')
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '80px auto', padding: '0 20px' }}>
      <h1>Property Valuations</h1>

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
        /* Search again button */
        <button
          onClick={handleReset}
          style={{ padding: '8px 16px', fontSize: '14px', background: 'none', border: '1px solid #d1d5db', cursor: 'pointer', borderRadius: '4px', color: '#6b7280' }}
        >
          ← Search again
        </button>
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
