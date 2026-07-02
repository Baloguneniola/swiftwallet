import React from 'react';

const StatusBar = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      padding: '12px 40px',
      backgroundColor: '#0d0d0d',
    }}>
      {['Secure', 'Instant', 'Global'].map((item) => (
        <span key={item} style={{
          backgroundColor: '#1a1a1a',
          color: '#22c55e',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '500',
          border: '1px solid #22c55e33',
        }}>{item}</span>
      ))}
    </div>
  );
};

export default StatusBar;