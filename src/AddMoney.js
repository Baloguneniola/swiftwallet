import React from "react";
import { Link } from "react-router-dom";

function AddMoney() {
  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 50px",
          borderBottom: "1px solid #222",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#22c55e",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            SW
          </div>

          <span
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Swift Wallet
          </span>
        </Link>
      </div>

      {/* Main */}
      <div
        style={{
          maxWidth: "700px",
          margin: "50px auto",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            marginBottom: "10px",
            color: "#22c55e",
          }}
        >
          Add Money
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "35px",
          }}
        >
          Top up your Swift Wallet using any of the methods below.
        </p>

        {/* Current Balance */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "30px",
          }}
        >
          <p style={{ color: "#999", marginBottom: "10px" }}>
            Current Balance
          </p>

          <h2
            style={{
              color: "#22c55e",
              fontSize: "40px",
              margin: 0,
            }}
          >
            ₦200,350.00
          </h2>
        </div>

        {/* Funding Options */}
        <div
          style={{
            display: "grid",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <div style={cardStyle}>
            <h3 style={titleStyle}>🏦 Bank Transfer</h3>

            <p style={textStyle}>
              Transfer money directly into your Swift Wallet using the account
              details below.
            </p>

            <div style={detailStyle}>
              <strong>Bank:</strong> Swift Digital Bank
            </div>

            <div style={detailStyle}>
              <strong>Account Name:</strong> Abdul Khalifa
            </div>

            <div style={detailStyle}>
              <strong>Account Number:</strong> 0123456789
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={titleStyle}>💳 Debit Card</h3>

            <p style={textStyle}>
              Instantly add funds using your Visa or Mastercard.
            </p>

            <input
              type="number"
              placeholder="Amount (₦)"
              style={inputStyle}
            />

            <button style={buttonStyle}>
              Add Money with Card
            </button>
          </div>
        </div>

        {/* Recent Funding */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "25px",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Recent Top Ups
          </h3>

          {[
            {
              amount: "+ ₦10,000",
              method: "Debit Card",
              date: "Today",
            },
            {
              amount: "+ ₦25,000",
              method: "Bank Transfer",
              date: "Yesterday",
            },
            {
              amount: "+ ₦5,000",
              method: "Debit Card",
              date: "Last Week",
            },
          ].map((item) => (
            <div
              key={item.amount + item.date}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 0",
                borderBottom: "1px solid #2a2a2a",
              }}
            >
              <div>
                <div>{item.method}</div>

                <small style={{ color: "#888" }}>
                  {item.date}
                </small>
              </div>

              <span
                style={{
                  color: "#22c55e",
                  fontWeight: "700",
                }}
              >
                {item.amount}
              </span>
            </div>
          ))}
        </div>

        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              ...buttonStyle,
              marginTop: "30px",
            }}
          >
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "15px",
  padding: "25px",
};

const titleStyle = {
  color: "#22c55e",
  marginBottom: "10px",
};

const textStyle = {
  color: "#999",
  marginBottom: "20px",
  lineHeight: "1.6",
};

const detailStyle = {
  marginBottom: "12px",
  color: "#fff",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "15px",
  cursor: "pointer",
};

export default AddMoney;