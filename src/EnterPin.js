import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function EnterPin() {
  const [pin, setPin] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const transferData = location.state;

  const handleContinue = () => {
    const currentUser =
      JSON.parse(
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

    if (pin.length !== 4) {
      alert("Please enter your 4-digit PIN.");
      return;
    }

    if (pin !== currentUser.pin) {
      alert("Incorrect PIN");
      return;
    }

    const transferAmount =
      Number(transferData.amount);

    if (transferAmount <= 0) {
      alert("Invalid transfer amount.");
      return;
    }

    if (
      transferAmount >
      Number(currentUser.balance)
    ) {
      alert("Insufficient balance.");
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("swiftWalletUsers")
      ) || [];


    const receiver =
      users.find(
        (user) =>
          user.accountNumber ===
          transferData.accountNumber
      );


    if (!receiver) {
      alert("Recipient account not found.");
      return;
    }


    if (
      receiver.email === currentUser.email
    ) {
      alert(
        "You cannot transfer money to yourself."
      );
      return;
    }


    const transactionId =
      "TXN" +
      Math.floor(
        Math.random() * 1000000
      );


    const senderTransaction = {
      name:
        "Transfer to " +
        receiver.name,

      date:
        new Date().toLocaleDateString(),

      amount:
        transferAmount,

      type:
        "debit",

      bank:
        transferData.bank,

      accountNumber:
        transferData.accountNumber,

      description:
        transferData.description ||
        "Transfer",

      transactionId,
    };


    const receiverTransaction = {
      name:
        "Received from " +
        currentUser.name,

      date:
        new Date().toLocaleDateString(),

      amount:
        transferAmount,

      type:
        "credit",

      bank:
        transferData.bank,

      accountNumber:
        currentUser.accountNumber,

      description:
        transferData.description ||
        "Transfer received",

      transactionId,
    };


    const updatedSender = {
      ...currentUser,

      balance:
        Number(currentUser.balance) -
        transferAmount,

      transactions: [
        ...(currentUser.transactions || []),
        senderTransaction,
      ],
    };


    const updatedReceiver = {
      ...receiver,

      balance:
        Number(receiver.balance || 0) +
        transferAmount,

      transactions: [
        ...(receiver.transactions || []),
        receiverTransaction,
      ],
    };


    const updatedUsers =
      users.map((user) => {

        if (
          user.email === currentUser.email
        ) {
          return updatedSender;
        }


        if (
          user.email === receiver.email
        ) {
          return updatedReceiver;
        }


        return user;

      });


    localStorage.setItem(
      "swiftWalletUsers",
      JSON.stringify(updatedUsers)
    );


    localStorage.setItem(
      "swiftWalletCurrentUser",
      JSON.stringify(updatedSender)
    );


    navigate(
      "/transfer-success",
      {
        state: {
          transferData,

          transaction:
            senderTransaction,

          newBalance:
            updatedSender.balance,
        },
      }
    );
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
            color: "#aaa",
          }}
        >
          Enter your 4-digit PIN to complete transfer.
        </p>


        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Enter PIN"
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
          Confirm Transfer
        </button>


      </div>

    </div>
  );
}


const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  marginBottom: "20px",
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


export default EnterPin;