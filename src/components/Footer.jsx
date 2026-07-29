import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0d0d0d",
        padding: "24px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
          gap: "24px",
        }}
      >
        <Link
          to="/privacy"
          style={{
            color: "#888",
            textDecoration: "none",
            fontSize: "13px",
          }}
        >
          Privacy
        </Link>

        <Link
          to="/terms"
          style={{
            color: "#888",
            textDecoration: "none",
            fontSize: "13px",
          }}
        >
          Terms
        </Link>

        <Link
          to="/support"
          style={{
            color: "#888",
            textDecoration: "none",
            fontSize: "13px",
          }}
        >
          Support
        </Link>

        <a
          href="#"
          style={{
            color: "#888",
            textDecoration: "none",
            fontSize: "13px",
          }}
        >
          Careers
        </a>
      </div>


      {/* Copyright */}
      <div
        style={{
          color: "#555",
          fontSize: "12px",
        }}
      >
        © 2026 Swift Wallet Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;