import React from "react";
import { Link, useLocation } from "react-router-dom";

function PayBillSuccess() {

  const location = useLocation();

  const data = location.state || {};

  return (

    <div
      style={{
        backgroundColor:"#0d0d0d",
        minHeight:"100vh",
        color:"#fff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}
    >

      <div
        style={{
          width:"420px",
          backgroundColor:"#1a1a1a",
          border:"1px solid #2a2a2a",
          borderRadius:"15px",
          padding:"40px",
          textAlign:"center",
        }}
      >

        <div
          style={{
            width:"70px",
            height:"70px",
            backgroundColor:"#22c55e",
            borderRadius:"50%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            margin:"0 auto 25px",
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
          }}
        >
          Payment Successful
        </h1>


        <p
          style={{
            color:"#999",
            marginTop:"15px",
          }}
        >
          Your bill payment has been completed successfully.
        </p>



        <div
          style={{
            backgroundColor:"#111",
            padding:"20px",
            borderRadius:"10px",
            marginTop:"25px",
            textAlign:"left",
          }}
        >

          <p>
            Service:
            <strong> {data.selectedBill || "Bill Payment"}</strong>
          </p>


          <p>
            Provider:
            <strong> {data.provider || "-"}</strong>
          </p>


          <p>
            Account:
            <strong> {data.accountNumber || "-"}</strong>
          </p>


          <p>
            Amount:
            <strong style={{color:"#22c55e"}}>
              {" "}
              ₦{Number(data.amount || 0).toLocaleString("en-NG")}
            </strong>
          </p>


          <p>
            Transaction ID:
            <strong>
              {" "}
              {data.transactionId || "-"}
            </strong>
          </p>


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
              marginTop:"30px",
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


export default PayBillSuccess;