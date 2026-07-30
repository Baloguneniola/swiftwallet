import React, { useState } from "react";
import { Link } from "react-router-dom";

function PayBills() {
  const [balance, setBalance] = useState(200350);

  const [selectedBill, setSelectedBill] = useState("");
  const [provider, setProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [recentPayments, setRecentPayments] = useState([
    {
      service: "Electricity",
      amount: "- ₦12,000",
      date: "Today",
    },
    {
      service: "DSTV",
      amount: "- ₦8,500",
      date: "Yesterday",
    },
    {
      service: "MTN Airtime",
      amount: "- ₦2,000",
      date: "Last Week",
    },
  ]);

  const handlePayBill = () => {
    if (
      !selectedBill ||
      !provider ||
      !accountNumber ||
      !amount
    ) {
      alert("Please complete all fields.");
      return;
    }

    const billAmount = Number(amount);

    if (billAmount <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    if (billAmount > balance) {
      alert("Insufficient balance.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setBalance((prev) => prev - billAmount);

      setRecentPayments((prev) => [
        {
          service: selectedBill,
          amount: `- ₦${billAmount.toLocaleString("en-NG")}`,
          date: "Just now",
        },
        ...prev,
      ]);

      setTransactionId(
        "TXN" + Math.floor(Math.random() * 1000000)
      );

      setSuccessMessage("Bill paid successfully ✅");

      setSelectedBill("");
      setProvider("");
      setAccountNumber("");
      setAmount("");

      setLoading(false);
    }, 1500);
  };

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 50px",
          borderBottom: "1px solid #222",
        }}
      >
        <Link
          to="/dashboard"
          onClick={() => window.scrollTo(0, 0)}
          style={{
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
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Swift Wallet
          </span>
        </Link>
      </div>

      {/* MAIN */}

      <div
        style={{
          maxWidth: "700px",
          margin: "50px auto",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            fontSize: "38px",
            marginBottom: "10px",
          }}
        >
          Pay Bills
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "35px",
          }}
        >
          Pay your everyday bills quickly and securely.
        </p>

        {/* BALANCE */}

        <div style={cardStyle}>
          <p style={{ color: "#999" }}>
            Available Balance
          </p>

          <h2
            style={{
              color: "#22c55e",
              fontSize: "40px",
              margin: 0,
            }}
          >
            ₦{balance.toLocaleString("en-NG")}.00
          </h2>
        </div>

        {/* BILL PAYMENT */}

        <div
          style={{
            ...cardStyle,
            marginTop: "25px",
          }}
        >
          <h2 style={titleStyle}>
            🧾 Pay a Bill
          </h2>

          <p style={textStyle}>
            Select a service and enter your payment details.
          </p>

          <select
            style={inputStyle}
            value={selectedBill}
            onChange={(e) => setSelectedBill(e.target.value)}
          >
            <option value="">Choose Service</option>
            <option value="Electricity">⚡ Electricity</option>
            <option value="Water">💧 Water</option>
            <option value="DSTV">📺 DSTV</option>
            <option value="Wi-Fi">📶 Wi-Fi</option>
            <option value="Airtime">📱 Airtime</option>
          </select>

          <input
            style={inputStyle}
            placeholder="Provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />

          <input
            style={inputStyle}
            placeholder="Account / Meter / Phone Number"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value)
            }
          />

          <input
            style={inputStyle}
            placeholder="Amount (₦)"
            value={
              amount
                ? Number(amount).toLocaleString("en-NG")
                : ""
            }
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, "");

              if (!isNaN(value)) {
                setAmount(value);
              }
            }}
          />

          <button
            style={buttonStyle}
            onClick={handlePayBill}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Bill"}
          </button>

                    {successMessage && (
            <div
              style={{
                marginTop: "25px",
                padding: "18px",
                backgroundColor: "#111",
                border: "1px solid #22c55e",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#22c55e",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                {successMessage}
              </p>

              <small style={{ color: "#999" }}>
                Transaction ID: {transactionId}
              </small>
            </div>
          )}
        </div>

        {/* RECENT PAYMENTS */}

        <div
          style={{
            ...cardStyle,
            marginTop: "30px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Recent Payments
          </h2>

          {recentPayments.map((payment, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 0",
                borderBottom: "1px solid #2a2a2a",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  {payment.service}
                </p>

                <small
                  style={{
                    color: "#888",
                  }}
                >
                  {payment.date}
                </small>
              </div>

              <span
                style={{
                  color: "#ff5f5f",
                  fontWeight: "700",
                }}
              >
                {payment.amount}
              </span>
            </div>
          ))}
        </div>

        <Link
          to="/dashboard"
          onClick={() => window.scrollTo(0, 0)}
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              ...buttonStyle,
              marginTop: "30px",
            }}
          >
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "15px",
  padding: "30px",
};

const titleStyle = {
  color: "#22c55e",
  marginBottom: "10px",
};

const textStyle = {
  color: "#999",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  backgroundColor: "#111",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  outline: "none",
  fontSize: "15px",
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

export default PayBills;