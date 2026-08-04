import React from "react";
import { Link, useLocation } from "react-router-dom";

function TransferSuccess() {
  const location = useLocation();

  const {
    transferData,
    transaction,
    newBalance,
  } = location.state || {};

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
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
          width: "450px",
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          border: "1px solid #2a2a2a",
          boxShadow: "0 0 20px rgba(34,197,94,0.15)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            backgroundColor: "#22c55e",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px",
            color: "#000",
            fontSize: "35px",
            fontWeight: "bold",
          }}
        >
          ✓
        </div>


        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
          }}
        >
          Transfer Successful
        </h1>


        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
          }}
        >
          Your money has been sent successfully.
        </p>


        <div
          style={{
            backgroundColor: "#111",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "25px",
            textAlign: "left",
          }}
        >
          <Detail
            label="Recipient"
            value={transferData?.recipient}
          />

          <Detail
            label="Bank"
            value={transferData?.bank}
          />

          <Detail
            label="Account Number"
            value={transferData?.accountNumber}
          />

          <Detail
            label="Amount"
            value={
              transferData?.amount
                ? `₦${Number(
                    transferData.amount
                  ).toLocaleString("en-NG")}`
                : "-"
            }
          />

          <Detail
            label="Transaction ID"
            value={transaction?.transactionId}
          />

          <Detail
            label="New Balance"
            value={
              newBalance !== undefined
                ? `₦${Number(
                    newBalance
                  ).toLocaleString("en-NG")}`
                : "-"
            }
          />
        </div>


        <Link
          to="/dashboard"
          onClick={() => window.scrollTo(0, 0)}
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={buttonStyle}
          >
            Back to Dashboard
          </button>
        </Link>

      </div>

    </div>
  );
}


function Detail({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
        gap: "20px",
      }}
    >
      <span
        style={{
          color: "#888",
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontWeight: "600",
          textAlign: "right",
        }}
      >
        {value || "-"}
      </span>
    </div>
  );
}


const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "25px",
  backgroundColor: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "15px",
  cursor: "pointer",
};


export default TransferSuccess;