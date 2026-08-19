import React, {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";


function EnterPin() {
  const [pin, setPin] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const transferData =
    location.state;


  const handleContinue =
    async () => {

      /*
        GET CURRENT USER
      */
      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "swiftWalletCurrentUser"
          )
        );


      if (!currentUser) {
        alert(
          "User session not found."
        );

        return;
      }


      if (!transferData) {
        alert(
          "Transfer information missing."
        );

        return;
      }


      if (pin.length !== 4) {
        alert(
          "Please enter your 4-digit PIN."
        );

        return;
      }


      setLoading(true);


      try {

        /*
          VERIFY PIN WITH BACKEND
        */
        const pinResponse =
          await fetch(
            "http://localhost:5000/api/auth/verify-pin",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                userId:
                  currentUser.id,

                pin,
              }),
            }
          );


        const pinData =
          await pinResponse.json();


        if (!pinResponse.ok) {
          alert(
            pinData.message ||
              "Incorrect PIN."
          );

          setLoading(false);

          return;
        }


        /*
          MAKE THE TRANSFER
        */
        const transferResponse =
          await fetch(
            "http://localhost:5000/api/transfers",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                senderId:
                  currentUser.id,

                recipientAccountNumber:
                  transferData.accountNumber,

                amount:
                  transferData.amount,

                description:
                  transferData.description ||
                  "Transfer",
              }),
            }
          );


        const transferResult =
          await transferResponse.json();


        if (!transferResponse.ok) {
          alert(
            transferResult.message ||
              "Unable to complete transfer."
          );

          setLoading(false);

          return;
        }


        /*
          UPDATE THE LOCAL SESSION
          WITH THE NEW BALANCE
        */
        const updatedUser = {
          ...currentUser,

          account: {
            ...(currentUser.account ||
              {}),

            balance:
              transferResult.newBalance.toString(),
          },
        };


        localStorage.setItem(
          "swiftWalletCurrentUser",
          JSON.stringify(
            updatedUser
          )
        );


        /*
          GO TO SUCCESS PAGE
        */
        navigate(
          "/transfer-success",
          {
            state: {
              transferData,

              transaction:
                transferResult.transaction,

              newBalance:
                transferResult.newBalance,
            },
          }
        );

      } catch (error) {

        console.error(
          "Transfer error:",
          error
        );

        alert(
          "Unable to connect to the Swift Wallet server."
        );

      } finally {

        setLoading(false);

      }
    };


  return (
    <div
      style={{
        backgroundColor:
          "#0d0d0d",

        minHeight:
          "100vh",

        display:
          "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        position:
          "relative",
      }}
    >

      <Link
        to="/confirm-transfer"
        state={transferData}
        style={{
          position:
            "absolute",

          top:
            "35px",

          left:
            "50px",

          display:
            "flex",

          alignItems:
            "center",

          gap:
            "10px",

          textDecoration:
            "none",
        }}
      >

        <div
          style={{
            width:
              "40px",

            height:
              "40px",

            backgroundColor:
              "#22c55e",

            borderRadius:
              "10px",

            display:
              "flex",

            justifyContent:
              "center",

            alignItems:
              "center",

            fontWeight:
              "bold",

            color:
              "#000",
          }}
        >
          SW
        </div>


        <span
          style={{
            color:
              "#fff",

            fontSize:
              "20px",

            fontWeight:
              "700",
          }}
        >
          Swift Wallet
        </span>

      </Link>


      <div
        style={{
          width:
            "420px",

          backgroundColor:
            "#1a1a1a",

          padding:
            "40px",

          borderRadius:
            "15px",

          border:
            "1px solid #2a2a2a",

          textAlign:
            "center",
        }}
      >

        <h1
          style={{
            color:
              "#22c55e",
          }}
        >
          Enter Transaction PIN
        </h1>


        <p
          style={{
            color:
              "#aaa",
          }}
        >
          Enter your 4-digit PIN to complete transfer.
        </p>


        <input
          type="password"

          inputMode="numeric"

          maxLength="4"

          placeholder="Enter PIN"

          value={pin}

          onChange={(e) => {

            const value =
              e.target.value.replace(
                /\D/g,
                ""
              );

            setPin(value);

          }}

          style={inputStyle}

          disabled={loading}
        />


        <button
          onClick={
            handleContinue
          }

          style={{
            ...buttonStyle,

            opacity:
              loading ? 0.7 : 1,

            cursor:
              loading
                ? "not-allowed"
                : "pointer",
          }}

          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Confirm Transfer"}
        </button>

      </div>

    </div>
  );
}


const inputStyle = {
  width:
    "100%",

  padding:
    "14px",

  marginTop:
    "20px",

  marginBottom:
    "20px",

  backgroundColor:
    "#111",

  border:
    "1px solid #333",

  borderRadius:
    "8px",

  color:
    "#fff",

  boxSizing:
    "border-box",

  fontSize:
    "16px",

  outline:
    "none",
};


const buttonStyle = {
  width:
    "100%",

  padding:
    "14px",

  backgroundColor:
    "#22c55e",

  color:
    "#000",

  border:
    "none",

  borderRadius:
    "8px",

  fontWeight:
    "700",

  cursor:
    "pointer",
};


export default EnterPin;