import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreatePin() {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const finishSetup = () => {
    const signupData = JSON.parse(
      localStorage.getItem("swiftWalletSignup")
    );

    if (!signupData) {
      alert("Signup information missing.");
      return;
    }

    if (pin.length !== 4 || confirmPin.length !== 4) {
      alert("PIN must be 4 digits.");
      return;
    }

    if (pin !== confirmPin) {
      alert("PINs do not match.");
      return;
    }

    const newUser = {
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      pin,

      balance: 200350,

      accountNumber: Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString(),

      cardNumber:
        "4829 " +
        Math.floor(
          1000 + Math.random() * 9000
        ) +
        " " +
        Math.floor(
          1000 + Math.random() * 9000
        ) +
        " " +
        Math.floor(
          1000 + Math.random() * 9000
        ),

      expiryDate:
        "12/" +
        (29 + Math.floor(Math.random() * 3)),

      cardFrozen: false,

      transactions: [
        {
          name: "Welcome Bonus",
          date: new Date().toLocaleDateString(),
          amount: "+ ₦200,350",
          type: "credit",
          transactionId:
            "TXN" + Math.floor(Math.random() * 1000000),
        },
      ],

      payments: [],
      topUps: [],
    };


    const existingUsers =
      JSON.parse(
        localStorage.getItem("swiftWalletUsers")
      ) || [];


    const userExists =
      existingUsers.some(
        (user) =>
          user.email === newUser.email
      );


    if (userExists) {
      alert("An account with this email already exists.");
      return;
    }


    existingUsers.push(newUser);


    localStorage.setItem(
      "swiftWalletUsers",
      JSON.stringify(existingUsers)
    );


    localStorage.setItem(
      "swiftWalletCurrentUser",
      JSON.stringify(newUser)
    );


    localStorage.removeItem(
      "swiftWalletSignup"
    );


    navigate("/login");

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
        color: "#fff",
      }}
    >

      <Link
        to="/"
        onClick={() => window.scrollTo(0,0)}
        style={{
          position:"absolute",
          top:"35px",
          left:"50px",
          display:"flex",
          alignItems:"center",
          gap:"10px",
          textDecoration:"none",
        }}
      >

        <div
          style={{
            width:"40px",
            height:"40px",
            backgroundColor:"#22c55e",
            borderRadius:"10px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontWeight:"bold",
            color:"#000",
          }}
        >
          SW
        </div>

        <span
          style={{
            color:"#fff",
            fontSize:"20px",
            fontWeight:"700",
          }}
        >
          Swift Wallet
        </span>

      </Link>


      <div
        style={{
          backgroundColor:"#1a1a1a",
          padding:"40px",
          borderRadius:"15px",
          width:"450px",
          textAlign:"center",
          border:"1px solid #2a2a2a",
          boxShadow:
            "0 0 20px rgba(34,197,94,0.15)",
        }}
      >

        <p
          style={{
            color:"#22c55e",
            fontWeight:"600",
          }}
        >
          Step 5 of 5
        </p>


        <h1
          style={{
            color:"#22c55e",
            marginBottom:"10px",
          }}
        >
          Create Your PIN
        </h1>


        <p
          style={{
            color:"#aaa",
            marginBottom:"30px",
          }}
        >
          Create a secure 4-digit PIN to authorise transfers and payments.
        </p>


        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e)=>
            setPin(
              e.target.value.replace(/\D/g,"")
            )
          }
          style={inputStyle}
        />


        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Confirm PIN"
          value={confirmPin}
          onChange={(e)=>
            setConfirmPin(
              e.target.value.replace(/\D/g,"")
            )
          }
          style={inputStyle}
        />


        <button
          onClick={finishSetup}
          style={buttonStyle}
        >
          Finish Setup
        </button>


      </div>

    </div>
  );
}


const inputStyle = {
  width:"100%",
  padding:"14px",
  marginBottom:"18px",
  backgroundColor:"#111",
  border:"1px solid #333",
  color:"#fff",
  borderRadius:"8px",
  outline:"none",
  boxSizing:"border-box",
};


const buttonStyle = {
  width:"100%",
  padding:"14px",
  backgroundColor:"#22c55e",
  color:"#000",
  border:"none",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",
};


export default CreatePin;