import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function PayBillsPin() {
  const [pin, setPin] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedBill,
    provider,
    accountNumber,
    amount,
  } = location.state || {};


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
      alert("Payment information missing.");
      return;
    }


    if (pin !== currentUser.pin) {
      alert("Incorrect PIN");
      return;
    }


    const billAmount = Number(amount);


    if (billAmount <= 0) {
      alert("Invalid payment amount.");
      return;
    }


    if (billAmount > currentUser.balance) {
      alert("Insufficient balance.");
      return;
    }



    const newTransaction = {

      name:
        `${selectedBill} Payment`,

      date:
        new Date().toLocaleDateString(),

      amount:
        Number(billAmount),

      type:
        "debit",

      method:
        "Wallet Balance",

      description:
        `${provider} - ${accountNumber}`,

      transactionId:
        "TXN" +
        Math.floor(
          Math.random() * 1000000
        ),

    };



    const updatedUser = {

      ...currentUser,

      balance:
        currentUser.balance - billAmount,


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



    navigate(
      "/pay-bill-success",
      {
        state: {

          transactionId:
            newTransaction.transactionId,

          selectedBill,

          provider,

          accountNumber,

          amount:
            billAmount,

        }
      }
    );


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
        color:"#fff",
      }}
    >


      <Link
        to="/pay-bills"
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
          }}
        >
          Enter Transaction PIN
        </h1>


        <p
          style={{
            color:"#999",
          }}
        >
          Confirm your bill payment.
        </p>



        <div
          style={{
            backgroundColor:"#111",
            padding:"20px",
            borderRadius:"10px",
            margin:"25px 0",
          }}
        >

          <p
            style={{
              color:"#888",
            }}
          >
            {selectedBill}
          </p>


          <h2
            style={{
              color:"#22c55e",
            }}
          >
            ₦
            {Number(amount || 0)
              .toLocaleString("en-NG")}
          </h2>


          <small
            style={{
              color:"#999",
            }}
          >
            {provider}
          </small>


        </div>



        <input
          type="password"
          maxLength="4"
          inputMode="numeric"
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
          to="/pay-bills"
          style={{
            textDecoration:"none",
          }}
        >

          <button
            style={secondaryButton}
          >
            ← Back
          </button>

        </Link>


      </div>


    </div>

  );

}



const inputStyle = {

  width:"100%",
  padding:"14px",
  marginBottom:"15px",
  backgroundColor:"#111",
  border:"1px solid #333",
  borderRadius:"8px",
  color:"#fff",
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
  marginTop:"15px",
  backgroundColor:"transparent",
  color:"#22c55e",
  border:"1px solid #22c55e",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",

};



export default PayBillsPin;