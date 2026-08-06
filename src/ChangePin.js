import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, CheckCircle } from "lucide-react";

function ChangePin() {

  const navigate = useNavigate();

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);



  const changePin = () => {

    const currentUser =
      JSON.parse(
        localStorage.getItem("swiftWalletCurrentUser")
      );


    if (!currentUser) {
      setMessage("User session not found.");
      return;
    }



    if (oldPin !== currentUser.pin) {

      setMessage("Current PIN is incorrect.");
      return;

    }



    if (!/^\d{4}$/.test(newPin)) {

      setMessage("New PIN must be exactly 4 digits.");
      return;

    }



    if (newPin !== confirmPin) {

      setMessage("PINs do not match.");
      return;

    }



    const updatedUser = {
      ...currentUser,
      pin: newPin,
    };



    const users =
      JSON.parse(
        localStorage.getItem("swiftWalletUsers")
      ) || [];



    const updatedUsers =
      users.map((user) =>
        user.email === updatedUser.email
          ? updatedUser
          : user
      );



    localStorage.setItem(
      "swiftWalletUsers",
      JSON.stringify(updatedUsers)
    );


    localStorage.setItem(
      "swiftWalletCurrentUser",
      JSON.stringify(updatedUser)
    );



    setSuccess(true);
    setMessage("PIN changed successfully.");



    setTimeout(() => {

      navigate("/profile");

    },1500);


  };



  return (

    <div
      style={{
        backgroundColor:"#0d0d0d",
        minHeight:"100vh",
        color:"#fff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"20px",
      }}
    >


      <div
        style={{
          width:"420px",
          backgroundColor:"#1a1a1a",
          border:"1px solid #2a2a2a",
          borderRadius:"16px",
          padding:"40px",
        }}
      >


        <Link
          to="/profile"
          style={{
            color:"#22c55e",
            textDecoration:"none",
            fontWeight:"600",
          }}
        >
          ← Back to Profile
        </Link>



        <div
          style={{
            textAlign:"center",
            marginTop:"25px",
          }}
        >

          <Lock
            size={45}
            color="#22c55e"
          />


          <h1
            style={{
              color:"#22c55e",
            }}
          >
            Change PIN
          </h1>


          <p
            style={{
              color:"#999",
            }}
          >
            Update your transaction PIN securely.
          </p>


        </div>




        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Current PIN"
          value={oldPin}
          onChange={(e)=>setOldPin(e.target.value)}
          style={inputStyle}
        />



        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="New PIN"
          value={newPin}
          onChange={(e)=>setNewPin(e.target.value)}
          style={inputStyle}
        />



        <input
          type="password"
          inputMode="numeric"
          maxLength="4"
          placeholder="Confirm New PIN"
          value={confirmPin}
          onChange={(e)=>setConfirmPin(e.target.value)}
          style={inputStyle}
        />



        {
          message && (

            <div
              style={{
                marginTop:"20px",
                padding:"12px",
                borderRadius:"8px",
                backgroundColor:
                  success
                  ? "#123d22"
                  : "#3d1212",
                color:
                  success
                  ? "#22c55e"
                  : "#ff5f5f",
                textAlign:"center",
              }}
            >

              {
                success &&
                <CheckCircle
                  size={18}
                  style={{
                    verticalAlign:"middle",
                    marginRight:"5px",
                  }}
                />
              }

              {message}

            </div>

          )
        }




        <button
          onClick={changePin}
          style={buttonStyle}
        >
          Update PIN
        </button>



      </div>


    </div>

  );

}



const inputStyle = {

  width:"100%",
  padding:"14px",
  marginTop:"15px",
  backgroundColor:"#111",
  color:"#fff",
  border:"1px solid #333",
  borderRadius:"8px",
  boxSizing:"border-box",
  outline:"none",

};



const buttonStyle = {

  width:"100%",
  marginTop:"25px",
  padding:"14px",
  backgroundColor:"#22c55e",
  color:"#000",
  border:"none",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",

};



export default ChangePin;