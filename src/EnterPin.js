import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function EnterPin() {
  const [pin, setPin] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const transferData = location.state;


  const handleContinue = () => {

    const currentUser = JSON.parse(
      localStorage.getItem("swiftWalletCurrentUser")
    );


    if (!currentUser) {
      alert("User session not found.");
      return;
    }


    if (!transferData) {
      alert("Transfer information missing.");
      return;
    }


    if (pin !== currentUser.pin) {
      alert("Incorrect PIN");
      return;
    }


    const transferAmount = Number(transferData.amount);


    if (transferAmount <= 0) {
      alert("Invalid transfer amount.");
      return;
    }


    if (transferAmount > currentUser.balance) {
      alert("Insufficient balance.");
      return;
    }


    const newTransaction = {
      name: "Transfer to " + transferData.recipient,
      date: new Date().toLocaleDateString(),
      amount:
        "- ₦" + transferAmount.toLocaleString("en-NG"),
      type: "debit",
      bank: transferData.bank,
      accountNumber: transferData.accountNumber,
      description:
        transferData.description || "Transfer",
      transactionId:
        "TXN" + Math.floor(Math.random() * 1000000),
    };


    const updatedUser = {
      ...currentUser,

      balance:
        currentUser.balance - transferAmount,

      transactions: [
        ...(currentUser.transactions || []),
        newTransaction,
      ],
    };


    const users =
      JSON.parse(
        localStorage.getItem("swiftWalletUsers")
      ) || [];


    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email
        ? updatedUser
        : user
    );


    localStorage.setItem(
      "swiftWalletUsers",
      JSON.stringify(updatedUsers)
    );


    localStorage.setItem(
      "swiftWalletCurrentUser",
      JSON.stringify(updatedUser)
    );


    navigate("/confirm-transfer", {
      state: {
        ...transferData,
        completed: true,
        transaction: newTransaction,
        newBalance: updatedUser.balance,
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
          width: "420px",
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          border: "1px solid #2a2a2a",
          boxShadow:
            "0 0 20px rgba(34,197,94,0.15)",
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
            marginBottom: "30px",
          }}
        >
          Enter your 4-digit PIN to complete this transfer.
        </p>


        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) =>
            setPin(e.target.value)
          }
          style={inputStyle}
        />


        <button
          onClick={handleContinue}
          style={buttonStyle}
        >
          Continue
        </button>


        <Link
          to="/confirm-transfer"
          state={transferData}
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
            ← Back to Transfer
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


export default EnterPin;