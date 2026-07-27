import React from "react";
import { Link, useLocation } from "react-router-dom";


function ConfirmTransfer() {

  const location = useLocation();

  const transfer = location.state;



  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >


      {/* Logo */}
      <Link
        to="/dashboard"
        style={{
          position: "absolute",
          top: "35px",
          left: "50px",
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
          width:"450px",
          backgroundColor:"#1a1a1a",
          padding:"40px",
          borderRadius:"15px",
          border:"1px solid #2a2a2a",
          boxShadow:"0 0 20px rgba(34,197,94,0.15)",
        }}
      >


        <h1
          style={{
            color:"#22c55e",
            textAlign:"center",
          }}
        >
          Confirm Transfer
        </h1>


        <p
          style={{
            color:"#999",
            textAlign:"center",
            marginBottom:"30px",
          }}
        >
          Are you sure these details are correct?
        </p>



        <div
          style={{
            backgroundColor:"#111",
            padding:"25px",
            borderRadius:"12px",
            border:"1px solid #333",
            textAlign:"center",
            marginBottom:"25px",
          }}
        >

          <p style={{color:"#888"}}>
            Amount
          </p>
        
        <h2
            style={{
            color:"#22c55e",
            fontSize:"36px",
            margin:0,
        }}
        >
            ₦{Number(transfer?.amount || 0).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}
        </h2>
        
        </div>


        <div
          style={{
            backgroundColor:"#111",
            padding:"20px",
            borderRadius:"12px",
            border:"1px solid #333",
            marginBottom:"25px",
          }}
        >

          <Detail
            label="Recipient"
            value={transfer?.recipient}
          />

          <Detail
            label="Bank"
            value={transfer?.bank}
          />

          <Detail
            label="Account Number"
            value={transfer?.accountNumber}
          />

          <Detail
            label="Description"
            value={transfer?.description || "None"}
          />


        </div>



        <button style={confirmButton}>
          Confirm Transfer
        </button>



        <Link
          to="/send-money"
          style={{
            textDecoration:"none",
          }}
        >

          <button style={cancelButton}>
            ← Edit Transfer
          </button>

        </Link>


      </div>


    </div>
  );
}



function Detail({label,value}) {

  return(
    <div
      style={{
        display:"flex",
        justifyContent:"space-between",
        marginBottom:"15px",
      }}
    >

      <span style={{color:"#888"}}>
        {label}
      </span>

      <span style={{fontWeight:"600"}}>
        {value}
      </span>

    </div>
  );
}



const confirmButton = {
  width:"100%",
  padding:"14px",
  backgroundColor:"#22c55e",
  color:"#000",
  border:"none",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",
  marginBottom:"15px",
};


const cancelButton = {
  width:"100%",
  padding:"14px",
  backgroundColor:"transparent",
  color:"#22c55e",
  border:"1px solid #22c55e",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",
};



export default ConfirmTransfer;