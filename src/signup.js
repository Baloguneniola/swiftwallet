import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleSignup = () => {

    const {
      name,
      email,
      password,
      confirmPassword
    } = signupData;


    if (!name || !email || !password || !confirmPassword) {
      alert("Please complete all fields");
      return;
    }


    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    const existingUsers =
      JSON.parse(localStorage.getItem("swiftWalletUsers")) || [];


    const userExists = existingUsers.find(
      (user) => user.email === email
    );


    if (userExists) {
      alert("Account already exists");
      return;
    }



    const newUser = {

      id: Date.now(),

      name: name,

      email: email,

      password: password,


      balance: 50000,


      transactions: [
        {
          name: "Welcome to Swift Wallet",
          date: "Today",
          amount: "+ ₦50,000",
        }
      ],


      topUps: [],


      payments: [],


      accountNumber:
        Math.floor(1000000000 + Math.random() * 9000000000)

    };



    localStorage.setItem(
      "swiftWalletUsers",
      JSON.stringify([
        ...existingUsers,
        newUser
      ])
    );



    // Save temporary signup user
    localStorage.setItem(
      "pendingUserEmail",
      email
    );


    navigate("/verify-email");

  };



  return (

    <div
      style={{
        backgroundColor:"#0d0d0d",
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        color:"#fff",
      }}
    >


      <Link
        to="/"
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
            alignItems:"center",
            justifyContent:"center",
            fontWeight:"bold",
            color:"#000",
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
          width:"380px",
          backgroundColor:"#1a1a1a",
          border:"1px solid #2a2a2a",
          borderRadius:"15px",
          padding:"40px",
          boxShadow:"0 0 20px rgba(34,197,94,0.15)",
          textAlign:"center",
        }}
      >


        <h1
          style={{
            color:"#22c55e",
            fontSize:"32px",
            marginBottom:"10px",
          }}
        >
          Create Account
        </h1>



        <p
          style={{
            color:"#999",
            marginBottom:"30px",
          }}
        >
          Join Swift Wallet and start sending money instantly.
        </p>




        <input
          type="text"
          placeholder="Full Name"
          autoComplete="off"
          style={inputStyle}
          value={signupData.name}
          onChange={(e)=>
            setSignupData({
              ...signupData,
              name:e.target.value
            })
          }
        />



        <input
          type="email"
          placeholder="Email Address"
          autoComplete="off"
          style={inputStyle}
          value={signupData.email}
          onChange={(e)=>
            setSignupData({
              ...signupData,
              email:e.target.value
            })
          }
        />



        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          style={inputStyle}
          value={signupData.password}
          onChange={(e)=>
            setSignupData({
              ...signupData,
              password:e.target.value
            })
          }
        />



        <input
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          style={inputStyle}
          value={signupData.confirmPassword}
          onChange={(e)=>
            setSignupData({
              ...signupData,
              confirmPassword:e.target.value
            })
          }
        />




        <button
          onClick={handleSignup}
          style={buttonStyle}
        >
          Continue
        </button>




        <p
          style={{
            color:"#888",
            marginTop:"25px",
            fontSize:"14px",
          }}
        >
          Already have an account?{" "}


          <Link
            to="/login"
            style={{
              color:"#22c55e",
              textDecoration:"none",
              fontWeight:"600",
            }}
          >
            Log In
          </Link>


        </p>



      </div>


    </div>

  );
}



const inputStyle = {

  width:"100%",
  padding:"14px",
  marginBottom:"18px",
  backgroundColor:"#111",
  border:"1px solid #333",
  color:"#fff",
  borderRadius:"8px",
  outline:"none",
  boxSizing:"border-box",
  fontSize:"15px",

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



export default Signup;