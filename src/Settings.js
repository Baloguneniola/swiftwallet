import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight
} from "lucide-react";


function Settings() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem(
      "swiftWalletUser"
    );

    localStorage.removeItem(
      "swiftWalletCurrentUser"
    );

    localStorage.removeItem(
      "swiftWalletSignup"
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
        padding:"50px 20px",
      }}
    >


      <div
        style={{
          maxWidth:"650px",
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



        <h1
          style={{
            marginTop:"35px",
            fontSize:"38px",
          }}
        >
          Settings
        </h1>



        <p
          style={{
            color:"#999",
            marginBottom:"35px",
          }}
        >
          Manage your Swift Wallet account and preferences.
        </p>







        <SettingsSection
          title="Account"
        >


          <SettingItem
            icon={<User size={20}/>}
            title="Profile"
            description="View and update your personal details"
            onClick={() =>
              navigate("/profile")
            }
          />





        </SettingsSection>








        <SettingsSection
          title="Security"
        >


          <SettingItem
            icon={<Lock size={20}/>}
            title="Change PIN"
            description="Update your wallet security PIN"
            onClick={() =>
              navigate("/change-pin")
            }
          />



          <SettingItem
            icon={<Shield size={20}/>}
            title="Manage Account Protection"
            description="Keep your account secure"
            onClick={() =>
              navigate("/manage-account-protection")
            }
          />


        </SettingsSection>








        <SettingsSection
          title="Support"
        >


          <SettingItem
            icon={<HelpCircle size={20}/>}
            title="Customer Support"
            description="Get help with your Swift Wallet"
            onClick={() =>
              navigate("/support")
            }
          />



        </SettingsSection>









        <SettingsSection
          title="Legal"
        >


          <SettingItem
            icon={<FileText size={20}/>}
            title="Privacy Policy"
            description="Learn how we protect your data"
            onClick={() =>
              navigate("/privacy")
            }
          />



          <SettingItem
            icon={<FileText size={20}/>}
            title="Terms & Conditions"
            description="View Swift Wallet terms"
            onClick={() =>
              navigate("/terms")
            }
          />


        </SettingsSection>








        <button
          onClick={handleLogout}
          style={{
            width:"100%",
            marginTop:"30px",
            padding:"15px",
            backgroundColor:"transparent",
            color:"#ff5f5f",
            border:"1px solid #ff5f5f",
            borderRadius:"10px",
            fontWeight:"700",
            cursor:"pointer",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"10px",
            fontSize:"16px",
          }}
        >

          <LogOut size={20}/>

          Log Out

        </button>





      </div>


    </div>

  );

}







function SettingsSection({
  title,
  children
}) {

  return (

    <div
      style={{
        marginBottom:"30px",
      }}
    >


      <h2
        style={{
          fontSize:"18px",
          marginBottom:"15px",
          color:"#22c55e",
        }}
      >
        {title}
      </h2>



      <div
        style={{
          backgroundColor:"#1a1a1a",
          border:"1px solid #2a2a2a",
          borderRadius:"15px",
          overflow:"hidden",
        }}
      >

        {children}

      </div>


    </div>

  );

}







function SettingItem({
  icon,
  title,
  description,
  onClick
}) {

  return (

    <button
      onClick={onClick}
      style={{
        width:"100%",
        background:"transparent",
        border:"none",
        borderBottom:"1px solid #2a2a2a",
        color:"#fff",
        padding:"20px",
        display:"flex",
        alignItems:"center",
        cursor:"pointer",
        textAlign:"left",
      }}
    >


      <div
        style={{
          width:"40px",
          height:"40px",
          backgroundColor:"#22c55e",
          color:"#000",
          borderRadius:"10px",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          marginRight:"15px",
        }}
      >

        {icon}

      </div>




      <div
        style={{
          flex:1,
        }}
      >

        <h3
          style={{
            margin:"0 0 5px",
            fontSize:"16px",
          }}
        >
          {title}
        </h3>


        <p
          style={{
            margin:0,
            color:"#888",
            fontSize:"14px",
          }}
        >
          {description}
        </p>


      </div>




      <ChevronRight
        size={20}
        color="#888"
      />


    </button>

  );

}


export default Settings;