import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SendMoney() {
  const navigate = useNavigate();

  const [recipientName, setRecipientName] = useState("");

  const [transferData, setTransferData] = useState({
    recipient: "",
    bank: "",
    accountNumber: "",
    amount: "",
    description: "",
  });

  const handleContinue = () => {
    if (
      !recipientName ||
      !transferData.bank ||
      !transferData.accountNumber ||
      !transferData.amount
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (transferData.accountNumber.length < 10) {
      alert("Please enter a valid account number.");
      return;
    }

    navigate("/confirm-transfer", {
      state: {
        ...transferData,
        recipient: recipientName,
        amount: Number(transferData.amount),
      },
    });
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
          width: "450px",
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          border: "1px solid #2a2a2a",
          boxShadow: "0 0 20px rgba(34,197,34,0.15)",
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
          Transfer money quickly and securely.
        </p>

        <input
          type="text"
          placeholder="Recipient Name"
          style={inputStyle}
          value={transferData.recipient}
          onChange={(e) =>
            setTransferData({
              ...transferData,
              recipient: e.target.value,
            })
          }
        />

        <div
          style={{
            position: "relative",
            marginBottom: "18px",
          }}
        >
          <select
            style={{
              ...inputStyle,
              appearance: "none",
              paddingRight: "40px",
              marginBottom: "0",
            }}
            value={transferData.bank}
            onChange={(e) =>
              setTransferData({
                ...transferData,
                bank: e.target.value,
              })
            }
          >
            <option value="">Select Bank</option>
            <option>Ecobank</option>
            <option>Access Bank</option>
            <option>GTBank</option>
            <option>First Bank</option>
            <option>UBA</option>
            <option>Zenith Bank</option>
            <option>Kuda</option>
            <option>Opay</option>
          </select>

          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "55%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            ▼
          </span>
        </div>

        <input
          type="text"
          placeholder="Account Number"
          style={inputStyle}
          value={transferData.accountNumber}
          onChange={(e) => {
            const accountNumber = e.target.value;

            setTransferData({
              ...transferData,
              accountNumber,
            });

            const users =
              JSON.parse(
                localStorage.getItem("swiftWalletUsers")
              ) || [];

            const user = users.find(
              (u) => u.accountNumber === accountNumber
            );

            if (user) {
              setRecipientName(user.name);

              setTransferData((prev) => ({
                ...prev,
                recipient: user.name,
              }));
            } else {
              setRecipientName("");

              setTransferData((prev) => ({
                ...prev,
                recipient: "",
              }));
            }
          }}
        />

        {recipientName && (
          <div
            style={{
              backgroundColor: "#111",
              border: "1px solid #22c55e",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "18px",
              color: "#22c55e",
              fontWeight: "600",
            }}
          >
            Account Name: {recipientName}
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
              ).toLocaleString("en-NG")
              : ""
          }
          onChange={(e) => {
            const value = e.target.value.replace(/,/g, "");

            if (!isNaN(value)) {
              setTransferData({
                ...transferData,
                amount: value,
              });
            }
          }}
        />

        <textarea
          placeholder="Description (Optional)"
          style={textAreaStyle}
          value={transferData.description}
          onChange={(e) =>
            setTransferData({
              ...transferData,
              description: e.target.value,
            })
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
          onClick={() => window.scrollTo(0, 0)}
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