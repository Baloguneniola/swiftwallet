import React from 'react';

const steps = [
  { label: 'Enter details', sub: 'Recipient & amount', icon: '📝' },
  { label: 'Confirm', sub: 'Review & authorize', icon: '✅' },
  { label: 'Sent', sub: 'Processed instantly', icon: '🚀' },
  { label: 'Received', sub: 'Funds available', icon: '🏦' },
];

const MoneyInSteps = () => {
  return (
    <section style={{
      padding: '60px 40px',
      backgroundColor: '#111',
    }}>
      <p style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
        HOW A TRANSFER WORKS
      </p>
      <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', color: '#fff' }}>
        Money in four steps
      </h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '40px' }}>
        Here is exactly what happens from the moment you tap send.
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
      }}>
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div style={{
              flex: 1,
              backgroundColor: '#1a1a1a',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              border: '1px solid #2a2a2a',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{step.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>{step.label}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>{step.sub}</div>
            </div>
            {index < steps.length - 1 && (
              <div style={{ color: '#22c55e', fontSize: '20px', flexShrink: 0 }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default MoneyInSteps;