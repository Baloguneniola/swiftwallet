import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0d0d0d",
        padding: "24px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        alignItems: "center",
        gap: "20px",
        borderTop: "1px solid #1a1a1a",
      }}
    >

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: "#22c55e",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "11px",
            color: "#000",
          }}
        >
          SW
        </div>

        <span
          style={{
            fontWeight: "700",
            fontSize: "15px",
            color: "#fff",
          }}
        >
          Swift Wallet
        </span>
      </div>


      {/* Footer Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >

        <Link
          to="/privacy"
          style={footerLink}
        >
          Privacy
        </Link>


        <Link
          to="/terms"
          style={footerLink}
        >
          Terms
        </Link>


        <Link
          to="/support"
          style={footerLink}
        >
          Support
        </Link>

      </div>


      {/* Copyright */}
      <div
        style={{
          color: "#555",
          fontSize: "12px",
          textAlign: "right",
        }}
      >
        © 2026 Swift Wallet Inc. All rights reserved.
      </div>

    </footer>
  );
};


const footerLink = {
  color: "#888",
  textDecoration: "none",
  fontSize: "13px",
};


export default Footer;