import React from 'react';
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section
      style={{
        backgroundColor: '#22c55e',
        padding: '60px 40px',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontSize: '40px',
          fontWeight: '800',
          color: '#000',
          marginBottom: '12px',
        }}
      >
        Start sending money today
      </h2>

      <p
        style={{
          color: '#065f46',
          fontSize: '16px',
          marginBottom: '32px',
        }}
      >
        Join 500,000+ people who trust Swift Wallet for every transfer.
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <Link
          to="/signup"
          style={{ textDecoration: 'none' }}
        >
          <button
            style={{
              backgroundColor: 'transparent',
              color: '#000',
              border: '2px solid #000',
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
            color: '#000',
            border: '2px solid #000',
            padding: '14px 28px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          Download the app
        </button>
      </div>
    </section>
  );
};

export default CTASection;