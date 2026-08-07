import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Copy,
  User,
  LogOut,
  Settings,
  Send,
  Plus,
  Receipt,
  History,
  Snowflake,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";


function Dashboard() {

  const navigate = useNavigate();


  const [showBalance, setShowBalance] =
    React.useState(true);

  const [showCardNumber, setShowCardNumber] =
    React.useState(false);

  const [cardFrozen, setCardFrozen] =
    React.useState(false);

  const [copied, setCopied] =
    React.useState(false);

  const [cardCopied, setCardCopied] =
    React.useState(false);

  const [menuOpen, setMenuOpen] =
    React.useState(false);



  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "swiftWalletCurrentUser"
      )
    ) || {};



  const userName =
    currentUser.name ||
    localStorage.getItem(
      "swiftWalletUser"
    ) ||
    "User";



  const balance =
    Number(
      currentUser.balance
    ) || 0;



  const accountNumber =
    currentUser.accountNumber ||
    "N/A";



  const cardNumber =
    currentUser.cardNumber ||
    "4532 8890 4456 7890";



  const expiryDate =
    currentUser.expiryDate ||
    "12/29";



  const transactions =
    Array.isArray(
      currentUser.transactions
    )
      ?
      currentUser.transactions
        .slice(-5)
        .reverse()
      :
      [];



  const formatAmount = (amount) => {

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

    navigator.clipboard.writeText(
      accountNumber
    );

    setCopied(true);


    setTimeout(() => {
      setCopied(false);
    }, 2000);

  };



  const copyCardNumber = () => {

    navigator.clipboard.writeText(
      cardNumber
    );

    setCardCopied(true);


    setTimeout(() => {
      setCardCopied(false);
    }, 2000);

  };



  const logout = () => {

    localStorage.removeItem(
      "swiftWalletUser"
    );


    localStorage.removeItem(
      "swiftWalletCurrentUser"
    );


    localStorage.removeItem(
      "swiftWalletSignup"
    );


    navigate(
      "/login"
    );


    window.scrollTo(
      0,
      0
    );

  };



  const openTransaction = (
    transaction
  ) => {

    navigate(
      "/transaction-details",
      {
        state: {
          transaction
        }
      }
    );


    window.scrollTo(
      0,
      0
    );

  };



  return (

    <div
      style={styles.page}
    >


      <nav
        style={styles.navbar}
      >

        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(
              0,
              0
            )
          }
          style={styles.logoContainer}
        >

          <div
            style={styles.logo}
          >
            SW
          </div>


          <span
            style={styles.brand}
          >
            Swift Wallet
          </span>


        </Link>



        <div
          style={{
            position: "relative"
          }}
        >

          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            style={styles.accountButton}
          >

            <User size={18} />

            Account

          </button>




          {
            menuOpen &&
            (

              <div
                style={styles.dropdown}
              >

                <MenuLink
                  to="/settings"
                  icon={
                    <Settings size={17} />
                  }
                  text="Settings"
                />


                <button
                  onClick={logout}
                  style={styles.logoutButton}
                >

                  <LogOut size={17} />

                  Logout

                </button>


              </div>

            )
          }


        </div>


      </nav>



      <main
        style={styles.container}
      >


        <h1
          style={styles.title}
        >
          Welcome back, {userName}
        </h1>


        <p
          style={styles.subtitle}
        >
          Here's an overview of your Swift Wallet account.
        </p>




        <div
          style={styles.topGrid}
        >


          <div
            style={styles.balanceCard}
          >

            <div
              style={styles.cardHeader}
            >

              <span>
                Available Balance
              </span>


              <button
                onClick={() =>
                  setShowBalance(
                    !showBalance
                  )
                }
                style={styles.iconButton}
              >

                {
                  showBalance
                    ?
                    <Eye size={20} />
                    :
                    <EyeOff size={20} />
                }


              </button>


            </div>



            <h2
              style={styles.balance}
            >

              {
                showBalance
                  ?
                  `₦${balance.toLocaleString(
                    "en-NG",
                    {
                      minimumFractionDigits: 2
                    }
                  )}`
                  :
                  "₦••••••"
              }

            </h2>


            <p
              style={styles.balanceLabel}
            >
              Swift Wallet Account
            </p>


          </div>

          <div
            style={styles.walletCard}
          >

            <div
              style={styles.walletHeader}
            >

              <div>

                <h2>
                  Swift Wallet
                </h2>


                <p>
                  Virtual Debit Card
                </p>

              </div>


              <CreditCard size={34} />

            </div>




            <h3
              style={styles.cardNumber}
            >

              {
                showCardNumber
                  ?
                  cardNumber
                  :
                  "•••• •••• •••• 7890"
              }

            </h3>




            <div
              style={styles.cardDetails}
            >

              <div>

                <small>
                  Card Holder
                </small>

                <p>
                  {userName}
                </p>

              </div>



              <div>

                <small>
                  Expiry
                </small>

                <p>
                  {expiryDate}
                </p>

              </div>



              <div>

                <small>
                  Status
                </small>

                <p>
                  {
                    cardFrozen
                      ?
                      "Frozen"
                      :
                      "Active"
                  }
                </p>

              </div>


            </div>





            <div
              style={styles.cardActions}
            >

              <button
                style={styles.darkButton}
                onClick={() =>
                  setShowCardNumber(
                    !showCardNumber
                  )
                }
              >

                {
                  showCardNumber
                    ?
                    "Hide"
                    :
                    "Show"
                }

              </button>




              <button
                style={styles.darkButton}
                onClick={copyCardNumber}
              >

                <Copy size={15} />

                {
                  cardCopied
                    ?
                    "Copied"
                    :
                    "Copy"
                }

              </button>




              <button
                style={styles.darkButton}
                onClick={() =>
                  setCardFrozen(
                    !cardFrozen
                  )
                }
              >

                <Snowflake size={15} />

                {
                  cardFrozen
                    ?
                    "Unfreeze"
                    :
                    "Freeze"
                }

              </button>


            </div>


          </div>


        </div>





        <div
          style={styles.accountBar}
        >

          <div>

            <span
              style={styles.accountTitle}
            >
              Account Number
            </span>


            <strong>
              {accountNumber}
            </strong>


          </div>



          <button
            onClick={copyAccountNumber}
            style={styles.copyButton}
          >

            <Copy size={16} />

            {
              copied
                ?
                "Copied"
                :
                "Copy"
            }


          </button>


        </div>





        <h2
          style={styles.sectionTitle}
        >
          Quick Actions
        </h2>





        <div
          style={styles.actionGrid}
        >


          <ActionCard
            to="/send-money"
            icon={
              <Send size={22} />
            }
            title="Send Money"
          />


          <ActionCard
            to="/add-money"
            icon={
              <Plus size={22} />
            }
            title="Add Money"
          />


          <ActionCard
            to="/pay-bills"
            icon={
              <Receipt size={22} />
            }
            title="Pay Bills"
          />


          <ActionCard
            to="/transaction-history"
            icon={
              <History size={22} />
            }
            title="Transaction History"
          />


        </div>





        <div
          style={styles.transactionHeader}
        >

          <h2>
            Recent Transactions
          </h2>


          <Link
            to="/transaction-history"
            onClick={() =>
              window.scrollTo(
                0,
                0
              )
            }
            style={styles.viewAll}
          >
            View All
          </Link>


        </div>





        {
          transactions.length === 0

            ?

            <p
              style={{
                color: "#888"
              }}
            >
              No transactions yet.
            </p>


            :


            transactions.map(
              (
                transaction,
                index
              ) => (

                <div
                  key={index}
                  onClick={() =>
                    openTransaction(
                      transaction
                    )
                  }
                  style={styles.transaction}
                >


                  <div
                    style={styles.transactionLeft}
                  >


                    <div
                      style={
                        transaction.type === "credit"
                          ?
                          styles.creditIcon
                          :
                          styles.debitIcon
                      }
                    >

                      {
                        transaction.type === "credit"
                          ?
                          <ArrowDownLeft size={18} />
                          :
                          <ArrowUpRight size={18} />
                      }


                    </div>




                    <div>

                      <strong>
                        {
                          transaction.name ||
                          "Transaction"
                        }
                      </strong>


                      <p
                        style={styles.date}
                      >
                        {
                          transaction.date ||
                          "Unknown date"
                        }
                      </p>


                    </div>


                  </div>




                  <span
                    style={
                      transaction.type === "credit"
                        ?
                        styles.creditAmount
                        :
                        styles.debitAmount
                    }
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
                      formatAmount(
                        transaction.amount
                      )
                        .toLocaleString(
                          "en-NG",
                          {
                            minimumFractionDigits: 2
                          }
                        )
                    }


                  </span>


                </div>

              )

            )

        }


      </main>


    </div>

  );

}

