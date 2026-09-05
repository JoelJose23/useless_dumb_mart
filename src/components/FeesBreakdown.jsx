const fees = [
  { label: 'Existential handling fee', amount: 199 },
  { label: 'Because we can fee', amount: 349 },
  { label: 'Convenience fee for inconveniencing you', amount: 149 },
  { label: 'Mandatory optional insurance', amount: 599 },
  { label: 'Tax on regret', amount: 99 },
]

function FeesBreakdown({ subtotal }) {
  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0)
  const total = subtotal + totalFees

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto 140px',
        padding: '0 24px',
      }}
    >
      <div
        style={{
          background: '#fff',
          border: '1px dashed #ccc',
          borderRadius: 14,
          padding: 24,
        }}
      >
        <h3 style={{ margin: '0 0 14px', fontSize: 16 }}>
          Fee Breakdown (non-negotiable)
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: '#666', fontSize: 14 }}>
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>

        {fees.map((fee) => (
          <div
            key={fee.label}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: '#666', fontSize: 14 }}
          >
            <span>{fee.label}</span>
            <span>₹{fee.amount.toLocaleString()}</span>
          </div>
        ))}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 12,
            paddingTop: 12,
            borderTop: '1px solid #eee',
            fontWeight: 800,
            fontSize: 17,
          }}
        >
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default FeesBreakdown
