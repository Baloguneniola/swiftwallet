import React, { useState } from "react";
import { Link } from "react-router-dom";

function PayBills() {
  const [selectedBill, setSelectedBill] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 50px",
          borderBottom: "1px solid #222",
        }}
      >
        <Link
          to="/dashboard"
          onClick={() => window.scrollTo(0, 0)}
          style={{
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
              fontWeight: "bold",
              color: "#000",
            }}
          >
            SW
          </div>

          <span
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Swift Wallet
          </span>
        </Link>
      </div>


      {/* Main */}
      <div
        style={{
          maxWidth: "700px",
          margin: "50px auto",
          padding: "0 20px",
        }}
      >

        <h1
          style={{
            color: "#22c55e",
            fontSize: "38px",
            marginBottom: "10px",
          }}
        >
          Pay Bills
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "35px",
          }}
        >
          Pay your everyday bills quickly and securely.
        </p>



        {/* Popular Services */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "30px",
          }}
        >

          <h3
            style={{
              color: "#22c55e",
              marginBottom: "20px",
            }}
          >
            Popular Services
          </h3>


          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "15px",
            }}
          >

            {[
              {
                name: "Electricity",
                icon: "⚡",
              },
              {
                name: "DSTV",
                icon: "📺",
              },
              {
                name: "Wi-Fi",
                icon: "📶",
              },
              {
                name: "Airtime",
                icon: "📱",
              },
            ].map((service) => (

              <button
                key={service.name}
                onClick={() => setSelectedBill(service.name)}
                style={{
                  backgroundColor:
                    selectedBill === service.name
                      ? "#22c55e"
                      : "#111",

                  color:
                    selectedBill === service.name
                      ? "#000"
                      : "#fff",

                  border: "1px solid #333",
                  borderRadius: "10px",
                  padding: "18px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                {service.icon} {service.name}
              </button>

            ))}

          </div>

        </div>



        {/* Bill Details */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "30px",
          }}
        >

          <h3
            style={{
              color: "#22c55e",
              marginBottom: "20px",
            }}
          >
            Bill Details
          </h3>



          {/* Dropdown */}
          <div
            style={{
              position: "relative",
            }}
          >

            <select
              style={inputStyle}
              value={selectedBill}
              onChange={(e) => setSelectedBill(e.target.value)}
            >

              <option value="">
                Choose a bill
              </option>

              <option value="Electricity">
                ⚡ Electricity
              </option>

              <option value="DSTV">
                📺 DSTV
              </option>

              <option value="Wi-Fi">
                📶 Wi-Fi
              </option>

              <option value="Airtime">
                📱 Airtime
              </option>

            </select>


            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "40%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#ffff",
                fontSize: "12px",
              }}
            >
              ▼
            </span>

          </div>



          <input
            type="text"
            placeholder={
              selectedBill === "Electricity"
                ? "Provider (e.g. IKEDC)"
                : selectedBill === "DSTV"
                ? "Provider (e.g. DSTV)"
                : selectedBill === "Airtime"
                ? "Network (e.g. MTN)"
                : "Provider"
            }
            style={inputStyle}
          />



          <input
            type="text"
            placeholder={
              selectedBill === "Electricity"
                ? "Meter Number"
                : selectedBill === "DSTV"
                ? "Smart Card Number"
                : selectedBill === "Airtime"
                ? "Phone Number"
                : "Account Number"
            }
            style={inputStyle}
          />



          <input
            type="text"
            placeholder="Amount (₦)"
            style={inputStyle}
            value={
              amount
                ? Number(amount).toLocaleString("en-NG")
                : ""
            }
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, "");

              if (!isNaN(value)) {
                setAmount(value);
              }
            }}
          />


          <button style={buttonStyle}>
            Pay Bill
          </button>

        </div>

                {/* Recent Payments */}
        <div
          style={{
            backgroundColor:"#1a1a1a",
            border:"1px solid #2a2a2a",
            borderRadius:"15px",
            padding:"30px",
          }}
        >

          <h3
            style={{
              color:"#22c55e",
              marginBottom:"20px",
            }}
          >
            Recent Payments
          </h3>


          {[
            {
              service:"Electricity",
              amount:"- ₦12,000",
              date:"Today",
            },
            {
              service:"DSTV",
              amount:"- ₦8,500",
              date:"Yesterday",
            },
            {
              service:"MTN Airtime",
              amount:"- ₦2,000",
              date:"Last Week",
            },

          ].map((payment)=>(

            <div
              key={payment.service}
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                borderBottom:"1px solid #2a2a2a",
                padding:"15px 0",
              }}
            >

              <div>

                <div>
                  {payment.service}
                </div>


                <small
                  style={{
                    color:"#888",
                  }}
                >
                  {payment.date}
                </small>

              </div>


              <span
                style={{
                  color:"#ff5f5f",
                  fontWeight:"700",
                }}
              >
                {payment.amount}
              </span>


            </div>

          ))}


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




const inputStyle = {

  width:"100%",
  padding:"14px 50px 14px 14px",
  marginBottom:"18px",
  backgroundColor:"#111",
  border:"1px solid #333",
  color:"#fff",
  borderRadius:"8px",
  outline:"none",
  fontSize:"15px",
  boxSizing:"border-box",
  appearance:"none",

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


export default PayBills;