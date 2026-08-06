import React, { useState } from "react";
import { Link } from "react-router-dom";

function TransactionHistory() {
  const currentUser =
    JSON.parse(localStorage.getItem("swiftWalletCurrentUser")) || {};

  const transactions =
    currentUser.transactions?.slice().reverse() || [];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const getAmount = (amount) => {
    if (typeof amount === "number") {
      return amount;
    }

    return Number(
      String(amount).replace(/[^\d]/g, "")
    );
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Credit" && transaction.type === "credit") ||
      (filter === "Debit" && transaction.type === "debit");

    const matchesSearch =
      transaction.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });


  const moneyIn = transactions
    .filter(
      (transaction) =>
        transaction.type === "credit"
    )
    .reduce(
      (total, transaction) =>
        total + getAmount(transaction.amount),
      0
    );


  const moneyOut = transactions
    .filter(
      (transaction) =>
        transaction.type === "debit"
    )
    .reduce(
      (total, transaction) =>
        total + getAmount(transaction.amount),
      0
    );


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
          padding:"25px 50px",
          borderBottom:"1px solid #222",
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
          maxWidth:"750px",
          margin:"50px auto",
          padding:"0 20px",
        }}
      >

        <h1
          style={{
            color:"#22c55e",
            fontSize:"38px",
          }}
        >
          Transaction History
        </h1>


        <p
          style={{
            color:"#999",
            marginBottom:"35px",
          }}
        >
          View all wallet activity.
        </p>


        <div
          style={{
            ...cardStyle,
            display:"flex",
            justifyContent:"space-between",
            marginBottom:"30px",
          }}
        >

          <div>
            <p style={labelStyle}>
              Money In
            </p>

            <h2
              style={{
                color:"#22c55e",
                margin:0,
              }}
            >
              + ₦{moneyIn.toLocaleString("en-NG")}
            </h2>
          </div>


          <div>
            <p style={labelStyle}>
              Money Out
            </p>

            <h2
              style={{
                color:"#ff5f5f",
                margin:0,
              }}
            >
              - ₦{moneyOut.toLocaleString("en-NG")}
            </h2>
          </div>

        </div>


        <div style={cardStyle}>

          <select
            style={inputStyle}
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >

            <option value="All">
              All Transactions
            </option>

            <option value="Credit">
              Money In
            </option>

            <option value="Debit">
              Money Out
            </option>

          </select>


          <input
            style={inputStyle}
            placeholder="Search transactions"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>


        <div
          style={{
            ...cardStyle,
            marginTop:"30px",
          }}
        >

          <h2 style={titleStyle}>
            Transactions
          </h2>


          {filteredTransactions.length === 0 ? (

            <p style={{color:"#999"}}>
              No transactions found.
            </p>

          ) : (

            filteredTransactions.map((transaction,index)=>(

              <div
                key={index}
                style={{
                  padding:"20px 0",
                  borderBottom:
                    index === filteredTransactions.length - 1
                    ? "none"
                    : "1px solid #2a2a2a",
                }}
              >

                <div
                  style={{
                    display:"flex",
                    justifyContent:"space-between",
                  }}
                >

                  <div>

                    <strong>
                      {transaction.name}
                    </strong>


                    <p
                      style={{
                        color:"#888",
                        margin:"6px 0",
                        fontSize:"14px",
                      }}
                    >
                      {transaction.date}
                    </p>


                    <p
                      style={{
                        color:"#aaa",
                        margin:"5px 0",
                        fontSize:"14px",
                      }}
                    >

                      {transaction.bank &&
                        `Bank: ${transaction.bank}`}


                      {transaction.description &&
                        ` ${transaction.description}`}


                      {transaction.method &&
                        ` Method: ${transaction.method}`}

                    </p>


                    <small
                      style={{
                        color:"#666",
                      }}
                    >
                      ID: {transaction.transactionId}
                    </small>

                  </div>


                  <span
                    style={{
                      color:
                        transaction.type === "credit"
                        ? "#22c55e"
                        : "#ff5f5f",
                      fontWeight:"700",
                    }}
                  >
                    {transaction.type === "credit"
                      ? "+"
                      : "-"}
                    ₦
                    {getAmount(transaction.amount).toLocaleString("en-NG", {
                      minimumFractionDigits:2,
                    })}
                  </span>


                </div>

              </div>

            ))

          )}

        </div>


        <Link
          to="/dashboard"
          onClick={()=>window.scrollTo(0,0)}
          style={{
            textDecoration:"none",
          }}
        >

          <button
            style={{
              ...buttonStyle,
              marginTop:"30px",
            }}
          >
            ← Back to Dashboard
          </button>

        </Link>


      </div>

    </div>
  );
}


const cardStyle = {
  backgroundColor:"#1a1a1a",
  border:"1px solid #2a2a2a",
  borderRadius:"15px",
  padding:"30px",
};


const titleStyle = {
  color:"#22c55e",
};


const labelStyle = {
  color:"#999",
};


const inputStyle = {
  width:"100%",
  padding:"14px",
  marginBottom:"18px",
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


export default TransactionHistory;