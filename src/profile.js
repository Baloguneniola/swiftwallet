import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, LogOut, Copy } from "lucide-react";

function Profile() {

  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);


  const currentUser =
    JSON.parse(
      localStorage.getItem("swiftWalletCurrentUser")
    ) || {};



  const initials =
    currentUser.name
      ? currentUser.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
      : "SW";



  const copyAccountNumber = () => {

    navigator.clipboard.writeText(
      currentUser.accountNumber || ""
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    },2000);

  };



  const handleLogout = () => {

    localStorage.removeItem(
      "swiftWalletCurrentUser"
    );

    localStorage.removeItem(
      "swiftWalletUser"
    );


    navigate("/login");

    window.scrollTo(0,0);

  };



  return (

    <div
      style={{
        backgroundColor:"#0d0d0d",
        minHeight:"100vh",
        color:"#fff",
        padding:"40px 20px",
      }}
    >



      <div
        style={{
          maxWidth:"550px",
          margin:"0 auto",
        }}
      >



        <Link
          to="/dashboard"
          onClick={() => window.scrollTo(0,0)}
          style={{
            color:"#22c55e",
            textDecoration:"none",
            fontWeight:"600",
          }}
        >
          ← Back to Dashboard
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




          <div
            style={{
              textAlign:"center",
            }}
          >

            <div
              style={{
                width:"100px",
                height:"100px",
                borderRadius:"50%",
                backgroundColor:"#22c55e",
                color:"#000",
                fontSize:"36px",
                fontWeight:"700",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                margin:"0 auto 20px",
              }}
            >
              {initials}
            </div>



            <h1
              style={{
                marginBottom:"8px",
              }}
            >
              {currentUser.name || "User"}
            </h1>


            <p
              style={{
                color:"#999",
              }}
            >
              {currentUser.email || "No email"}
            </p>


          </div>







          <div
            style={{
              marginTop:"35px",
            }}
          >


            <ProfileItem
              title="Account Number"
              value={
                currentUser.accountNumber || "N/A"
              }
            />


            <button
              onClick={copyAccountNumber}
              style={{
                width:"100%",
                padding:"12px",
                marginTop:"10px",
                backgroundColor:"#22c55e",
                color:"#000",
                border:"none",
                borderRadius:"8px",
                fontWeight:"700",
                cursor:"pointer",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                gap:"8px",
              }}
            >

              <Copy size={17}/>

              {
                copied
                ?
                "Copied!"
                :
                "Copy Account Number"
              }

            </button>




            <ProfileItem
              title="Account Type"
              value="Premium"
            />



            <ProfileItem
              title="Wallet Balance"
              value={
                `₦${Number(
                  currentUser.balance || 0
                ).toLocaleString("en-NG", {
                  minimumFractionDigits:2,
                })}`
              }
            />


          </div>







          <button
            onClick={() =>
              navigate("/edit-profile")
            }
            style={buttonStyle}
          >

            <User size={18}/>

            Edit Profile

          </button>






          <button
            onClick={() =>
              navigate("/change-pin")
            }
            style={secondaryButton}
          >

            <Lock size={18}/>

            Change PIN

          </button>







          <button
            onClick={handleLogout}
            style={{
              ...secondaryButton,
              borderColor:"#ff5f5f",
              color:"#ff5f5f",
            }}
          >

            <LogOut size={18}/>

            Log Out

          </button>




        </div>


      </div>


    </div>

  );

}





function ProfileItem({title,value}) {

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





const buttonStyle = {

  width:"100%",
  padding:"14px",
  marginTop:"30px",
  backgroundColor:"#22c55e",
  color:"#000",
  border:"none",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  gap:"8px",

};





const secondaryButton = {

  width:"100%",
  padding:"14px",
  marginTop:"15px",
  backgroundColor:"transparent",
  color:"#22c55e",
  border:"1px solid #22c55e",
  borderRadius:"8px",
  fontWeight:"700",
  cursor:"pointer",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  gap:"8px",

};



export default Profile;