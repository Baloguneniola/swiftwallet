import React, { useState } from "react";
import { Link } from "react-router-dom";

const transactions = [
  { name: "Netflix Subscription", date: "Today", amount: "- ₦4,500", type: "debit" },
  { name: "Monthly Salary", date: "Yesterday", amount: "+ ₦180,000", type: "credit" },
  { name: "Electricity Bill", date: "2 Days Ago", amount: "- ₦12,000", type: "debit" },
  { name: "Transfer from John", date: "5 Days Ago", amount: "+ ₦25,000", type: "credit" },
  { name: "Jumia Order #4471", date: "6 Days Ago", amount: "- ₦18,250", type: "debit" },
  { name: "Transfer to Amaka", date: "1 Week Ago", amount: "- ₦10,000", type: "debit" },
  { name: "Spotify Premium", date: "1 Week Ago", amount: "- ₦1,900", type: "debit" },
  { name: "Freelance Payment", date: "2 Weeks Ago", amount: "+ ₦65,000", type: "credit" },
  { name: "MTN Airtime", date: "2 Weeks Ago", amount: "- ₦2,000", type: "debit" },
  { name: "DSTV Subscription", date: "3 Weeks Ago", amount: "- ₦21,000", type: "debit" },
];

function TransactionHistory() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Credit" && t.type === "credit") ||
      (filter === "Debit" && t.type === "debit");
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Navbar */}
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

      {/* Main */}
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
          A full record of the money moving in and out of your account.
        </p>

        {/* Summary */}
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
            <p style={{ color: "#999", marginBottom: "10px" }}>Money In</p>
            <h2 style={{ color: "#22c55e", fontSize: "28px", margin: 0 }}>
              + ₦270,000
            </h2>
          </div>

          <div>
            <p style={{ color: "#999", marginBottom: "10px" }}>Money Out</p>
            <h2 style={{ color: "#ff5f5f", fontSize: "28px", margin: 0 }}>
              - ₦69,650
            </h2>
          </div>
        </div>

        {/* Filter + Search */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Filter Transactions</h3>

          <select
            style={inputStyle}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Transactions</option>
            <option value="Credit">Money In</option>
            <option value="Debit">Money Out</option>
          </select>

          <input
            type="text"
            placeholder="Search by name"
            style={{ ...inputStyle, marginBottom: 0 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Transaction List */}
        <div style={{ ...cardStyle, marginTop: "30px" }}>
          <h3 style={titleStyle}>
            {filter === "All" ? "All Transactions" : filter === "Credit" ? "Money In" : "Money Out"}
          </h3>

          {filtered.length === 0 ? (
            <p style={{ color: "#999" }}>No transactions found.</p>
          ) : (
            filtered.map((t, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom:
                    index === filtered.length - 1 ? "none" : "1px solid #2a2a2a",
                  padding: "15px 0",
                }}
              >
                <div>
                  <div>{t.name}</div>

                  <small style={{ color: "#888" }}>{t.date}</small>
                </div>

                <span
                  style={{
                    color: t.type === "credit" ? "#22c55e" : "#ff5f5f",
                    fontWeight: "700",
                  }}
                >
                  {t.amount}
                </span>
              </div>
            ))
          )}
        </div>

        <Link
          to="/dashboard"
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