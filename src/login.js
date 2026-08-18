import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (email.trim() === "") {
      setError("Please enter your email address.");
      return;
    }

    if (password.trim() === "") {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Invalid email or password."
        );
        return;
      }

      const user = data.user;

      const currentUser = {
        id: user.id,

        firstName:
          user.firstName || "",

        lastName:
          user.lastName || "",

        name:
          `${user.firstName || ""} ${user.lastName || ""}`.trim(),

        email:
          user.email || "",

        emailVerified:
          user.emailVerified || false,

        phoneNumber:
          user.phoneNumber || "",

        dateOfBirth:
          user.dateOfBirth || "",

        residentialAddress:
          user.residentialAddress || "",

        country:
          user.country || "",

        stateProvince:
          user.stateProvince || "",

        nationality:
          user.nationality || "",

        identityType:
          user.identityType || "",

        identityNumber:
          user.identityNumber || "",

        identityDocument:
          user.identityDocument || "",

        accountNumber:
          user.account?.accountNumber || "",

        balance:
          Number(user.account?.balance || 0),

        cardNumber:
          user.card?.cardNumber || "",

        expiryDate:
          user.card?.expiryDate || "",

        cardFrozen:
          user.card?.frozen || false,

        hasPin:
          user.hasPin || false,

        transactions:
          Array.isArray(user.transactions)
            ? user.transactions
            : [],

        payments: [],

        topUps: [],
      };

      localStorage.setItem(
        "swiftWalletCurrentUser",
        JSON.stringify(currentUser)
      );

      localStorage.setItem(
        "swiftWalletUser",
        user.firstName || "User"
      );

      navigate("/dashboard");

      window.scrollTo(0, 0);
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
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
      }}
    >
      <Link
        to="/"
        onClick={() =>
          window.scrollTo(0, 0)
        }
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

      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          width: "380px",
          textAlign: "center",
          border: "1px solid #2a2a2a",
          boxShadow:
            "0 0 20px rgba(34,197,94,0.15)",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          Welcome back
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            fontSize: "15px",
          }}
        >
          Sign in to access your Swift Wallet.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          style={inputStyle}
          value={email}
          autoComplete="email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          value={password}
          autoComplete="current-password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "14px",
              marginBottom: "20px",
              lineHeight: "1.5",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogin}
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
            ? "Signing In..."
            : "Log In"}
        </button>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}

          <Link
            to="/signup"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Sign Up
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
  cursor: "pointer",
  fontSize: "15px",
};

export default Login;