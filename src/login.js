import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = () => {

if (email.trim() === "") {
  alert("Please enter your email address.");
  return;
}


if (password.trim() === "") {
  alert("Please enter your password.");
  return;
}


const username = email
  .split("@")[0]
  .split(/[._-]/)[0];


const formattedName =
  username.charAt(0).toUpperCase() +
  username.slice(1).toLowerCase();


localStorage.setItem(
  "swiftWalletUser",
  formattedName
);


navigate("/dashboard");

window.scrollTo(0, 0);

};

return (

<div
  style={{
    backgroundColor: "#0d0d0d",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  }}
>


  {/* Swift Wallet Logo */}
  <Link
    to="/"
    onClick={() => window.scrollTo(0, 0)}
    style={{
      position: "absolute",
      top: "35px",
      left: "50px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >

    <div
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#22c55e",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "16px",
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



  {/* Login Card */}
  <div
    style={{
      backgroundColor: "#1a1a1a",
      padding: "40px",
      borderRadius: "15px",
      width: "380px",
      textAlign: "center",
      border: "1px solid #2a2a2a",
      boxShadow:
        "0 0 20px rgba(34,197,94,0.15)",
    }}
  >


    <h1
      style={{
        color: "#22c55e",
        marginBottom: "10px",
        fontSize: "32px",
      }}
    >
      Welcome back
    </h1>


    <p
      style={{
        color: "#aaa",
        marginBottom: "30px",
        fontSize: "15px",
      }}
    >
      Sign in to access your Swift Wallet.
    </p>



    <input
      type="email"
      name="swift-wallet-email"
      placeholder="Email Address"
      style={inputStyle}
      value={email}
      autoComplete="off"
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />



    <input
      type="password"
      name="swift-wallet-password"
      placeholder="Password"
      style={inputStyle}
      value={password}
      autoComplete="new-password"
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />



    <button
      type="button"
      onClick={handleLogin}
      style={buttonStyle}
    >
      Log In
    </button>



    <p
      style={{
        color: "#888",
        marginTop: "25px",
        fontSize: "14px",
      }}
    >
      Don't have an account?{" "}

      <Link
        to="/signup"
        style={{
          color: "#22c55e",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Sign Up
      </Link>

    </p>


  </div>


</div>


);

}

const inputStyle = {

width: "100%",
padding: "14px",
marginBottom: "18px",
backgroundColor: "#111",
border: "1px solid #333",
color: "#fff",
borderRadius: "8px",
outline: "none",
boxSizing: "border-box",
fontSize: "15px",

};

const buttonStyle = {

width: "100%",
padding: "14px",
backgroundColor: "#22c55e",
color: "#000",
border: "none",
borderRadius: "8px",
fontWeight: "700",
cursor: "pointer",
fontSize: "15px",

};

export default Login;
