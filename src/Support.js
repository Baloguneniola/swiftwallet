import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Support() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        </Link>
      </div>


      {/* Main Content */}
      <div
        style={{
          maxWidth: "800px",
          margin: "60px auto",
          padding: "0 30px",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            fontSize: "42px",
            marginBottom: "15px",
          }}
        >
          Swift Wallet Support
        </h1>

        <p
          style={{
            color: "#999",
            fontSize: "18px",
            lineHeight: "1.7",
            marginBottom: "40px",
          }}
        >
          Need help with your account, payments, or transactions?
          Our support team is here to assist you.
        </p>


        {/* Support Options */}
        <div
          style={{
            display: "grid",
            gap: "25px",
          }}
        >
          <SupportCard
            title="Account Assistance"
            text="Having trouble signing in, verifying your account, or updating your profile? We can help you get back into your account."
            icon="👤"
          />

          <SupportCard
            title="Transaction Issues"
            text="Report failed transfers, incorrect payments, missing funds, or any transaction-related problems."
            icon="💸"
          />

          <SupportCard
            title="Security Help"
            text="If you notice suspicious activity or believe your account has been compromised, contact support immediately."
            icon="🔒"
          />

          <SupportCard
            title="General Questions"
            text="Have questions about Swift Wallet features, payments, or how the platform works?"
            icon="❓"
          />
        </div>


        {/* Contact Section */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginTop: "40px",
          }}
        >
          <h2
            style={{
              color: "#22c55e",
              marginBottom: "15px",
            }}
          >
            Contact Support
          </h2>

          <p
            style={{
              color: "#aaa",
              lineHeight: "1.7",
            }}
          >
            Email: support@swiftwallet.com
            <br />
            Phone number: +234809012345
            <br />
            Response time: Within 24 hours
            <br />
            Available: Monday - Sunday
          </p>

          <button
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#22c55e",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Contact Support
          </button>
        </div>


      </div>
    </div>
  );
}


function SupportCard({ title, text, icon }) {
  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: "15px",
        padding: "30px",
      }}
    >
      <div
        style={{
          fontSize: "35px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          color: "#22c55e",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#aaa",
          lineHeight: "1.7",
        }}
      >
        {text}
      </p>
    </div>
  );
}


export default Support;