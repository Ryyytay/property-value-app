export default function Skeleton() {
  const box = (height: string, width = '100%') => (
    <div style={{ height, width, background: '#e5e7eb', borderRadius: '4px', animation: 'pulse 1.5s ease-in-out infinite' }} />
  )

  return (
    <>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }`}</style>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {box('16px', '40%')}
        {box('48px', '60%')}
        {box('16px', '50%')}
        {box('28px', '120px')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '12px' }}>
          {[...Array(6)].map((_, i) => <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>{box('12px', '60%')}{box('16px')}</div>)}
        </div>
      </div>
    </>
  )
}
