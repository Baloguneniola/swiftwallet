import React, { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function AddMoneyPin() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const amount =
    location.state?.amount;

  const handleContinue = async () => {
    /*
      GET CURRENT USER
    */
    const currentUser =
      JSON.parse(
        localStorage.getItem(
          "swiftWalletCurrentUser"
        )
      );

    /*
      GET JWT TOKEN
    */
    const token =
      localStorage.getItem(
        "swiftWalletToken"
      );

    if (!currentUser) {
      alert("User session not found.");
      return;
    }

    if (!token) {
      alert(
        "Your login session has expired. Please log in again."
      );
      return;
    }

    if (!amount) {
      alert("Amount information missing.");
      return;
    }

    if (pin.length !== 4) {
      alert("Please enter your 4-digit PIN.");
      return;
    }

    const newAmount =
      Number(amount);

    if (
      !Number.isFinite(newAmount) ||
      newAmount <= 0
    ) {
      alert("Invalid amount.");
      return;
    }

    setLoading(true);

    try {
      /*
        STEP 1:
        VERIFY TRANSACTION PIN
      */
      const pinResponse =
        await fetch(
          "http://localhost:5000/api/auth/verify-pin",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              pin,
            }),
          }
        );

      const pinData =
        await pinResponse.json();

      if (!pinResponse.ok) {
        alert(
          pinData.message ||
            "Incorrect PIN."
        );

        return;
      }

      /*
        STEP 2:
        ADD MONEY THROUGH BACKEND
      */
      const addMoneyResponse =
        await fetch(
          "http://localhost:5000/api/add-money",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              amount:
                newAmount,
            }),
          }
        );

      const addMoneyResult =
        await addMoneyResponse.json();

      if (!addMoneyResponse.ok) {
        alert(
          addMoneyResult.message ||
            "Unable to add money."
        );

        return;
      }

      /*
        STEP 3:
        UPDATE LOCAL SESSION
        USING THE BACKEND RESPONSE

        The backend remains the source
        of truth. localStorage is only
        updated so the UI immediately
        shows the new balance.
      */
      const updatedUser = {
        ...currentUser,

        balance:
          addMoneyResult.newBalance,

        account: {
          ...(currentUser.account || {}),

          balance:
            addMoneyResult
              .newBalance
              .toString(),
        },

        transactions: [
          addMoneyResult.transaction,

          ...(currentUser.transactions || []),
        ],
      };

      localStorage.setItem(
        "swiftWalletCurrentUser",
        JSON.stringify(updatedUser)
      );

      /*
        STEP 4:
        GO TO SUCCESS PAGE
      */
      navigate(
        "/add-money-success",
        {
          state: {
            amount:
              newAmount,

            transaction:
              addMoneyResult.transaction,

            newBalance:
              addMoneyResult.newBalance,
          },
        }
      );

      window.scrollTo(0, 0);

    } catch (error) {
      console.error(
        "Add money error:",
        error
      );

      alert(
        "Unable to connect to the Swift Wallet server."
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
        to="/dashboard"
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
            color: "#000",
            fontWeight: "bold",
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
          width: "420px",
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          border: "1px solid #2a2a2a",
          textAlign: "center",
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
            marginBottom: "25px",
          }}
        >
          Enter your PIN to complete adding money.
        </p>

        <div
          style={{
            backgroundColor: "#111",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >

          <p
            style={{
              color: "#888",
              margin: 0,
            }}
          >
            Amount
          </p>

          <h2
            style={{
              color: "#22c55e",
              margin: 0,
            }}
          >
            ₦
            {Number(amount || 0)
              .toLocaleString("en-NG")}
          </h2>

        </div>

        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => {
            const value =
              e.target.value.replace(
                /\D/g,
                ""
              );

            setPin(value);
          }}
          style={inputStyle}
          disabled={loading}
        />

        <button
          onClick={handleContinue}
          style={{
            ...buttonStyle,

            opacity:
              loading ? 0.7 : 1,

            cursor:
              loading
                ? "not-allowed"
                : "pointer",
          }}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Confirm Payment"}
        </button>

        <Link
          to="/add-money"
          style={{
            textDecoration: "none",
          }}
        >

          <button
            style={{
              ...secondaryButton,
              marginTop: "15px",
            }}
            disabled={loading}
          >
            ← Back to Add Money
          </button>

        </Link>

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
  borderRadius: "8px",
  color: "#fff",
  fontSize: "15px",
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
};

const secondaryButton = {
  width: "100%",
  padding: "14px",
  backgroundColor: "transparent",
  color: "#22c55e",
  border: "1px solid #22c55e",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
};

export default AddMoneyPin;