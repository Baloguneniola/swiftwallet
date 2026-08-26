import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, CheckCircle } from "lucide-react";

function ChangePin() {
  const navigate = useNavigate();

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changePin = async () => {
    setMessage("");
    setSuccess(false);

    /*
      CHECK LOGIN TOKEN
    */
    const token =
      localStorage.getItem(
        "swiftWalletToken"
      );

    if (!token) {
      setMessage(
        "Your session has expired. Please log in again."
      );
      return;
    }

    /*
      CHECK CURRENT PIN
    */
    if (!/^\d{4}$/.test(oldPin)) {
      setMessage(
        "Current PIN must be exactly 4 digits."
      );
      return;
    }

    /*
      CHECK NEW PIN
    */
    if (!/^\d{4}$/.test(newPin)) {
      setMessage(
        "New PIN must be exactly 4 digits."
      );
      return;
    }

    /*
      CHECK CONFIRM PIN
    */
    if (newPin !== confirmPin) {
      setMessage(
        "New PINs do not match."
      );
      return;
    }

    /*
      SEND REQUEST TO BACKEND
    */
    try {
      setLoading(true);

      const response =
        await fetch(
          "http://localhost:5000/api/auth/change-pin",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              currentPin: oldPin,
              newPin,
              confirmPin,
            }),
          }
        );

      const data =
        await response.json();

      /*
        HANDLE ERROR
      */
      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to change PIN."
        );
      }

      /*
        SUCCESS
      */
      setSuccess(true);

      setMessage(
        "PIN changed successfully."
      );

      /*
        CLEAR INPUTS
      */
      setOldPin("");
      setNewPin("");
      setConfirmPin("");

      /*
        RETURN TO SETTINGS
      */
      setTimeout(() => {
        navigate("/settings");
        window.scrollTo(0, 0);
      }, 1500);

    } catch (error) {
      console.error(
        "Change PIN error:",
        error
      );

      setMessage(
        error.message ||
          "Something went wrong while changing your PIN."
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
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "420px",
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "16px",
          padding: "40px",
        }}
      >
        <Link
          to="/settings"
          style={{
            color: "#22c55e",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to Settings
        </Link>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <Lock
            size={45}
            color="#22c55e"
          />

          <h1
            style={{
              color: "#22c55e",
            }}
          >
            Change PIN
          </h1>

          <p
            style={{
              color: "#999",
            }}
          >
            Update your transaction PIN securely.
          </p>
        </div>

        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Current PIN"
          value={oldPin}
          onChange={(e) => {
            const value =
              e.target.value.replace(
                /\D/g,
                ""
              );

            setOldPin(value);
          }}
          style={inputStyle}
        />

        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="New PIN"
          value={newPin}
          onChange={(e) => {
            const value =
              e.target.value.replace(
                /\D/g,
                ""
              );

            setNewPin(value);
          }}
          style={inputStyle}
        />

        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Confirm New PIN"
          value={confirmPin}
          onChange={(e) => {
            const value =
              e.target.value.replace(
                /\D/g,
                ""
              );

            setConfirmPin(value);
          }}
          style={inputStyle}
        />

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor:
                success
                  ? "#123d22"
                  : "#3d1212",
              color:
                success
                  ? "#22c55e"
                  : "#ff5f5f",
              textAlign: "center",
            }}
          >
            {success && (
              <CheckCircle
                size={18}
                style={{
                  verticalAlign:
                    "middle",
                  marginRight: "5px",
                }}
              />
            )}

            {message}
          </div>
        )}

        <button
          onClick={changePin}
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading
              ? 0.6
              : 1,
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          {loading
            ? "Updating PIN..."
            : "Update PIN"}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  backgroundColor: "#111",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "8px",
  boxSizing: "border-box",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  marginTop: "25px",
  padding: "14px",
  backgroundColor: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
};

export default ChangePin;