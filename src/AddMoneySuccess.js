import React from "react";
import { Link, useLocation } from "react-router-dom";

function AddMoneySuccess() {
  const location = useLocation();

  const amount =
    location.state?.amount || 0;

  const transaction =
    location.state?.transaction || {};

  const newBalance =
    location.state?.newBalance || 0;


  return (
    <div
      style={{
        backgroundColor:"#0d0d0d",
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"#fff",
        position:"relative",
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
          boxShadow:
            "0 0 20px rgba(34,197,94,0.15)",
        }}
      >

        <div
          style={{
            width:"70px",
            height:"70px",
            margin:"0 auto 20px",
            borderRadius:"50%",
            backgroundColor:"#22c55e",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            color:"#000",
            fontSize:"35px",
            fontWeight:"bold",
          }}
        >
          ✓
        </div>



        <h1
          style={{
            color:"#22c55e",
            marginBottom:"10px",
          }}
        >
          Payment Successful
        </h1>


        <p
          style={{
            color:"#999",
            marginBottom:"30px",
          }}
        >
          Money has been added to your Swift Wallet.
        </p>



        <div
          style={{
            backgroundColor:"#111",
            padding:"20px",
            borderRadius:"12px",
            marginBottom:"20px",
          }}
        >

          <p
            style={{
              color:"#888",
              margin:"0 0 5px",
            }}
          >
            Amount Added
          </p>


          <h2
            style={{
              color:"#22c55e",
              margin:0,
            }}
          >
            ₦
            {Number(amount)
              .toLocaleString("en-NG")}
          </h2>

        </div>



        <div
          style={{
            backgroundColor:"#111",
            padding:"20px",
            borderRadius:"12px",
            marginBottom:"20px",
          }}
        >

          <p
            style={{
              color:"#888",
              margin:"0 0 5px",
            }}
          >
            Transaction ID
          </p>


          <p
            style={{
              margin:0,
              fontWeight:"700",
            }}
          >
            {transaction.transactionId || "N/A"}
          </p>

        </div>



        <div
          style={{
            backgroundColor:"#111",
            padding:"20px",
            borderRadius:"12px",
            marginBottom:"30px",
          }}
        >

          <p
            style={{
              color:"#888",
              margin:"0 0 5px",
            }}
          >
            New Balance
          </p>


          <h2
            style={{
              margin:0,
              color:"#fff",
            }}
          >
            ₦
            {Number(newBalance)
              .toLocaleString("en-NG")}
          </h2>

        </div>



        <Link
          to="/dashboard"
          onClick={() => window.scrollTo(0,0)}
          style={{
            textDecoration:"none",
          }}
        >

          <button
            style={{
              width:"100%",
              padding:"14px",
              backgroundColor:"#22c55e",
              color:"#000",
              border:"none",
              borderRadius:"8px",
              fontWeight:"700",
              cursor:"pointer",
            }}
          >
            Back to Dashboard
          </button>

        </Link>


      </div>

    </div>
  );
}


export default AddMoneySuccess;