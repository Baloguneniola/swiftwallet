import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function EnterPin() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const transferData = location.state;

  const handleContinue = async () => {
    setError("");

    const token = localStorage.getItem(
      "swiftWalletToken"
    );

    /*
      CHECK LOGIN SESSION
    */
    if (!token) {
      setError(
        "Your login session has expired. Please log in again."
      );

      return;
    }

    /*
      CHECK TRANSFER DATA
    */
    if (!transferData) {
      setError(
        "Transfer information is missing."
      );

      return;
    }

    /*
      CHECK PIN
    */
    if (pin.length !== 4) {
      setError(
        "Please enter your 4-digit PIN."
      );

      return;
    }

    setLoading(true);

    try {
      /*
        STEP 1
        VERIFY TRANSACTION PIN
      */
      const pinResponse = await fetch(
        "http://localhost:5000/api/auth/verify-pin",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            pin,
          }),
        }
      );

      const pinData =
        await pinResponse.json();

      /*
        HANDLE INVALID / EXPIRED TOKEN
      */
      if (
        pinResponse.status === 401 ||
        pinResponse.status === 403
      ) {
        localStorage.removeItem(
          "swiftWalletToken"
        );

        localStorage.removeItem(
          "swiftWalletCurrentUser"
        );

        localStorage.removeItem(
          "swiftWalletUser"
        );

        setError(
          "Your login session has expired. Please log in again."
        );

        return;
      }

      /*
        HANDLE INCORRECT PIN
      */
      if (!pinResponse.ok) {
        setError(
          pinData.message ||
            "Incorrect PIN."
        );

        return;
      }

      /*
        STEP 2
        COMPLETE THE TRANSFER
      */
      const transferResponse =
        await fetch(
          "http://localhost:5000/api/transfers",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              recipientAccountNumber:
                transferData.accountNumber,

              amount:
                Number(
                  transferData.amount
                ),

              description:
                transferData.description ||
                "Transfer",
            }),
          }
        );

      const transferResult =
        await transferResponse.json();

      /*
        HANDLE INVALID / EXPIRED TOKEN
      */
      if (
        transferResponse.status === 401 ||
        transferResponse.status === 403
      ) {
        localStorage.removeItem(
          "swiftWalletToken"
        );

        localStorage.removeItem(
          "swiftWalletCurrentUser"
        );

        localStorage.removeItem(
          "swiftWalletUser"
        );

        setError(
          "Your login session has expired. Please log in again."
        );

        return;
      }

      /*
        HANDLE TRANSFER FAILURE
      */
      if (!transferResponse.ok) {
        setError(
          transferResult.message ||
            "Unable to complete transfer."
        );

        return;
      }

      /*
        TRANSFER SUCCESSFUL
      */
      navigate(
        "/transfer-success",
        {
          state: {
            transferData,

            transaction:
              transferResult.transaction,

            transfer:
              transferResult.transfer,

            recipient:
              transferResult.recipient,

            newBalance:
              transferResult.newBalance,
          },
        }
      );

      window.scrollTo(0, 0);

    } catch (error) {
      console.error(
        "Transfer error:",
        error
      );

      setError(
        "Unable to connect to the Swift Wallet server. Please try again."
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
      {/* LOGO */}
      <Link
        to="/confirm-transfer"
        state={transferData}
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

      {/* PIN CARD */}
      <div
        style={{
          width: "420px",
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          border: "1px solid #2a2a2a",
          textAlign: "center",
          boxShadow:
            "0 0 20px rgba(34,197,94,0.15)",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
          }}
        >
          Enter Transaction PIN
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "20px",
          }}
        >
          Enter your 4-digit PIN to complete the transfer.
        </p>

        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Enter PIN"
          value={pin}
          disabled={loading}
          autoComplete="off"
          onChange={(e) => {
            const value =
              e.target.value.replace(
                /\D/g,
                ""
              );

            setPin(value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleContinue();
            }
          }}
          style={inputStyle}
        />

        {error && (
          <div
            style={{
              backgroundColor:
                "rgba(239,68,68,0.1)",
              border:
                "1px solid #ef4444",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "20px",
              color: "#ef4444",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleContinue}
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
            ? "Processing..."
            : "Confirm Transfer"}
        </button>

        <Link
          to="/confirm-transfer"
          state={transferData}
          style={{
            textDecoration: "none",
          }}
        >
          <button
            disabled={loading}
            style={{
              ...secondaryButton,
              marginTop: "15px",
              opacity: loading ? 0.5 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            ← Back
          </button>
        </Link>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "10px",
  marginBottom: "20px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: "16px",
  outline: "none",
  textAlign: "center",
  letterSpacing: "6px",
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

const secondaryButton = {
  width: "100%",
  padding: "14px",
  backgroundColor: "transparent",
  color: "#22c55e",
  border: "1px solid #22c55e",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "15px",
  cursor: "pointer",
};

export default EnterPin;