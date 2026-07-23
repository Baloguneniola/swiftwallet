import React from "react";
import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      title: "Instant Transfers",
      description:
        "Send money to friends and family in seconds with secure bank-grade encryption.",
      icon: "💸",
    },
    {
      title: "Bill Payments",
      description:
        "Pay electricity, internet, TV subscriptions and other bills in one place.",
      icon: "🧾",
    },
    {
      title: "Wallet Top up",
      description:
        "Fund your wallet instantly using your debit card or bank account.",
      icon: "💳",
    },
    {
      title: "Transaction History",
      description:
        "View all your payments, transfers and deposits anytime.",
      icon: "📜",
    },
    {
      title: "Secure Login",
      description:
        "Protect your account with email verification, identity verification and PIN security.",
      icon: "🔒",
    },
    {
      title: "24/7 Support",
      description:
        "Our customer support team is available whenever you need assistance.",
      icon: "🎧",
    },
  ];

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
          to="/"
          style={{
            color: "#22c55e",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Back Home
        </Link>
      </div>

      <div
        style={{
          padding: "60px 50px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            fontSize: "42px",
            marginBottom: "15px",
          }}
        >
          Swift Wallet Features
        </h1>

        <p
          style={{
            color: "#999",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto 60px",
          }}
        >
          Everything you need to manage your money quickly, securely and
          conveniently.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                backgroundColor: "#1a1a1a",
                padding: "30px",
                borderRadius: "15px",
                border: "1px solid #2a2a2a",
                transition: "0.3s",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "20px",
                }}
              >
                {feature.icon}
              </div>

              <h2
                style={{
                  color: "#22c55e",
                  marginBottom: "15px",
                }}
              >
                {feature.title}
              </h2>

              <p
                style={{
                  color: "#aaa",
                  lineHeight: "1.7",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;