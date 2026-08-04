import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


function EnterPin() {

  const [pin, setPin] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const transferData = location.state;



  const handleContinue = () => {


    const currentUser = JSON.parse(
      localStorage.getItem("swiftWalletCurrentUser")
    );


    if (!currentUser) {

      alert("User session not found.");

      return;

    }



    if (pin === currentUser.pin) {


    navigate("/confirm-transfer", {
      state: {
        ...transferData,
        completed: true,
        transactionId:
          "TXN" + Math.floor(Math.random() * 1000000),
      },
    });


    } else {


      alert("Incorrect PIN");


    }


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
      }}
    >


      {/* Swift Wallet Logo */}

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





      {/* Card */}

      <div
        style={{
          width:"420px",
          backgroundColor:"#1a1a1a",
          padding:"40px",
          borderRadius:"15px",
          border:"1px solid #2a2a2a",
          boxShadow:"0 0 20px rgba(34,197,green,0.15)",
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
            marginBottom:"30px",
          }}
        >
          Enter your 4-digit PIN to complete this transfer.
        </p>





        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e)=>setPin(e.target.value)}
          style={inputStyle}
        />





        <button
          onClick={handleContinue}
          style={buttonStyle}
        >
          Continue
        </button>





        <Link
          to="/confirm-transfer"
          state={transferData}
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
            ← Back to Transfer
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
  fontSize:"15px",
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
  fontSize:"15px",
  cursor:"pointer",

};



export default EnterPin;