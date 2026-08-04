import React, { useState } from "react";
import { Link } from "react-router-dom";

function TransactionHistory() {
  const currentUser =
    JSON.parse(localStorage.getItem("swiftWalletCurrentUser")) || {};

  const transactions = currentUser.transactions || [];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Credit" && transaction.type === "credit") ||
      (filter === "Debit" && transaction.type === "debit");

    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const moneyIn = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount.replace(/[^\d]/g, "")),
      0
    );

  const moneyOut = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount.replace(/[^\d]/g, "")),
      0
    );

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
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
          Transaction History
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "35px",
          }}
        >
          A full record of your account activity.
        </p>

        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p
              style={{
                color: "#999",
                marginBottom: "10px",
              }}
            >
              Money In
            </p>

            <h2
              style={{
                color: "#22c55e",
                margin: 0,
              }}
            >
              + ₦{moneyIn.toLocaleString("en-NG")}
            </h2>
          </div>

          <div>
            <p
              style={{
                color: "#999",
                marginBottom: "10px",
              }}
            >
              Money Out
            </p>

            <h2
              style={{
                color: "#ff5f5f",
                margin: 0,
              }}
            >
              - ₦{moneyOut.toLocaleString("en-NG")}
            </h2>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>
            Filter Transactions
          </h3>

          <select
            style={inputStyle}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">
              All Transactions
            </option>

            <option value="Credit">
              Money In
            </option>

            <option value="Debit">
              Money Out
            </option>
          </select>

          <input
            type="text"
            placeholder="Search transactions"
            style={inputStyle}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div
          style={{
            ...cardStyle,
            marginTop: "30px",
          }}
        >
          <h3 style={titleStyle}>
            Transactions
          </h3>

          {filteredTransactions.length === 0 ? (
            <p
              style={{
                color: "#999",
              }}
            >
              No transactions found.
            </p>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom:
                    index === filteredTransactions.length - 1
                      ? "none"
                      : "1px solid #2a2a2a",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {transaction.name}
                  </div>

                  <small
                    style={{
                      color: "#888",
                    }}
                  >
                    {transaction.date}
                  </small>
                </div>

                <span
                  style={{
                    color:
                      transaction.type === "credit"
                        ? "#22c55e"
                        : "#ff5f5f",
                    fontWeight: "700",
                  }}
                >
                  {transaction.amount}
                </span>
              </div>
            ))
          )}
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
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  backgroundColor: "#111",
  border: "1px solid #333",
  color: "#fff",
  borderRadius: "8px",
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

export default TransactionHistory;