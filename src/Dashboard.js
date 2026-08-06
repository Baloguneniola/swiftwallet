import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Copy,
  User,
  LogOut,
  Settings,
  HelpCircle,
  Shield,
  FileText
} from "lucide-react";


function Dashboard() {

  const navigate = useNavigate();

  const [showBalance, setShowBalance] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);



  const currentUser =
    JSON.parse(
      localStorage.getItem("swiftWalletCurrentUser")
    ) || {};



  const userName =
    currentUser.name ||
    localStorage.getItem("swiftWalletUser") ||
    "User";



  const balance =
    Number(currentUser.balance) || 0;



  const accountNumber =
    currentUser.accountNumber || "N/A";



  const transactions =
    Array.isArray(currentUser.transactions)
      ? currentUser.transactions
        .slice(-5)
        .reverse()
      : [];




  const getTransactionAmount = (amount) => {

    if (typeof amount === "number") {
      return amount;
    }


    if (!amount) {
      return 0;
    }


    return (
      Number(
        String(amount)
          .replace(/[^\d]/g, "")
      ) || 0
    );

  };




  const copyAccountNumber = () => {

    navigator.clipboard.writeText(accountNumber);

    setCopied(true);


    setTimeout(() => {
      setCopied(false);
    }, 2000);

  };





  const handleTransactionClick = (transaction) => {

    navigate(
      "/transaction-details",
      {
        state: {
          transaction,
        },
      }
    );


    window.scrollTo(0, 0);

  };





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

    window.scrollTo(0, 0);

  };





  return (

    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
      }}
    >




      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 50px",
          borderBottom: "1px solid #222",
          backgroundColor: "#0d0d0d",
          position: "sticky",
          top: 0,
          zIndex: 1000,
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
              color: "#000",
              fontWeight: "bold",
            }}
          >
            SW
          </div>




          <span
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Swift Wallet
          </span>


        </Link>






        <div
          style={{
            position: "relative",
          }}
        >


          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            style={{
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >

            <User size={18} />

            Account

          </button>





          {
            menuOpen && (

              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "55px",
                  width: "220px",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "12px",
                  padding: "10px",
                  zIndex: 2000,
                }}
              >


                <MenuLink
                  to="/settings"
                  icon={<Settings size={17} />}
                  text="Settings"
                />

                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    padding: "12px",
                    backgroundColor: "transparent",
                    color: "#ff5f5f",
                    border: "none",
                    borderTop: "1px solid #333",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "600",
                  }}
                >

                  <LogOut size={17} />

                  Log Out

                </button>



              </div>

            )
          }


        </div>



      </div>





      <div
        style={{
          padding: "50px 50px",
        }}
      >



        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
          }}
        >
          Welcome back, {userName}
        </h1>



        <p
          style={{
            color: "#999",
            marginBottom: "35px",
          }}
        >
          Here's an overview of your Swift Wallet account.
        </p>




        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "40px",
          }}
        >


          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <p
              style={{
                color: "#999",
              }}
            >
              Available Balance
            </p>


            <button
              onClick={() =>
                setShowBalance(!showBalance)
              }
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >

              {
                showBalance
                  ?
                  <Eye size={22} />
                  :
                  <EyeOff size={22} />
              }


            </button>


          </div>



          <h2
            style={{
              color: "#22c55e",
              fontSize: "42px",
              margin: 0,
            }}
          >

            {
              showBalance
                ?
                `₦${balance.toLocaleString(
                  "en-NG",
                  {
                    minimumFractionDigits: 2,
                  }
                )}`
                :
                "₦••••••••"
            }


          </h2>


        </div>

        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "15px",
            padding: "30px",
            marginBottom: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <div>

            <p
              style={{
                color: "#999",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              Account Number
            </p>


            <h3
              style={{
                margin: 0,
                fontSize: "28px",
                letterSpacing: "1px",
              }}
            >
              {accountNumber}
            </h3>

          </div>




          <button
            onClick={copyAccountNumber}
            style={{
              backgroundColor: "#22c55e",
              color: "#000",
              border: "none",
              padding: "12px 18px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >

            <Copy size={16} />


            {
              copied
                ?
                "Copied!"
                :
                "Copy"
            }


          </button>


        </div>



        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          Quick Actions
        </h2>





        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
            marginBottom: "70px",
          }}
        >


          <ActionLink
            to="/send-money"
            text="Send Money"
          />


          <ActionLink
            to="/add-money"
            text="Add Money"
          />


          <ActionLink
            to="/pay-bills"
            text="Pay Bills"
          />


          <ActionLink
            to="/transaction-history"
            text="Transaction History"
          />


        </div>




        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >

          <h2>
            Recent Transactions
          </h2>



          <Link
            to="/transaction-history"
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View All
          </Link>


        </div>






        {
          transactions.length === 0

            ?

            <p
              style={{
                color: "#888",
              }}
            >
              No transactions yet.
            </p>


            :


            transactions.map(
              (transaction, index) => (

                <div
                  key={index}
                  onClick={() =>
                    handleTransactionClick(transaction)
                  }
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: "12px",
                    padding: "20px 25px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                    cursor: "pointer",
                  }}
                >


                  <div>


                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "6px",
                      }}
                    >

                      {
                        transaction.name ||
                        "Transaction"
                      }

                    </div>




                    <div
                      style={{
                        color: "#888",
                        fontSize: "13px",
                      }}
                    >

                      {
                        transaction.date ||
                        "Unknown date"
                      }

                    </div>


                  </div>






                  <span
                    style={{
                      color:
                        transaction.type === "credit"
                          ?
                          "#22c55e"
                          :
                          "#ff5f5f",

                      fontWeight: "700",
                    }}
                  >

                    {
                      transaction.type === "credit"
                        ?
                        "+"
                        :
                        "-"
                    }


                    ₦


                    {
                      getTransactionAmount(
                        transaction.amount
                      )
                        .toLocaleString(
                          "en-NG",
                          {
                            minimumFractionDigits: 2,
                          }
                        )
                    }


                  </span>


                </div>


              )
            )

        }



      </div>


    </div>

  );

}




function ActionLink({ to, text }) {

  return (

    <Link
      to={to}
      onClick={() => window.scrollTo(0, 0)}
      style={{
        textDecoration: "none",
      }}
    >


      <button
        style={{
          backgroundColor: "#1a1a1a",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: "12px",
          padding: "22px 25px",
          cursor: "pointer",
          fontSize: "16px",
          width: "100%",
          minHeight: "75px",
        }}
      >

        {text}

      </button>


    </Link>

  );

}



function MenuLink({ to, icon, text }) {


  return (

    <Link
      to={to}
      onClick={() => window.scrollTo(0, 0)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "8px",
        fontWeight: "500",
      }}
    >

      {icon}

      {text}


    </Link>


  );

}


export default Dashboard;