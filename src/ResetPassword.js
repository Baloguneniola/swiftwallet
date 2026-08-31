import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import API_URL from "./api";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email || !token) {
      setError(
        "This password reset link is invalid or incomplete. Please request a new password reset link."
      );
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Your password must be at least 8 characters long."
      );
      return;
    }

    if (!confirmPassword) {
      setError(
        "Please confirm your new password."
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
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            token,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to reset your password. Please try again."
        );

        return;
      }

      setMessage(
        data.message ||
          "Your password has been reset successfully. You can now log in."
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

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "20px",
        boxSizing: "border-box",
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

      {/* Reset Password Card */}

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
        {/* Security Icon */}

        <div
          style={{
            width: "60px",
            height: "60px",
            margin: "0 auto 20px",
            backgroundColor:
              "rgba(34,197,94,0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldCheck
            size={30}
            color="#22c55e"
          />
        </div>

        {/* Heading */}

        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            fontSize: "30px",
          }}
        >
          Reset Password
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            fontSize: "15px",
            lineHeight: "1.5",
          }}
        >
          Create a new password for your
          Swift Wallet account.
        </p>

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

        <form
          onSubmit={handleResetPassword}
        >
          {/* New Password */}

          <div
            style={{
              position: "relative",
              marginBottom: "18px",
            }}
          >
            <Lock
              size={19}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                color: "#777",
              }}
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="new-password"
              placeholder="New Password"
              value={newPassword}
              autoComplete="new-password"
              onChange={(e) => {
                setNewPassword(
                  e.target.value
                );
                setError("");
              }}
              style={{
                ...inputStyle,
                paddingLeft: "45px",
                paddingRight: "45px",
                marginBottom: "0",
              }}
              disabled={loading}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#777",
                cursor: "pointer",
                padding: "0",
              }}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          {/* Confirm Password */}

          <div
            style={{
              position: "relative",
              marginBottom: "20px",
            }}
          >
            <Lock
              size={19}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                color: "#777",
              }}
            />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirm-password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => {
                setConfirmPassword(
                  e.target.value
                );
                setError("");
              }}
              style={{
                ...inputStyle,
                paddingLeft: "45px",
                paddingRight: "45px",
                marginBottom: "0",
              }}
              disabled={loading}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#777",
                cursor: "pointer",
                padding: "0",
              }}
              disabled={loading}
            >
              {showConfirmPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          {/* Reset Button */}

          <button
            type="submit"
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
        </form>

        {/* Back to Login */}

        <p
          style={{
            color: "#888",
            marginTop: "18px",
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
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
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

export default ResetPassword;