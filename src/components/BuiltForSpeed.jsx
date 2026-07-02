import React from 'react';

const features = [
  {
    icon: '⚡',
    title: 'Instant money transfer',
    desc: 'Send and receive money instantly in real time. Fast, simple, always at your fingertips.',
  },
  {
    icon: '🔒',
    title: 'Bank-grade security',
    desc: 'Two-factor encryption, biometric login, and real-time fraud alerts on every transaction.',
  },
  {
    icon: '📋',
    title: 'Swift bill settlement',
    desc: 'Pay airtime and pay all your bills quickly and seamlessly with just a few clicks.',
  },
  {
    icon: '📊',
    title: 'Spend analytics',
    desc: 'Auto-categorized spending reports so you always know where your money goes.',
  },
];

const BuiltForSpeed = () => {
  return (
    <section style={{
      padding: '60px 40px',
      backgroundColor: '#111',
    }}>
      <p style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>
        EVERYTHING YOU NEED
      </p>
      <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px', color: '#fff' }}>
        Built for speed and trust
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
      }}>
        {features.map((f) => (
          <div key={f.title} style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #2a2a2a',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuiltForSpeed;