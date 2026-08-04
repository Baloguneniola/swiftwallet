import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddMoney() {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("swiftWalletCurrentUser")) || null;


  const [amount, setAmount] = useState("");

  const [balance, setBalance] = useState(
    currentUser?.balance || 0
  );


  const [showCardForm, setShowCardForm] = useState(false);

  const [selectedCard, setSelectedCard] = useState("saved");


  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });


  const recentTopUps =
    currentUser?.transactions
      ?.filter(
        (transaction) =>
          transaction.type === "credit"
      )
      .slice(-5)
      .reverse() || [];



  const handleContinue = () => {

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setShowCardForm(true);

  };



  const handleAddMoney = () => {

    if (!currentUser) {
      alert("User session not found.");
      return;
    }


    if (
      selectedCard === "new" &&
      (
        !cardDetails.name ||
        !cardDetails.number ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      )
    ) {
      alert("Please complete card details.");
      return;
    }


    navigate("/add-money-pin", {
      state: {
        amount: Number(amount),
      },
    });

  };



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
          padding:"16px 40px",
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
          maxWidth:"700px",
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


        <div
          style={{
            ...cardStyle,
            marginTop:"25px",
          }}
        >

          <h2 style={titleStyle}>
            Card Payment
          </h2>


          <p style={textStyle}>
            Enter the amount and select your payment method.
          </p>


          <input
            style={inputStyle}
            placeholder="Amount (₦)"
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

            <>

              <div
                style={cardOption}
                onClick={() =>
                  setSelectedCard("saved")
                }
              >

                <input
                  type="radio"
                  checked={
                    selectedCard === "saved"
                  }
                  readOnly
                />

                <span>
                  Saved Visa Card
                </span>

              </div>



              <div
                style={cardOption}
                onClick={() =>
                  setSelectedCard("new")
                }
              >

                <input
                  type="radio"
                  checked={
                    selectedCard === "new"
                  }
                  readOnly
                />

                <span>
                  Add New Card
                </span>

              </div>

                            {selectedCard === "new" && (

                <>

                  <input
                    style={inputStyle}
                    placeholder="Card Holder Name"
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
                    value={cardDetails.number}
                    onChange={(e)=>
                      setCardDetails({
                        ...cardDetails,
                        number:e.target.value,
                      })
                    }
                  />


                  <input
                    style={inputStyle}
                    placeholder="Expiry Date"
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
                    value={cardDetails.cvv}
                    onChange={(e)=>
                      setCardDetails({
                        ...cardDetails,
                        cvv:e.target.value,
                      })
                    }
                  />

                </>

              )}



              <button
                style={buttonStyle}
                onClick={handleAddMoney}
              >
                Add Money
              </button>


            </>

          )}

        </div>



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
                padding:"15px 0",
                borderBottom:"1px solid #2a2a2a",
              }}
            >

              <div>

                <span>
                  {item.name}
                </span>


                <small
                  style={{
                    display:"block",
                    color:"#888",
                    marginTop:"5px",
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
  padding:"25px",
};



const titleStyle = {
  color:"#22c55e",
};



const labelStyle = {
  color:"#999",
};



const textStyle = {
  color:"#999",
};



const inputStyle = {
  width:"100%",
  padding:"15px",
  marginTop:"10px",
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



const cardOption = {
  backgroundColor:"#111",
  border:"1px solid #333",
  padding:"18px",
  borderRadius:"12px",
  marginBottom:"15px",
  cursor:"pointer",
  display:"flex",
  gap:"12px",
};



export default AddMoney;

