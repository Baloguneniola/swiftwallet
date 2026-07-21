import React from "react";
import { Link } from "react-router-dom";

function PayBills() {
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
            color: "#22c55e",
            fontSize: "38px",
            marginBottom: "10px",
          }}
        >
          Pay Bills
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "35px",
          }}
        >
          Pay your everyday bills quickly and securely.
        </p>

        {/* Bill Type */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              color: "#22c55e",
              marginBottom: "20px",
            }}
          >
            Select Bill Type
          </h3>

          <select style={inputStyle}>
            <option>Choose a bill</option>
            <option>⚡ Electricity</option>
            <option>💧 Water</option>
            <option>📶 Wifi</option>
            <option>📺 Cable TV</option>
            <option>📱 Airtime</option>
            <option>📡 Mobile Data</option>
          </select>

          <input
            type="text"
            placeholder="Provider (e.g. IKEDC, MTN, DSTV)"
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Customer / Meter / Phone Number"
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Amount (₦)"
            style={inputStyle}
          />

          <button style={buttonStyle}>
            Pay Bill
          </button>
        </div>

        {/* Popular Services */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              color: "#22c55e",
              marginBottom: "20px",
            }}
          >
            Popular Services
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "15px",
            }}
          >
            {[
              "⚡ Electricity",
              "📺 DSTV",
              "📶 Wifi",
              "📱 Airtime",
            ].map((service) => (
              <div
                key={service}
                style={{
                  backgroundColor: "#111",
                  border: "1px solid #333",
                  borderRadius: "10px",
                  padding: "18px",
                  textAlign: "center",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bill Payments */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
          }}
        >
          <h3
            style={{
              color: "#22c55e",
              marginBottom: "20px",
            }}
          >
            Recent Payments
          </h3>

          {[
            {
              service: "Electricity",
              amount: "- ₦12,000",
              date: "Today",
            },
            {
              service: "DSTV",
              amount: "- ₦8,500",
              date: "Yesterday",
            },
            {
              service: "MTN Airtime",
              amount: "- ₦2,000",
              date: "Last Week",
            },
          ].map((payment) => (
            <div
              key={payment.service + payment.date}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #2a2a2a",
                padding: "15px 0",
              }}
            >
              <div>
                <div>{payment.service}</div>

                <small style={{ color: "#888" }}>
                  {payment.date}
                </small>
              </div>

              <span
                style={{
                  color: "#ff5f5f",
                  fontWeight: "700",
                }}
              >
                {payment.amount}
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

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  backgroundColor: "#111",
  border: "1px solid #333",
  color: "#fff",
  borderRadius: "8px",
  outline: "none",
  fontSize: "15px",
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

export default PayBills;