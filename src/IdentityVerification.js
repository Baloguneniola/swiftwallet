import React from "react";
import { Link } from "react-router-dom";

function IdentityVerification() {
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
        to="/"
        style={{
          position: "absolute",
          top: "35px",
          left: "50px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#22c55e",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "16px",
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

      {/* Card */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          width: "450px",
          textAlign: "center",
          border: "1px solid #2a2a2a",
          boxShadow: "0 0 20px rgba(34,197,94,0.15)",
        }}
      >
        <p
          style={{
            color: "#22c55e",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Step 4 of 5
        </p>

        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#333",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "100%",
              backgroundColor: "#22c55e",
            }}
          />
        </div>

        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          Identity Verification
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            fontSize: "15px",
            lineHeight: "1.5",
          }}
        >
          Verify your identity to unlock all Swift Wallet features.
        </p>

        <input
          type="text"
          placeholder="Nationality"
          style={inputStyle}
        />

        <select
          style={inputStyle}
          defaultValue=""
        >
          <option value="" disabled>
            Select ID Type
          </option>
          <option>National ID</option>
          <option>Passport</option>
          <option>Driver's Licence</option>
        </select>

        <input
          type="text"
          placeholder="ID Number"
          style={inputStyle}
        />

        {/* Hidden File Input */}
        <input
          type="file"
          id="upload-id"
          accept="image/*,.pdf"
          style={{ display: "none" }}
        />

        {/* Upload Button */}
        <label
          htmlFor="upload-id"
          style={uploadButton}
        >
          Upload Government ID
        </label>

        <Link
          to="/create-pin"
          style={{ textDecoration: "none" }}
        >
          <button style={buttonStyle}>
            Continue
          </button>
        </Link>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Your documents are securely encrypted and protected.
        </p>
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
  boxSizing: "border-box",
  fontSize: "15px",
};

const uploadButton = {
  display: "block",
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  backgroundColor: "transparent",
  color: "#22c55e",
  border: "2px dashed #22c55e",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
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
  cursor: "pointer",
  fontSize: "15px",
};

export default IdentityVerification;