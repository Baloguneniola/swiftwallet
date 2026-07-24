import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        backgroundColor: "#0d0d0d",
        borderBottom: "1px solid #1a1a1a",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#22c55e",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#000",
          }}
        >
          SW
        </div>

        <span
          style={{
            fontWeight: "700",
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Swift Wallet
        </span>
      </Link>


      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
        }}
      >

        {/* Home Scroll */}
        <a
          href="#top"
          style={{
            color: "#aaa",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Home
        </a>


        <Link
          to="/features"
          style={{
            color: "#aaa",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Features
        </Link>


        <Link
          to="/login"
          style={{
            color: "#aaa",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Log In
        </Link>


        <Link
          to="/signup"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              backgroundColor: "#22c55e",
              color: "#000",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Open an Account
          </button>
        </Link>


      </div>
    </nav>
  );
};

export default Navbar;