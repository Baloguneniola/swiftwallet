import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0d0d0d',
      padding: '24px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #1a1a1a',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          backgroundColor: '#22c55e',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '11px',
          color: '#000',
        }}>SW</div>
        <span style={{ fontWeight: '700', fontSize: '15px', color: '#fff' }}>Swift Wallet</span>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {['Privacy', 'Terms', 'Support', 'Careers'].map((link) => (
          <a key={link} href="#" style={{
            color: '#888',
            textDecoration: 'none',
            fontSize: '13px',
          }}>{link}</a>
        ))}
      </div>

      <div style={{ color: '#555', fontSize: '12px' }}>
        © 2026 Swift Wallet Inc.
      </div>
    </footer>
  );
};

export default Footer;