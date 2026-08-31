import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import API_URL from "./api";

function PayBillsPin() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedBill,
    provider,
    accountNumber,
    amount,
  } = location.state || {};

  const handleContinue =
    async () => {
      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "swiftWalletCurrentUser"
          )
        );

      const token =
        localStorage.getItem(
          "swiftWalletToken"
        );

      if (!currentUser) {
        alert(
          "User session not found."
        );
        return;
      }

      if (!token) {
        alert(
          "Your login session has expired. Please log in again."
        );

        navigate("/login");

        return;
      }

      if (
        !selectedBill ||
        !provider ||
        !accountNumber ||
        !amount
      ) {
        alert(
          "Payment information is missing."
        );
        return;
      }

      if (pin.length !== 4) {
        alert(
          "Please enter your 4-digit PIN."
        );
        return;
      }

      const billAmount =
        Number(amount);

      if (
        !Number.isFinite(
          billAmount
        ) ||
        billAmount <= 0
      ) {
        alert(
          "Invalid payment amount."
        );
        return;
      }

      setLoading(true);

      try {
        /*
          STEP 1
          VERIFY PIN
        */
        const pinResponse =
          await fetch(
            `${API_URL}/api/auth/verify-pin`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              /*
                USER ID IS NOT SENT.
                JWT IDENTIFIES USER.
              */
              body: JSON.stringify({
                pin,
              }),
            }
          );

        const pinData =
          await pinResponse.json();

        if (
          pinResponse.status ===
            401 ||
          pinResponse.status ===
            403
        ) {
          if (
            pinResponse.status ===
            403
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

            navigate("/login");

            return;
          }

          alert(
            pinData.message ||
              "Incorrect PIN."
          );

          return;
        }

        if (!pinResponse.ok) {
          alert(
            pinData.message ||
              "Unable to verify PIN."
          );

          return;
        }

        /*
          STEP 2
          PROCESS BILL PAYMENT
        */
        const paymentResponse =
          await fetch(
            `${API_URL}/api/pay-bills`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                selectedBill,
                provider,
                accountNumber,
                amount:
                  billAmount,
              }),
            }
          );

        const paymentResult =
          await paymentResponse.json();

        if (
          paymentResponse.status ===
            401 ||
          paymentResponse.status ===
            403
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

          navigate("/login");

          return;
        }

        if (!paymentResponse.ok) {
          alert(
            paymentResult.message ||
              "Unable to process bill payment."
          );

          return;
        }

        /*
          STEP 3
          UPDATE LOCAL SESSION
        */
        const updatedUser = {
          ...currentUser,

          balance:
            paymentResult.newBalance,

          account: {
            ...(currentUser.account ||
              {}),

            balance:
              paymentResult
                .newBalance
                .toString(),
          },

          transactions: [
            paymentResult.transaction,

            ...(currentUser.transactions ||
              []),
          ],
        };

        localStorage.setItem(
          "swiftWalletCurrentUser",
          JSON.stringify(
            updatedUser
          )
        );

        /*
          STEP 4
          GO TO SUCCESS PAGE
        */
        navigate(
          "/pay-bill-success",
          {
            state: {
              transactionId:
                paymentResult
                  .transaction
                  .id,

              selectedBill,

              provider,

              accountNumber,

              amount:
                billAmount,

              transaction:
                paymentResult
                  .transaction,

              newBalance:
                paymentResult
                  .newBalance,
            },
          }
        );

        window.scrollTo(
          0,
          0
        );

      } catch (error) {
        console.error(
          "Pay bill error:",
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
        color: "#fff",
      }}
    >
      <Link
        to="/pay-bills"
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
          }}
        >
          Enter Transaction PIN
        </h1>

        <p
          style={{
            color: "#999",
          }}
        >
          Confirm your bill payment.
        </p>

        <div
          style={{
            backgroundColor: "#111",
            padding: "20px",
            borderRadius: "10px",
            margin: "25px 0",
          }}
        >
          <p
            style={{
              color: "#888",
            }}
          >
            {selectedBill}
          </p>

          <h2
            style={{
              color: "#22c55e",
            }}
          >
            ₦
            {Number(
              amount || 0
            ).toLocaleString(
              "en-NG"
            )}
          </h2>

          <small
            style={{
              color: "#999",
            }}
          >
            {provider}
          </small>
        </div>

        <input
          type="password"
          maxLength="4"
          inputMode="numeric"
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
          onClick={
            handleContinue
          }
          style={{
            ...buttonStyle,

            opacity:
              loading
                ? 0.7
                : 1,

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
          to="/pay-bills"
          style={{
            textDecoration:
              "none",
          }}
        >
          <button
            style={
              secondaryButton
            }
            disabled={loading}
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
  marginBottom: "15px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
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
  marginTop: "15px",
  backgroundColor: "transparent",
  color: "#22c55e",
  border: "1px solid #22c55e",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
};

export default PayBillsPin;