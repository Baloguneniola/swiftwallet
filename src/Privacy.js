import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Privacy() {
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
          maxWidth: "850px",
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
          Privacy Policy
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "40px",
          }}
        >
          Last updated: July 2026
        </p>

        <Section
          title="1. Introduction"
          text="Swift Wallet values your privacy. This Privacy Policy explains what information we collect, why we collect it, and how we protect your personal data while you use our services."
        />

        <Section
          title="2. Information We Collect"
          text="We may collect your name, email address, phone number, account information, identity verification details, and transaction history to provide our financial services."
        />

        <Section
          title="3. How We Use Your Information"
          text="Your information is used to create and manage your account, process payments, verify your identity, improve our services, and protect against fraud."
        />

        <Section
          title="4. Data Security"
          text="Swift Wallet uses secure encryption, authentication measures, and industry-standard security practices to help protect your personal information from unauthorised access."
        />

        <Section
          title="5. Sharing Information"
          text="We do not sell your personal information. Your data may only be shared with trusted payment providers, banking partners, or legal authorities where required by law."
        />

        <Section
          title="6. Cookies"
          text="Our platform may use cookies and similar technologies to improve user experience, remember preferences, and analyse website performance."
        />

        <Section
          title="7. Your Rights"
          text="You may request access to your personal information, update inaccurate details, or request deletion of your account where permitted by law."
        />

        <Section
          title="8. Policy Updates"
          text="We may update this Privacy Policy from time to time. Any significant changes will be communicated through the Swift Wallet platform."
        />

        <Section
          title="9. Contact Us"
          text="If you have any questions regarding this Privacy Policy, please contact our support team at support@swiftwallet.com."
        />
      </div>
    </div>
  );
}

function Section({ title, text }) {
  return (
    <div
      style={{
        marginBottom: "35px",
      }}
    >
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
          lineHeight: "1.8",
          fontSize: "16px",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default Privacy;