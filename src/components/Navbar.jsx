import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();


  const currentUser =
    JSON.parse(
      localStorage.getItem("swiftWalletCurrentUser")
    );


  const handleLogout = () => {

    localStorage.removeItem(
      "swiftWalletCurrentUser"
    );

    localStorage.removeItem(
      "swiftWalletUser"
    );

    localStorage.removeItem(
      "swiftWalletSignup"
    );


    navigate("/login");

    window.scrollTo(0,0);

  };



  return (

    <nav
      style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexWrap:"wrap",
        padding:"18px 40px",
        backgroundColor:"rgba(13,13,13,0.95)",
        backdropFilter:"blur(10px)",
        borderBottom:"1px solid #1a1a1a",
        position:"sticky",
        top:0,
        zIndex:1000,
      }}
    >



      <Link
        to="/"
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
            width:"38px",
            height:"38px",
            backgroundColor:"#22c55e",
            borderRadius:"10px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontWeight:"700",
            fontSize:"15px",
            color:"#000",
          }}
        >
          SW
        </div>



        <span
          style={{
            fontWeight:"700",
            fontSize:"18px",
            color:"#fff",
          }}
        >
          Swift Wallet
        </span>


      </Link>





      <div
        style={{
          display:"flex",
          gap:"30px",
          alignItems:"center",
          flexWrap:"wrap",
        }}
      >



        <Link
          to="/"
          onClick={() => window.scrollTo(0,0)}
          style={linkStyle}
        >
          Home
        </Link>



        <Link
          to="/features"
          style={linkStyle}
        >
          Features
        </Link>





        {
          currentUser ? (

            <>


              <Link
                to="/dashboard"
                style={{
                  ...linkStyle,
                  display:"flex",
                  alignItems:"center",
                  gap:"7px",
                }}
              >

                <LayoutDashboard size={16}/>

                Dashboard

              </Link>



              <button
                onClick={handleLogout}
                style={{
                  backgroundColor:"#22c55e",
                  color:"#000",
                  border:"none",
                  padding:"11px 22px",
                  borderRadius:"8px",
                  fontWeight:"700",
                  fontSize:"14px",
                  cursor:"pointer",
                  display:"flex",
                  alignItems:"center",
                  gap:"8px",
                }}
              >

                <LogOut size={16}/>

                Log Out

              </button>


            </>


          ) : (

            <>


              <Link
                to="/login"
                style={linkStyle}
              >
                Log In
              </Link>





              <Link
                to="/signup"
                style={{
                  textDecoration:"none",
                }}
              >

                <button
                  style={{
                    backgroundColor:"#22c55e",
                    color:"#000",
                    border:"none",
                    padding:"11px 22px",
                    borderRadius:"8px",
                    fontWeight:"700",
                    fontSize:"14px",
                    cursor:"pointer",
                  }}
                >
                  Open an Account
                </button>


              </Link>


            </>

          )


        }



      </div>


    </nav>

  );

};




const linkStyle = {

  color:"#aaa",
  textDecoration:"none",
  fontSize:"15px",
  fontWeight:"500",

};



export default Navbar;