import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
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
          to="/"
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

        <Link
          to="/login"
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              backgroundColor: "#22c55e",
              color: "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div style={{ padding: "40px 50px" }}>
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
          }}
        >
          Welcome back, Abdul
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "35px",
          }}
        >
          Here's an overview of your Swift Wallet account.
        </p>

        {/* Balance Card */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "40px",
          }}
        >
          <p
            style={{
              color: "#999",
              marginBottom: "10px",
            }}
          >
            Available Balance
          </p>

          <h2
            style={{
              color: "#22c55e",
              fontSize: "42px",
              margin: 0,
            }}
          >
            ₦200,350.00
          </h2>
        </div>

        {/* Quick Actions */}
        <h2 style={{ marginBottom: "20px" }}>
          Quick Actions
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "50px",
          }}
        >
          <Link
            to="/send-money"
            style={{ textDecoration: "none" }}
          >
            <button style={actionButton}>
               Send Money
            </button>
          </Link>

          <Link
            to="/add-money"
            style={{ textDecoration: "none" }}
          >
            <button style={actionButton}>
               Add Money
            </button>
          </Link>

          <Link
            to="/pay-bills"
            style={{ textDecoration: "none" }}
          >
            <button style={actionButton}>
               Pay Bills
            </button>
          </Link>

          <Link
            to="/transaction-history"
            style={{ textDecoration: "none" }}
          >
            <button style={actionButton}>
               Transaction History
            </button>
          </Link>
        </div>

        {/* Recent Transactions */}
        <h2 style={{ marginBottom: "20px" }}>
          Recent Transactions
        </h2>

        {[
          {
            name: "Netflix Subscription",
            date: "Today",
            amount: "- ₦4,500",
          },
          {
            name: "Monthly Salary",
            date: "Yesterday",
            amount: "+ ₦180,000",
          },
          {
            name: "Electricity Bill",
            date: "2 Days Ago",
            amount: "- ₦12,000",
          },
          {
            name: "Transfer from John",
            date: "5 Days Ago",
            amount: "+ ₦25,000",
          },
        ].map((transaction) => (
          <div
            key={transaction.name}
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "12px",
              padding: "18px 25px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                {transaction.name}
              </div>

              <div
                style={{
                  color: "#888",
                  fontSize: "13px",
                }}
              >
                {transaction.date}
              </div>
            </div>

            <span
              style={{
                color: transaction.amount.startsWith("+")
                  ? "#22c55e"
                  : "#ff5f5f",
                fontWeight: "700",
              }}
            >
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const actionButton = {
  backgroundColor: "#1a1a1a",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "12px",
  padding: "20px 30px",
  cursor: "pointer",
  fontSize: "16px",
  minWidth: "180px",
  transition: "0.3s",
};

export default Dashboard;