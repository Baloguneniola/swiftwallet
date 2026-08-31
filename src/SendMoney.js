import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "./api";

function SendMoney() {
  const navigate = useNavigate();

  const [recipientName, setRecipientName] =
    useState("");

  const [lookingUp, setLookingUp] =
    useState(false);

  const [accountError, setAccountError] =
    useState("");

  const [transferData, setTransferData] =
    useState({
      recipient: "",
      bank: "Swift Wallet",
      accountNumber: "",
      amount: "",
      description: "",
    });

  /*
    LOOK UP RECIPIENT ACCOUNT
  */
  const lookupAccount = async (
    accountNumber
  ) => {
    if (accountNumber.length < 10) {
      setRecipientName("");
      setAccountError("");
      return;
    }

    setLookingUp(true);
    setAccountError("");
    setRecipientName("");

    try {
      /*
        GET JWT TOKEN
      */
      const token =
        localStorage.getItem(
          "swiftWalletToken"
        );

      /*
        MAKE SURE USER IS LOGGED IN
      */
      if (!token) {
        setAccountError(
          "Your session has expired. Please log in again."
        );

        return;
      }

      /*
        LOOK UP ACCOUNT WITH JWT
      */
      const response = await fetch(
        `${API_URL}/api/transfers/lookup/${accountNumber}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      /*
        HANDLE EXPIRED / INVALID TOKEN
      */
      if (
        response.status === 401 ||
        response.status === 403
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

        setAccountError(
          data.message ||
            "Your session has expired. Please log in again."
        );

        return;
      }

      /*
        HANDLE ACCOUNT NOT FOUND
      */
      if (!response.ok) {
        setRecipientName("");

        setTransferData((prev) => ({
          ...prev,
          recipient: "",
        }));

        setAccountError(
          data.message ||
            "Account not found."
        );

        return;
      }

      /*
        ACCOUNT FOUND
      */
      setRecipientName(
        data.user.name
      );

      setTransferData((prev) => ({
        ...prev,
        recipient:
          data.user.name,

        bank:
          data.bank ||
          "Swift Wallet",
      }));
    } catch (error) {
      console.error(
        "Account lookup error:",
        error
      );

      setAccountError(
        "Unable to verify this account."
      );
    } finally {
      setLookingUp(false);
    }
  };

  /*
    CONTINUE TO CONFIRM TRANSFER
  */
  const handleContinue = () => {
    if (
      !recipientName ||
      !transferData.accountNumber ||
      !transferData.amount
    ) {
      alert(
        "Please enter a valid recipient account and amount."
      );

      return;
    }

    if (
      transferData.accountNumber.length !== 10
    ) {
      alert(
        "Please enter a valid account number."
      );

      return;
    }

    const amount = Number(
      transferData.amount
    );

    if (
      !amount ||
      amount <= 0
    ) {
      alert(
        "Please enter a valid transfer amount."
      );

      return;
    }

    /*
      PASS TRANSFER DATA TO
      CONFIRM TRANSFER PAGE
    */
    navigate(
      "/confirm-transfer",
      {
        state: {
          ...transferData,

          recipient:
            recipientName,

          bank:
            "Swift Wallet",

          amount,
        },
      }
    );

    window.scrollTo(0, 0);
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
        to="/dashboard"
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
          width: "450px",
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          border: "1px solid #2a2a2a",
          boxShadow:
            "0 0 20px rgba(34,197,34,0.15)",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Send Money
        </h1>

        <p
          style={{
            color: "#aaa",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Transfer money to another Swift Wallet account.
        </p>

        <div
          style={{
            position: "relative",
            marginBottom: "18px",
          }}
        >
          <select
            value="Swift Wallet"
            disabled
            style={{
              ...inputStyle,
              appearance: "none",
              paddingRight: "40px",
              marginBottom: "0",
              opacity: 1,
              cursor: "default",
            }}
          >
            <option>
              Swift Wallet
            </option>
          </select>

          <span
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform:
                "translateY(-50%)",
              pointerEvents: "none",
              color: "#888",
              fontSize: "12px",
            }}
          >
            ▼
          </span>
        </div>

        <input
          type="text"
          inputMode="numeric"
          maxLength="10"
          placeholder="Recipient Account Number"
          style={inputStyle}
          value={
            transferData.accountNumber
          }
          onChange={(e) => {
            const accountNumber =
              e.target.value.replace(
                /\D/g,
                ""
              );

            setTransferData((prev) => ({
              ...prev,
              accountNumber,
              recipient: "",
            }));

            setRecipientName("");
            setAccountError("");

            if (
              accountNumber.length === 10
            ) {
              lookupAccount(
                accountNumber
              );
            }
          }}
        />

        {lookingUp && (
          <div
            style={{
              color: "#aaa",
              marginTop: "-8px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            Looking up account...
          </div>
        )}

        {recipientName && (
          <div
            style={{
              backgroundColor: "#111",
              border:
                "1px solid #22c55e",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "18px",
              color: "#22c55e",
              fontWeight: "600",
            }}
          >
            Account Name:{" "}
            {recipientName}
          </div>
        )}

        {accountError && (
          <div
            style={{
              backgroundColor:
                "rgba(239,68,68,0.1)",
              border:
                "1px solid #ef4444",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "18px",
              color: "#ef4444",
              fontSize: "14px",
            }}
          >
            {accountError}
          </div>
        )}

        <input
          type="text"
          placeholder="Amount (₦)"
          style={inputStyle}
          value={
            transferData.amount
              ? Number(
                  transferData.amount
                ).toLocaleString(
                  "en-NG"
                )
              : ""
          }
          onChange={(e) => {
            const value =
              e.target.value.replace(
                /,/g,
                ""
              );

            if (
              value === "" ||
              /^\d*$/.test(value)
            ) {
              setTransferData((prev) => ({
                ...prev,
                amount: value,
              }));
            }
          }}
        />

        <textarea
          placeholder="Description (Optional)"
          style={textAreaStyle}
          value={
            transferData.description
          }
          onChange={(e) =>
            setTransferData((prev) => ({
              ...prev,
              description:
                e.target.value,
            }))
          }
        />

        <button
          onClick={handleContinue}
          style={buttonStyle}
        >
          Continue
        </button>

        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(0, 0)
          }
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              ...secondaryButton,
              marginTop: "15px",
            }}
          >
            ← Back to Dashboard
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

const textAreaStyle = {
  width: "100%",
  height: "90px",
  padding: "14px",
  marginBottom: "20px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  resize: "none",
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
  fontSize: "15px",
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
  fontSize: "15px",
  cursor: "pointer",
};

export default SendMoney;