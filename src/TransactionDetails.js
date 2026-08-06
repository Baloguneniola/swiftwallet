import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Copy } from "lucide-react";

function TransactionDetails() {

  const location = useLocation();

  const [copied, setCopied] = useState(false);


  const transaction =
    location.state?.transaction || null;



  const copyTransactionId = () => {

    if (!transaction?.transactionId) {
      return;
    }

    navigator.clipboard.writeText(
      transaction.transactionId
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  };



  if (!transaction) {

    return (

      <div
        style={{
          backgroundColor:"#0d0d0d",
          minHeight:"100vh",
          color:"#fff",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          flexDirection:"column",
        }}
      >

        <h2>
          Transaction not found
        </h2>


        <Link
          to="/dashboard"
          style={{
            color:"#22c55e",
            textDecoration:"none",
            marginTop:"20px",
          }}
        >
          Back to Dashboard
        </Link>


      </div>

    );

  }



  const amount =
    typeof transaction.amount === "number"
      ? transaction.amount
      : Number(
          String(transaction.amount || "")
          .replace(/[^\d]/g,"")
        ) || 0;



  const isCredit =
    transaction.type === "credit";



  return (

    <div
      style={{
        backgroundColor:"#0d0d0d",
        minHeight:"100vh",
        color:"#fff",
      }}
    >


      <div
        style={{
          display:"flex",
          alignItems:"center",
          padding:"20px 50px",
          borderBottom:"1px solid #222",
          backgroundColor:"#0d0d0d",
          position:"sticky",
          top:0,
          zIndex:1000,
        }}
      >

        <Link
          to="/dashboard"
          onClick={() => window.scrollTo(0,0)}
          style={{
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


      </div>





      <div
        style={{
          maxWidth:"650px",
          margin:"50px auto",
          padding:"0 20px",
        }}
      >


        <h1
          style={{
            color:"#22c55e",
            fontSize:"38px",
            marginBottom:"10px",
          }}
        >
          Transaction Details
        </h1>



        <p
          style={{
            color:"#999",
            marginBottom:"35px",
          }}
        >
          View complete information about this transaction.
        </p>




        <div
          style={{
            backgroundColor:"#1a1a1a",
            border:"1px solid #2a2a2a",
            borderRadius:"15px",
            padding:"35px",
          }}
        >



          <div
            style={{
              textAlign:"center",
              marginBottom:"35px",
            }}
          >


            <h2
              style={{
                color:
                  isCredit
                  ? "#22c55e"
                  : "#ff5f5f",

                fontSize:"42px",
                margin:"0 0 15px",
              }}
            >

              {isCredit ? "+" : "-"}

              ₦
              {amount.toLocaleString(
                "en-NG",
                {
                  minimumFractionDigits:2,
                }
              )}

            </h2>



            <span
              style={{
                backgroundColor:
                  isCredit
                  ? "#14532d"
                  : "#450a0a",

                color:
                  isCredit
                  ? "#22c55e"
                  : "#ff5f5f",

                padding:"8px 18px",
                borderRadius:"20px",
                fontWeight:"700",
                fontSize:"14px",
              }}
            >
              Successful
            </span>


          </div>





          <Detail
            title="Transaction"
            value={
              transaction.name ||
              "Transaction"
            }
          />


          <Detail
            title="Date"
            value={
              transaction.date ||
              "N/A"
            }
          />



          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              padding:"16px 0",
              borderBottom:"1px solid #2a2a2a",
            }}
          >

            <div>

              <p
                style={{
                  color:"#888",
                  margin:"0 0 6px",
                  fontSize:"14px",
                }}
              >
                Transaction ID
              </p>


              <strong>
                {
                  transaction.transactionId ||
                  "N/A"
                }
              </strong>

            </div>



            <button
              onClick={copyTransactionId}
              style={{
                backgroundColor:"#22c55e",
                color:"#000",
                border:"none",
                padding:"8px 14px",
                borderRadius:"8px",
                display:"flex",
                alignItems:"center",
                gap:"6px",
                cursor:"pointer",
                fontWeight:"600",
              }}
            >

              <Copy size={15}/>

              {
                copied
                ? "Copied"
                : "Copy"
              }

            </button>


          </div>




          <Detail
            title="Payment Method"
            value={
              transaction.method ||
              "Wallet Balance"
            }
          />



          <Detail
            title="Bank"
            value={
              transaction.bank ||
              "N/A"
            }
          />



          <Detail
            title="Account Number"
            value={
              transaction.accountNumber ||
              "N/A"
            }
          />



          <Detail
            title="Description"
            value={
              transaction.description ||
              "No description"
            }
          />



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
            ← Back to Dashboard
          </button>


        </Link>



      </div>


    </div>

  );

}




function Detail({title,value}) {

  return (

    <div
      style={{
        padding:"16px 0",
        borderBottom:"1px solid #2a2a2a",
      }}
    >

      <p
        style={{
          color:"#888",
          margin:"0 0 6px",
          fontSize:"14px",
        }}
      >
        {title}
      </p>


      <strong>
        {value}
      </strong>


    </div>

  );

}



export default TransactionDetails;