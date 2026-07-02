import React from 'react';

const steps = [
  {
    number: '01',
    icon: '👤',
    title: 'Create your account',
    desc: 'Sign up in seconds. Verify once with your details and you are ready to go.',
  },
  {
    number: '02',
    icon: '💳',
    title: 'Fund your wallet',
    desc: 'Add money from your bank account or card. Funds reflect instantly.',
  },
  {
    number: '03',
    icon: '📤',
    title: 'Send anywhere',
    desc: 'Enter a phone number or account. Money arrives in seconds, not days.',
  },
];

const HowItWorks = () => {
  return (
    <section style={{
      padding: '60px 40px',
      backgroundColor: '#0d0d0d',
    }}>
      <p style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
        HOW IT WORKS
      </p>
      <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', color: '#fff' }}>
        Three steps to send
      </h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '40px' }}>
        From signup to your first transfer — it takes under two minutes.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        {steps.map((step) => (
          <div key={step.number} style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid #2a2a2a',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>{step.icon}</div>
            <div style={{ color: '#22c55e', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>{step.number}</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{step.title}</h3>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;