function ActionCard({
  to,
  icon,
  title
}) {

  return (

    <Link
      to={to}
      onClick={() =>
        window.scrollTo(
          0,
          0
        )
      }
      style={{
        textDecoration: "none"
      }}
    >

      <div
        style={styles.actionCard}
      >

        <div
          style={styles.actionIcon}
        >
          {icon}
        </div>


        <span>
          {title}
        </span>


      </div>


    </Link>

  );

}





function MenuLink({
  to,
  icon,
  text
}) {

  return (

    <Link
      to={to}
      onClick={() =>
        window.scrollTo(
          0,
          0
        )
      }
      style={styles.menuLink}
    >

      {icon}

      {text}

    </Link>

  );

}





const styles = {


  page: {
    minHeight: "100vh",
    backgroundColor: "#0d0d0d",
    color: "#fff"
  },


  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 50px",
    backgroundColor: "#0d0d0d",
    borderBottom: "1px solid #222",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },


  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none"
  },


  logo: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    backgroundColor: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    fontWeight: "800"
  },


  brand: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "700"
  },


  accountButton: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    border: "1px solid #333",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "600"
  },


  dropdown: {
    position: "absolute",
    right: 0,
    top: "42px",
    width: "220px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "10px"
  },


  logoutButton: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    background: "transparent",
    color: "#ff5f5f",
    border: "none",
    borderTop: "1px solid #333",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600"
  },


  container: {
    padding: "25px 50px"
  },


  title: {
    fontSize: "32px",
    marginBottom: "5px"
  },


  subtitle: {
    color: "#888",
    marginBottom: "20px"
  },


  topGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "20px",
    alignItems: "stretch",
    marginBottom: "15px"
  },


  balanceCard: {
    backgroundColor: "#181818",
    border: "1px solid #292929",
    borderRadius: "18px",
    padding: "20px",
    minHeight: "170px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },


  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#999"
  },


  iconButton: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer"
  },


  balance: {
    fontSize: "42px",
    color: "#22c55e",
    margin: "10px 0"
  },


  balanceLabel: {
    color: "#777",
    fontSize: "16px"
  },


