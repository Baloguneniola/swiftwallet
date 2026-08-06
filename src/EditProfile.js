import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();


  const currentUser =
    JSON.parse(
      localStorage.getItem("swiftWalletCurrentUser")
    ) || {};



  const [name, setName] =
    useState(currentUser.name || "");


  const [phone, setPhone] =
    useState(currentUser.phone || "");


  const [country, setCountry] =
    useState(currentUser.country || "Nigeria");



  const saveProfile = () => {


    const updatedUser = {

      ...currentUser,

      name,
      phone,
      country,

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



    localStorage.setItem(
      "swiftWalletUser",
      name
    );



    alert("Profile updated successfully");


    navigate("/profile");

    window.scrollTo(0,0);

  };



  return (

    <div
      style={{
        backgroundColor:"#0d0d0d",
        minHeight:"100vh",
        color:"#fff",
        padding:"50px 20px",
      }}
    >


      <div
        style={{
          maxWidth:"500px",
          margin:"0 auto",
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
            backgroundColor:"#1a1a1a",
            border:"1px solid #2a2a2a",
            borderRadius:"16px",
            padding:"40px",
            marginTop:"30px",
          }}
        >


          <h1
            style={{
              color:"#22c55e",
              marginBottom:"30px",
            }}
          >
            Edit Profile
          </h1>



          <label
            style={labelStyle}
          >
            Full Name
          </label>


          <input
            style={inputStyle}
            value={name}
            onChange={(e)=>
              setName(e.target.value)
            }
            placeholder="Enter your name"
          />



          <label
            style={labelStyle}
          >
            Email
          </label>


          <input
            style={{
              ...inputStyle,
              opacity:"0.6",
            }}
            value={currentUser.email || ""}
            disabled
          />



          <label
            style={labelStyle}
          >
            Phone Number
          </label>


          <input
            style={inputStyle}
            value={phone}
            onChange={(e)=>
              setPhone(e.target.value)
            }
            placeholder="Enter phone number"
          />



          <label
            style={labelStyle}
          >
            Country
          </label>


          <input
            style={inputStyle}
            value={country}
            onChange={(e)=>
              setCountry(e.target.value)
            }
            placeholder="Enter country"
          />



          <button
            onClick={saveProfile}
            style={buttonStyle}
          >
            Save Changes
          </button>


        </div>


      </div>


    </div>

  );

}



const labelStyle = {

  display:"block",
  color:"#999",
  marginTop:"20px",
  marginBottom:"8px",
  fontSize:"14px",

};



const inputStyle = {

  width:"100%",
  padding:"14px",
  backgroundColor:"#111",
  color:"#fff",
  border:"1px solid #333",
  borderRadius:"8px",
  boxSizing:"border-box",
  fontSize:"15px",

};



const buttonStyle = {

  width:"100%",
  marginTop:"30px",
  padding:"14px",
  backgroundColor:"#22c55e",
  color:"#000",
  border:"none",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",

};



export default EditProfile;