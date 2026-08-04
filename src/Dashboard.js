import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("swiftWalletCurrentUser")) || {};

  const userName =
    currentUser.name ||
    localStorage.getItem("swiftWalletUser") ||
    "User";

  const balance = currentUser.balance || 0;

  const transactions =
    currentUser.transactions?.slice(-5).reverse() || [];

  const handleLogout = () => {
    localStorage.removeItem("swiftWalletUser");
    localStorage.removeItem("swiftWalletCurrentUser");

    navigate("/login");
    window.scrollTo(0, 0);
  };

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
          to="/"
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

        <button
          onClick={handleLogout}
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
      </div>

      <div
        style={{
          padding: "40px 50px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
          }}
        >
          Welcome back, {userName}
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "35px",
          }}
        >
          Here's an overview of your Swift Wallet account.
        </p>

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
            ₦
            {balance.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
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
          <ActionLink
            to="/send-money"
            text="Send Money"
          />

          <ActionLink
            to="/add-money"
            text="Add Money"
          />

          <ActionLink
            to="/pay-bills"
            text="Pay Bills"
          />

          <ActionLink
            to="/transaction-history"
            text="Transaction History"
          />
        </div>

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <p
            style={{
              color: "#888",
            }}
          >
            No transactions yet.
          </p>
        ) : (
          transactions.map((transaction, index) => (
            <div
              key={index}
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
    </div>
  );
}

function ActionLink({ to, text }) {
  return (
    <Link
      to={to}
      onClick={() => window.scrollTo(0, 0)}
      style={{
        textDecoration: "none",
      }}
    >
      <button
        style={actionButton}
      >
        {text}
      </button>
    </Link>
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