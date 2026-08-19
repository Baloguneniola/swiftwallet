import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = signupData;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please complete all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to create account");
        return;
      }

      localStorage.setItem(
        "pendingUserEmail",
        data.user.email
      );

      navigate("/verify-email");
    } catch (error) {
      console.error("Signup error:", error);

      alert(
        "Unable to connect to Swift Wallet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: "#fff",
      }}
    >
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

      <div
        style={{
          width: "380px",
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 0 20px rgba(34,197,94,0.15)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "30px",
          }}
        >
          Join Swift Wallet and start sending money instantly.
        </p>

        <input
          type="text"
          name="swiftwallet-signup-name"
          placeholder="Full Name"
          style={inputStyle}
          value={signupData.name}
          autoComplete="off"
          onChange={(e) =>
            setSignupData({
              ...signupData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          name="swiftwallet-signup-email"
          placeholder="Email Address"
          style={inputStyle}
          value={signupData.email}
          autoComplete="off"
          onChange={(e) =>
            setSignupData({
              ...signupData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          name="swiftwallet-signup-password"
          placeholder="Password"
          style={inputStyle}
          value={signupData.password}
          autoComplete="new-password"
          onChange={(e) =>
            setSignupData({
              ...signupData,
              password: e.target.value,
            })
          }
        />

        <input
          type="password"
          name="swiftwallet-signup-confirm-password"
          placeholder="Confirm Password"
          style={inputStyle}
          value={signupData.confirmPassword}
          autoComplete="new-password"
          onChange={(e) =>
            setSignupData({
              ...signupData,
              confirmPassword: e.target.value,
            })
          }
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          {loading
            ? "Creating Account..."
            : "Continue"}
        </button>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}

          <Link
            to="/login"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Log In
          </Link>
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
  fontSize: "15px",
  cursor: "pointer",
};

export default Signup;