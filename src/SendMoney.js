import React from "react";
import { Link } from "react-router-dom";

function SendMoney() {
  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Swift Wallet Logo */}
      <Link
        to="/dashboard"
        style={{
          position: "absolute",
          top: "35px",
          left: "50px",
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
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Swift Wallet
        </span>
      </Link>

      {/* Card */}
      <div
        style={{
          width: "450px",
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          border: "1px solid #2a2a2a",
          boxShadow: "0 0 20px rgba(34,197,94,0.15)",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Send Money
        </h1>

        <p
          style={{
            color: "#aaa",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Transfer money quickly and securely.
        </p>

        <input
          type="text"
          placeholder="Recipient Name"
          style={inputStyle}
        />

        <select style={inputStyle}>
          <option>Select Bank</option>
          <option>Ecobank</option>
          <option>Access Bank</option>
          <option>GTBank</option>
          <option>First Bank</option>
          <option>UBA</option>
          <option>Zenith Bank</option>
          <option>Kuda</option>
          <option>Opay</option>
        </select>

        <input
          type="text"
          placeholder="Account Number"
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Amount (₦)"
          style={inputStyle}
        />

        <textarea
          placeholder="Description (Optional)"
          style={textAreaStyle}
        />

        <button style={buttonStyle}>
          Continue
        </button>

        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
          }}
        >
          <button style={secondaryButton}>
            Back to Dashboard
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
  borderRadius: "8px",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const textAreaStyle = {
  width: "100%",
  height: "90px",
  padding: "14px",
  marginBottom: "20px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  resize: "none",
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
  marginBottom: "15px",
};

const secondaryButton = {
  width: "100%",
  padding: "14px",
  backgroundColor: "transparent",
  color: "#22c55e",
  border: "1px solid #22c55e",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "15px",
  cursor: "pointer",
};

export default SendMoney;