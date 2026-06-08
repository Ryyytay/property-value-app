import { useState } from 'react'
import { fetchProperty, type PropertyResponse } from './api/property'
import ValuationCard from './components/ValuationCard'
import NearbySalesList from './components/NearbySalesList'

function App() {
  const [address, setAddress] = useState('')
  const [data, setData] = useState<PropertyResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setData(null)
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

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '80px auto', padding: '0 20px' }}>
      <h1>Property Valuations</h1>
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

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <ValuationCard data={data} />}
      {data && <NearbySalesList sales={data.nearbySales} />}
    </div>
  )
}

export default App