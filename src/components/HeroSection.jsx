import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '60px 40px',
        backgroundColor: '#0d0d0d',
        gap: '40px',
      }}
    >
      {/* Left Content */}
      <div style={{ flex: 1, maxWidth: '500px' }}>
        <h1
          style={{
            fontSize: '52px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '20px',
            color: '#fff',
          }}
        >
          Send money
          <br />
          <span style={{ color: '#22c55e' }}>instantly.</span>
          <br />
          Securely.
        </h1>

        <p
          style={{
            color: '#aaa',
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '32px',
            maxWidth: '380px',
          }}
        >
          Ready to change the way you move money? Swift Wallet lets you send,
          receive, and settle bills in seconds — right at your fingertips.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button
              style={{
                backgroundColor: '#22c55e',
                color: '#000',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              Open an account
            </button>
          </Link>

          <button
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: '1px solid #444',
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { value: '$2B+', label: 'Transferred' },
            { value: '180+', label: 'Countries' },
            { value: '500k+', label: 'Active Users' },
            { value: '4.9', label: 'App rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#fff',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#888',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Phone Mockup */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '32px',
            padding: '24px',
            width: '260px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid #2a2a2a',
            transform: 'translateY(-60px)',
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: '#888', fontSize: '12px' }}>
              Welcome Back
            </div>
            <div
              style={{
                color: '#aaa',
                fontSize: '11px',
                marginTop: '4px',
              }}
            >
              someone@gmail.com
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: '#888', fontSize: '11px' }}>Balance</div>
            <div
              style={{
                color: '#22c55e',
                fontSize: '28px',
                fontWeight: '800',
              }}
            >
              ₦42,500.00
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {['Transfer', 'Pay Bills', 'History'].map((action) => (
              <div
                key={action}
                style={{
                  backgroundColor: '#252525',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: '#ccc',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#22c55e' }}>●</span> {action}
              </div>
            ))}
          </div>

          <Link
            to="/login"
            style={{
              textDecoration: 'none',
            }}
          >
            <button
              style={{
                marginTop: '16px',
                width: '100%',
                backgroundColor: '#22c55e',
                color: '#000',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;