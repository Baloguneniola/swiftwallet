import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "./api";

function VerifyEmail() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [code, setCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);
    setError("");
    setMessage("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setError(
        "Please enter the 6-digit verification code."
      );
      return;
    }

    const email = localStorage.getItem(
      "pendingUserEmail"
    );

    if (!email) {
      setError(
        "We couldn't find your signup information. Please start again."
      );
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: verificationCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to verify your email."
        );
        return;
      }

      navigate("/complete-profile");
    } catch (error) {
      console.error(
        "Email verification error:",
        error
      );

      setError(
        "Unable to connect to Swift Wallet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem(
      "pendingUserEmail"
    );

    if (!email) {
      setError(
        "We couldn't find your signup information. Please start again."
      );
      return;
    }

    setResending(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/resend-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to resend verification code."
        );
        return;
      }

      setCode([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      inputRefs.current[0]?.focus();

      setMessage(
        "A new verification code has been sent to your email."
      );
    } catch (error) {
      console.error(
        "Resend code error:",
        error
      );

      setError(
        "Unable to connect to Swift Wallet. Please try again."
      );
    } finally {
      setResending(false);
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
          width: "420px",
          textAlign: "center",
          border: "1px solid #2a2a2a",
          boxShadow:
            "0 0 20px rgba(34,197,94,0.15)",
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
          Enter the 6-digit verification code we sent
          to your email address.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              style={codeInputStyle}
            />
          ))}
        </div>

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        {message && (
          <p
            style={{
              color: "#22c55e",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading || resending}
          style={{
            ...buttonStyle,
            opacity:
              loading || resending ? 0.7 : 1,
            cursor:
              loading || resending
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading
            ? "Verifying..."
            : "Verify Email"}
        </button>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Didn't receive a code?{" "}

          <span
            onClick={
              resending
                ? undefined
                : handleResend
            }
            style={{
              color: "#22c55e",
              cursor: resending
                ? "not-allowed"
                : "pointer",
              fontWeight: "600",
              opacity: resending ? 0.7 : 1,
            }}
          >
            {resending
              ? "Sending..."
              : "Resend Code"}
          </span>
        </p>
      </div>
    </div>
  );
}

const codeInputStyle = {
  width: "45px",
  height: "55px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "22px",
  textAlign: "center",
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
  cursor: "pointer",
  fontSize: "15px",
};

export default VerifyEmail;