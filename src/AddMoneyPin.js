import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AddMoneyPin() {

  const [pin, setPin] = useState("");

  const navigate = useNavigate();
  const location = useLocation();


  const amount = location.state?.amount;


  const handleContinue = () => {

    const currentUser =
      JSON.parse(
        localStorage.getItem("swiftWalletCurrentUser")
      );


    if (!currentUser) {
      alert("User session not found.");
      return;
    }


    if (!amount) {
      alert("Amount information missing.");
      return;
    }


    if (pin !== currentUser.pin) {
      alert("Incorrect PIN");
      return;
    }


    const newAmount = Number(amount);


    const newTransaction = {

      name: "Wallet Top Up",

      date:
        new Date().toLocaleDateString(),

      amount:
        "+ ₦" +
        newAmount.toLocaleString("en-NG"),

      type: "credit",

      method: "Debit Card",

      transactionId:
        "TXN" +
        Math.floor(
          Math.random() * 1000000
        ),

    };



    const updatedUser = {

      ...currentUser,

      balance:
        currentUser.balance + newAmount,

      transactions: [

        ...(currentUser.transactions || []),

        newTransaction,

      ],

    };



    const users =
      JSON.parse(
        localStorage.getItem("swiftWalletUsers")
      ) || [];



    const updatedUsers =
      users.map((user) =>

        user.email === updatedUser.email

        ? updatedUser

        : user

      );



    localStorage.setItem(
      "swiftWalletUsers",
      JSON.stringify(updatedUsers)
    );


    localStorage.setItem(
      "swiftWalletCurrentUser",
      JSON.stringify(updatedUser)
    );



    navigate("/add-money-success", {
        state: {
        amount: newAmount,
        transaction: newTransaction,
        newBalance: updatedUser.balance,
        },
    });

    window.scrollTo(0,0);

  };



  return (

    <div
      style={{
        backgroundColor:"#0d0d0d",
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        color:"#fff",
      }}
    >


      <Link
        to="/dashboard"
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
            color:"#000",
            fontWeight:"bold",
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
          width:"420px",
          backgroundColor:"#1a1a1a",
          padding:"40px",
          borderRadius:"15px",
          border:"1px solid #2a2a2a",
          textAlign:"center",
        }}
      >


        <h1
          style={{
            color:"#22c55e",
            marginBottom:"10px",
          }}
        >
          Enter Transaction PIN
        </h1>


        <p
          style={{
            color:"#aaa",
            marginBottom:"25px",
          }}
        >
          Enter your PIN to complete adding money.
        </p>



        <div
          style={{
            backgroundColor:"#111",
            padding:"15px",
            borderRadius:"10px",
            marginBottom:"20px",
          }}
        >

          <p
            style={{
              color:"#888",
              margin:0,
            }}
          >
            Amount
          </p>


          <h2
            style={{
              color:"#22c55e",
              margin:0,
            }}
          >
            ₦
            {Number(amount || 0)
              .toLocaleString("en-NG")}
          </h2>


        </div>




        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e)=>
            setPin(e.target.value)
          }
          style={inputStyle}
        />



        <button
          onClick={handleContinue}
          style={buttonStyle}
        >
          Confirm Payment
        </button>



        <Link
          to="/add-money"
          style={{
            textDecoration:"none",
          }}
        >

          <button
            style={{
              ...secondaryButton,
              marginTop:"15px",
            }}
          >
            ← Back to Add Money
          </button>


        </Link>


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
  borderRadius:"8px",
  color:"#fff",
  fontSize:"15px",
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



const secondaryButton = {

  width:"100%",
  padding:"14px",
  backgroundColor:"transparent",
  color:"#22c55e",
  border:"1px solid #22c55e",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",

};



export default AddMoneyPin;