walletCard: {
background:
"linear-gradient(135deg,#1f2937,#111827)",
color:"#fff",
borderRadius:"20px",
padding:"28px",
minHeight:"190px",
border:"1px solid #333",
boxShadow:"0 15px 30px rgba(0,0,0,0.3)"
},


  walletHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },


  cardNumber: {
    fontSize: "25px",
    letterSpacing: "4px",
    margin: "30px 0"
  },


  cardDetails: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px"
  },


  cardActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "25px"
  },


  darkButton: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "9px 13px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "600"
  },


  accountBar: {
    backgroundColor: "#181818",
    border: "1px solid #292929",
    borderRadius: "15px",
    padding: "18px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px"
  },


  accountTitle: {
    display: "block",
    color: "#888",
    fontSize: "13px",
    marginBottom: "6px"
  },


  copyButton: {
    backgroundColor: "#22c55e",
    color: "#000",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "600"
  },


  sectionTitle: {
    marginBottom: "20px"
  },


  actionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(190px,1fr))",
    gap: "18px",
    marginBottom: "55px"
  },


actionCard: {
backgroundColor:"#181818",
border:"1px solid #292929",
borderRadius:"15px",
padding:"22px",
color:"#fff",
display:"flex",
flexDirection:"column",
gap:"15px",
fontWeight:"600",
transition:"0.3s",
cursor:"pointer"
},


  actionIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    backgroundColor: "#22c55e",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },


  transactionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },


  viewAll: {
    color: "#22c55e",
    textDecoration: "none",
    fontWeight: "600"
  },


  transaction: {
    backgroundColor: "#181818",
    border: "1px solid #292929",
    borderRadius: "14px",
    padding: "18px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    cursor: "pointer"
  },


  transactionLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },


  creditIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#123d23",
    color: "#22c55e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },


  debitIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#3b1111",
    color: "#ff5f5f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },


  date: {
    margin: "4px 0 0",
    color: "#888",
    fontSize: "13px"
  },


  creditAmount: {
    color: "#22c55e",
    fontWeight: "700"
  },


  debitAmount: {
    color: "#ff5f5f",
    fontWeight: "700"
  },


  menuLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    color: "#fff",
    textDecoration: "none"
  }

};


export default Dashboard;