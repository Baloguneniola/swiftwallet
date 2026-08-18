import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreatePin() {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const finishSetup = async () => {
    setError("");

    if (pin.length !== 4 || confirmPin.length !== 4) {
      setError("PIN must be 4 digits.");
      return;
    }

    if (pin !== confirmPin) {
      setError("PINs do not match.");
      return;
    }

    const email = localStorage.getItem("pendingUserEmail");

    if (!email) {
      setError(
        "We couldn't find your signup information. Please start again."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/create-pin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            pin,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to finish your account setup."
        );
        return;
      }

      localStorage.removeItem("pendingUserEmail");

      localStorage.setItem(
        "swiftWalletCurrentUser",
        JSON.stringify({
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          accountNumber: data.account.accountNumber,
          balance: Number(data.account.balance),
        })
      );

      navigate("/login");

      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Create PIN error:", error);

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
        color: "#fff",
      }}
    >
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
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          width: "450px",
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
            marginBottom: "20px",
          }}
        >
          Step 5 of 5
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
              width: "100%",
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
          Create Your PIN
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            lineHeight: "1.5",
          }}
        >
          Create a secure 4-digit PIN to authorise transfers and payments.
        </p>

        <input
          type="password"
          inputMode="numeric"
          autoComplete="new-password"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) =>
            setPin(
              e.target.value.replace(/\D/g, "")
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          inputMode="numeric"
          autoComplete="new-password"
          maxLength="4"
          placeholder="Confirm PIN"
          value={confirmPin}
          onChange={(e) =>
            setConfirmPin(
              e.target.value.replace(/\D/g, "")
            )
          }
          style={inputStyle}
        />

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

        <button
          onClick={finishSetup}
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
            ? "Finishing Setup..."
            : "Finish Setup"}
        </button>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Your PIN is securely encrypted and never stored as plain text.
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

export default CreatePin;