import React from "react";
import { Link } from "react-router-dom";

function VerifyEmail() {
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
          width: "420px",
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
          Step 2 of 5
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
              width: "40%",
              height: "100%",
              backgroundColor: "#22c55e",
            }}
          ></div>
        </div>

        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          Verify Your Email
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            fontSize: "15px",
            lineHeight: "1.5",
          }}
        >
          Enter the 6-digit verification code we sent to your email address.
        </p>

        {/* Verification Boxes */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              style={codeInputStyle}
            />
          ))}
        </div>

        <Link to="/complete-profile">
          <button style={buttonStyle}>
            Verify Email
          </button>
        </Link>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Didn't receive a code?{" "}
          <span
            style={{
              color: "#22c55e",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Resend Code
          </span>
        </p>
      </div>
    </div>
  );
}

const codeInputStyle = {
  width: "50px",
  height: "55px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "22px",
  textAlign: "center",
  outline: "none",
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

export default VerifyEmail;