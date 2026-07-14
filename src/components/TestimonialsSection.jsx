import React from 'react';

const testimonials = [
  {
    stars: 5,
    text: 'Sending money back home has never been this smooth. Swift Wallet changed everything for me.',
    initials: 'AK',
    name: 'Aisha K.',
    location: 'Lagos, Nigeria',
  },
  {
    stars: 5,
    text: 'Instant transfers at real rates — I save so much compared to my old bank every single month.',
    initials: 'TM',
    name: 'Tunde M.',
    location: 'Accra, Ghana',
  },
  {
    stars: 5,
    text: 'Bill payments in two taps. The analytics feature alone makes this app worth every kobo.',
    initials: 'SR',
    name: 'Sara R.',
    location: 'London, UK',
  },
];

const Testimonials = () => {
  return (
    <section style={{
      padding: '60px 40px',
      backgroundColor: '#0d0d0d',
    }}>
      <p style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
        LOVED BY THOUSANDS
      </p>
      <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px', color: '#fff' }}>
        What our users say
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        {testimonials.map((t) => (
          <div key={t.name} style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #2a2a2a',
          }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {Array.from({ length: t.stars }).map((_, i) => (
                <span key={i} style={{ color: '#22c55e', fontSize: '14px' }}>★</span>
              ))}
            </div>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              {t.text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#22c55e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700',
                color: '#000',
              }}>{t.initials}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;