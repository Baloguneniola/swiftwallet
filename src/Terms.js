import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Terms() {
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
          to="/settings"
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
          to="/settings"
          style={{
            color: "#22c55e",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
        </Link>
      </div>


      {/* Terms Content */}
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
          Terms & Conditions
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
          title="1. Acceptance of Terms"
          text="By creating an account or using Swift Wallet, you agree to these Terms and Conditions. If you do not agree with any part of these terms, you should not use our services."
        />


        <Section
          title="2. Using Swift Wallet"
          text="Swift Wallet provides digital wallet services that allow users to send money, receive payments, pay bills, and manage financial transactions. You agree to use the platform only for lawful purposes."
        />


        <Section
          title="3. Account Registration"
          text="To use Swift Wallet, you must provide accurate and complete information during registration. You are responsible for keeping your account details, password, and security PIN confidential."
        />


        <Section
          title="4. Security and Verification"
          text="Swift Wallet uses security measures such as email verification, identity verification, and PIN protection to help keep accounts secure. Users should never share passwords, PINs, or verification codes with others."
        />


        <Section
          title="5. Transactions"
          text="Users are responsible for reviewing transaction details before confirming payments or transfers. Swift Wallet is not responsible for losses caused by incorrect information provided by the user."
        />


        <Section
          title="6. Payments and Wallet Balance"
          text="Wallet balances and transaction records displayed on Swift Wallet are provided for user convenience. Users should report any suspicious activity or incorrect transactions as soon as possible."
        />


        <Section
          title="7. Prohibited Activities"
          text="Users must not use Swift Wallet for fraud, illegal activities, unauthorised transactions, or any activity that may harm other users or the platform."
        />


        <Section
          title="8. Service Availability"
          text="We aim to keep Swift Wallet available at all times. However, temporary interruptions may occur due to maintenance, updates, security checks, or technical issues."
        />


        <Section
          title="9. Account Suspension"
          text="Swift Wallet reserves the right to restrict or suspend accounts involved in suspicious activity, security violations, or breaches of these Terms and Conditions."
        />


        <Section
          title="10. Changes to These Terms"
          text="Swift Wallet may update these Terms and Conditions from time to time. Continued use of the platform after changes means you accept the updated terms."
        />


        <Section
          title="11. Contact Support"
          text="If you have questions or concerns regarding these Terms and Conditions, please contact Swift Wallet customer support."
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
          fontSize: "22px",
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


export default Terms;