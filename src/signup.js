import React from "react";

function Signup() {
  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          width: "380px",
          textAlign: "center",
          border: "1px solid #2a2a2a",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            fontSize: "15px",
          }}
        >
          Join Swift Wallet and start sending money instantly.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email Address"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          style={inputStyle}
        />

        <button style={buttonStyle}>Create Account</button>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <span
            style={{
              color: "#22c55e",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Log In
          </span>
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

export default Signup;