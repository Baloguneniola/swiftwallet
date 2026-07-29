import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddMoney() {

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(200350);

  const [showCardForm, setShowCardForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState("saved");

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });


  const [recentTopUps, setRecentTopUps] = useState([
    {
      amount: "+ ₦10,000",
      method: "Debit Card",
      date: "Today",
    },
    {
      amount: "+ ₦25,000",
      method: "Bank Transfer",
      date: "Yesterday",
    },
    {
      amount: "+ ₦5,000",
      method: "Debit Card",
      date: "Last Week",
    },
  ]);


  const handleContinue = () => {

    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    setShowCardForm(true);

  };


  const handleAddMoney = () => {

    if (
      selectedCard === "new" &&
      (
        !cardDetails.name ||
        !cardDetails.number ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      )
    ) {
      alert("Please complete card details");
      return;
    }


    const newAmount = Number(amount);

    setLoading(true);


    setTimeout(() => {

      setBalance(balance + newAmount);


      setRecentTopUps([
        {
          amount: `+ ₦${newAmount.toLocaleString("en-NG")}`,
          method: "Debit Card",
          date: "Just now",
        },
        ...recentTopUps,
      ]);


      setTransactionId(
        "TXN" + Math.floor(Math.random() * 1000000)
      );


      setSuccessMessage(
        "Money added successfully ✅"
      );


      setLoading(false);
      setAmount("");
      setShowCardForm(false);


      setCardDetails({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
      });


    }, 1500);

  };


  return (

    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          padding: "16px 40px",
          borderBottom: "1px solid #222",
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
              alignItems:"center",
              justifyContent:"center",
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


      {/* CONTENT */}

      <div
        style={{
          maxWidth:"700px",
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
          Add Money
        </h1>


        <p
          style={{
            color:"#999",
            marginBottom:"35px",
          }}
        >
          Add funds to your Swift Wallet securely.
        </p>


        {/* BALANCE */}

        <div style={cardStyle}>

          <p style={labelStyle}>
            Current Balance
          </p>

          <h2
            style={{
              color:"#22c55e",
              fontSize:"40px",
              margin:0,
            }}
          >
            ₦{balance.toLocaleString("en-NG")}.00
          </h2>

        </div>


        {/* PAYMENT */}

        <div
          style={{
            ...cardStyle,
            marginTop:"25px",
          }}
        >

          <h2 style={titleStyle}>
            💳 Card Payment
          </h2>

          <p style={textStyle}>
            Enter the amount and select your payment method.
          </p>


          <input
            style={inputStyle}
            placeholder="Amount (₦)"
            autoComplete="off"
            name="wallet_amount"
            value={
              amount
              ? Number(amount).toLocaleString("en-NG")
              : ""
            }
            onChange={(e)=>{

              const value =
              e.target.value.replace(/,/g,"");

              if(!isNaN(value)){
                setAmount(value);
              }

            }}
          />


          {!showCardForm && (

            <button
              style={buttonStyle}
              onClick={handleContinue}
            >
              Continue
            </button>

          )}


          {showCardForm && (

            <div
              style={{
                marginTop:"25px",
              }}
            >

              <h3
                style={{
                  color:"#22c55e",
                  marginBottom:"20px",
                }}
              >
                Choose Payment Method
              </h3>

                            {/* SAVED CARD */}

              <div
                style={cardOption}
                onClick={() => setSelectedCard("saved")}
              >

                <input
                  type="radio"
                  checked={selectedCard === "saved"}
                  readOnly
                />

                <div>

                  <p
                    style={{
                      margin:0,
                      fontWeight:"700",
                    }}
                  >
                    💳 Visa Card
                  </p>

                  <small
                    style={{
                      color:"#888",
                    }}
                  >
                    **** **** **** 4242
                  </small>

                </div>

              </div>



              {/* NEW CARD */}

              <div
                style={cardOption}
                onClick={() => setSelectedCard("new")}
              >

                <input
                  type="radio"
                  checked={selectedCard === "new"}
                  readOnly
                />

                <div>

                  <p
                    style={{
                      margin:0,
                      fontWeight:"700",
                    }}
                  >
                    ➕ Add New Card
                  </p>

                  <small
                    style={{
                      color:"#888",
                    }}
                  >
                    Enter your card details manually
                  </small>

                </div>

              </div>



              {selectedCard === "new" && (

                <div>

                  <input
                    style={inputStyle}
                    placeholder="Card Holder Name"
                    autoComplete="off"
                    name="wallet_name"
                    value={cardDetails.name}
                    onChange={(e)=>
                      setCardDetails({
                        ...cardDetails,
                        name:e.target.value,
                      })
                    }
                  />


                  <input
                    style={inputStyle}
                    placeholder="Card Number"
                    autoComplete="off"
                    name="wallet_number"
                    value={cardDetails.number}
                    onChange={(e)=>
                      setCardDetails({
                        ...cardDetails,
                        number:e.target.value,
                      })
                    }
                  />


                  <div
                    style={{
                      display:"flex",
                      gap:"15px",
                    }}
                  >

                    <input
                      style={inputStyle}
                      placeholder="Expiry Date"
                      autoComplete="off"
                      name="wallet_expiry"
                      value={cardDetails.expiry}
                      onChange={(e)=>
                        setCardDetails({
                          ...cardDetails,
                          expiry:e.target.value,
                        })
                      }
                    />


                    <input
                      style={inputStyle}
                      placeholder="CVV"
                      autoComplete="off"
                      name="wallet_cvv"
                      value={cardDetails.cvv}
                      onChange={(e)=>
                        setCardDetails({
                          ...cardDetails,
                          cvv:e.target.value,
                        })
                      }
                    />

                  </div>

                </div>

              )}



              <button
                style={buttonStyle}
                onClick={handleAddMoney}
                disabled={loading}
              >
                {
                  loading
                  ? "Processing..."
                  : "Add Money"
                }
              </button>


            </div>

          )}



          {successMessage && (

            <div
              style={{
                marginTop:"20px",
                textAlign:"center",
              }}
            >

              <p
                style={{
                  color:"#22c55e",
                  fontWeight:"700",
                }}
              >
                {successMessage}
              </p>


              <small
                style={{
                  color:"#888",
                }}
              >
                Transaction ID: {transactionId}
              </small>

            </div>

          )}

        </div>



        {/* RECENT TOP UPS */}

        <div
          style={{
            ...cardStyle,
            marginTop:"25px",
          }}
        >

          <h2>
            Recent Top Ups
          </h2>


          {recentTopUps.map((item,index)=>(

            <div
              key={index}
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                padding:"15px 0",
                borderBottom:"1px solid #2a2a2a",
              }}
            >

              <div>

                <p
                  style={{
                    margin:0,
                  }}
                >
                  {item.method}
                </p>


                <small
                  style={{
                    color:"#888",
                  }}
                >
                  {item.date}
                </small>

              </div>


              <span
                style={{
                  color:"#22c55e",
                  fontWeight:"700",
                }}
              >
                {item.amount}
              </span>

            </div>

          ))}

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
  marginBottom:"10px",
};


const labelStyle = {
  color:"#999",
};


const textStyle = {
  color:"#999",
  lineHeight:"1.6",
};


const inputStyle = {
  width:"100%",
  padding:"14px",
  marginBottom:"15px",
  backgroundColor:"#111",
  border:"1px solid #333",
  borderRadius:"8px",
  color:"#fff",
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


const cardOption = {
  backgroundColor:"#111",
  border:"1px solid #333",
  padding:"18px",
  borderRadius:"12px",
  marginBottom:"15px",
  cursor:"pointer",
  display:"flex",
  alignItems:"center",
  gap:"12px",
};


export default AddMoney;