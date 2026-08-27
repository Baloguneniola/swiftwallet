import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = async () => {
    setError("");
    setMessage("");

    if (email.trim() === "") {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to send verification code."
        );

        return;
      }

      setMessage(
        data.message ||
          "A password reset code has been sent to your email address."
      );

      setStep(2);
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      setError(
        "Unable to connect to Swift Wallet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (code.trim() === "") {
      setError("Please enter the verification code.");
      return;
    }

    if (!/^\d{6}$/.test(code.trim())) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (newPassword.trim() === "") {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Your password must be at least 8 characters long."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            code: code.trim(),
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to reset your password."
        );

        return;
      }

      setMessage(
        data.message ||
          "Your password has been reset successfully."
      );

      setTimeout(() => {
        navigate("/login");
        window.scrollTo(0, 0);
      }, 2000);
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setError(
        "Unable to connect to Swift Wallet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUseDifferentEmail = () => {
    setStep(1);
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setMessage("");
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
      {/* Swift Wallet Logo */}

      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
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

      {/* Forgot Password Card */}

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
        {/* Heading */}

        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          {step === 1
            ? "Forgot Password"
            : "Reset Password"}
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            fontSize: "15px",
            lineHeight: "1.5",
          }}
        >
          {step === 1
            ? "Enter your email address and we'll send you a password reset code."
            : "Enter the verification code and create a new password."}
        </p>

        {/* Success Message */}

        {message && (
          <p
            style={{
              color: "#22c55e",
              fontSize: "14px",
              marginBottom: "20px",
              lineHeight: "1.5",
            }}
          >
            {message}
          </p>
        )}

        {/* Error Message */}

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

        {/* STEP 1 - EMAIL */}

        {step === 1 && (
          <>
            <input
              type="email"
              name="swiftwallet-forgot-password-email"
              placeholder="Email Address"
              style={inputStyle}
              value={email}
              autoComplete="off"
              onChange={(e) =>
                setEmail(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendCode();
                }
              }}
            />

            <button
              type="button"
              onClick={handleSendCode}
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
                ? "Sending Code..."
                : "Send Verification Code"}
            </button>
          </>
        )}

        {/* STEP 2 - CODE + NEW PASSWORD */}

        {step === 2 && (
          <>
            <input
              type="text"
              name="swiftwallet-reset-code"
              placeholder="Verification Code"
              style={{
                ...inputStyle,
                textAlign: "center",
                letterSpacing: "4px",
              }}
              value={code}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              onChange={(e) => {
                const value =
                  e.target.value.replace(/\D/g, "");

                setCode(value);
              }}
            />

            <input
              type="password"
              name="swiftwallet-new-password"
              placeholder="New Password"
              style={inputStyle}
              value={newPassword}
              autoComplete="new-password"
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <input
              type="password"
              name="swiftwallet-confirm-password"
              placeholder="Confirm New Password"
              style={inputStyle}
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleResetPassword();
                }
              }}
            />

            <button
              type="button"
              onClick={handleResetPassword}
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
                ? "Resetting Password..."
                : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={handleUseDifferentEmail}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "12px",
                backgroundColor: "transparent",
                color: "#888",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Use a different email
            </button>
          </>
        )}

        {/* Back to Login */}

        <p
          style={{
            color: "#888",
            marginTop: "14px",
            marginBottom: "0",
            fontSize: "14px",
          }}
        >
          Remember your password?{" "}

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

        {/* Sign Up */}

        <p
          style={{
            color: "#888",
            marginTop: "12px",
            marginBottom: "0",
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

export default ForgotPassword;