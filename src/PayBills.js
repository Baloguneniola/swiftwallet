import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Zap,
  Wifi,
  Tv,
  Phone,
  Droplets,
  ArrowUpRight
} from "lucide-react";


function PayBills() {

  const navigate = useNavigate();


  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "swiftWalletCurrentUser"
      )
    ) || null;



  const [selectedBill, setSelectedBill] =
    useState("");

  const [provider, setProvider] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [amount, setAmount] =
    useState("");



  const balance =
    currentUser?.balance || 0;



  /*
    PROVIDERS BASED ON BILL TYPE
  */
  const providers = {

    Electricity: [
      "Ikeja Electric",
      "Eko Electricity",
      "Abuja Electricity"
    ],

    Water: [
      "Lagos Water Corporation",
      "Abuja Water Board"
    ],

    DSTV: [
      "DStv"
    ],

    "Wi-Fi": [
      "MTN Fibre",
      "Airtel Fibre",
      "Spectranet",
      "Smile"
    ],

    Airtime: [
      "MTN",
      "Airtel",
      "Glo",
      "9mobile"
    ]

  };



  /*
    GET PROVIDERS FOR SELECTED BILL
  */
  const availableProviders =
    providers[selectedBill] || [];



  const recentPayments =
    currentUser?.transactions
      ?.filter(
        transaction =>
          transaction.type === "debit"
      )
      .slice(-5)
      .reverse() || [];





  const handleContinue = () => {

    if (
      !selectedBill ||
      !provider ||
      !accountNumber ||
      !amount
    ) {

      alert(
        "Please complete all fields."
      );

      return;

    }



    const billAmount =
      Number(amount);



    if (billAmount <= 0) {

      alert(
        "Enter a valid amount."
      );

      return;

    }



    if (billAmount > balance) {

      alert(
        "Insufficient balance."
      );

      return;

    }



    navigate(
      "/pay-bills-pin",
      {
        state: {
          selectedBill,
          provider,
          accountNumber,
          amount: billAmount
        }
      }
    );

  };





  const getBillIcon = () => {

    switch (selectedBill) {

      case "Electricity":
        return <Zap size={22} />;

      case "Water":
        return <Droplets size={22} />;

      case "DSTV":
        return <Tv size={22} />;

      case "Wi-Fi":
        return <Wifi size={22} />;

      case "Airtime":
        return <Phone size={22} />;

      default:
        return null;

    }

  };





  return (

    <div
      style={styles.page}
    >



      <div
        style={styles.navbar}
      >


        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(0, 0)
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


      </div>





      <div
        style={styles.container}
      >



        <h1
          style={styles.heading}
        >

          Pay Bills

        </h1>



        <p
          style={styles.subtitle}
        >
          Pay your everyday bills quickly and securely.
        </p>





        <div
          style={styles.card}
        >


          <div
            style={styles.sectionHeader}
          >

            Available Balance

          </div>




          <h2
            style={styles.balance}
          >

            ₦
            {
              Number(balance)
                .toLocaleString(
                  "en-NG"
                )
            }

          </h2>


        </div>






        <div
          style={{
            ...styles.card,
            marginTop: "25px"
          }}
        >



          <div
            style={styles.sectionHeader}
          >


            {
              getBillIcon()
            }


            <h2
              style={{
                margin: 0
              }}
            >
              Pay a Bill
            </h2>


          </div>





          <p
            style={styles.text}
          >
            Select a service and enter your payment details.
          </p>




          {/* BILL TYPE */}

          <div
            style={{
              position: "relative"
            }}
          >

            <select
              style={{
                ...styles.input,
                appearance: "none",
                cursor: "pointer"
              }}
              value={selectedBill}
              onChange={(e) => {

                setSelectedBill(
                  e.target.value
                );

                /*
                  RESET PROVIDER WHEN
                  BILL TYPE CHANGES
                */
                setProvider("");

              }}
            >

              <option value="">
                Choose Service
              </option>

              <option value="Electricity">
                Electricity
              </option>

              <option value="Water">
                Water
              </option>

              <option value="DSTV">
                DSTV
              </option>

              <option value="Wi-Fi">
                Wi-Fi
              </option>

              <option value="Airtime">
                Airtime
              </option>

            </select>


            <span
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                pointerEvents: "none",
                color: "#fff",
                fontSize: "12px"
              }}
            >
              ▼
            </span>


          </div>





          {/* PROVIDER */}

          <div
            style={{
              position: "relative"
            }}
          >

            <select
              style={{
                ...styles.input,
                appearance: "none",
                cursor:
                  selectedBill
                    ? "pointer"
                    : "not-allowed",
                opacity:
                  selectedBill
                    ? 1
                    : 0.6
              }}
              value={provider}
              onChange={(e) =>
                setProvider(
                  e.target.value
                )
              }
              disabled={!selectedBill}
            >

              <option value="">

                {
                  selectedBill
                    ? "Choose Provider"
                    : "Choose a service first"
                }

              </option>


              {
                availableProviders.map(
                  (providerName) => (

                    <option
                      key={providerName}
                      value={providerName}
                    >
                      {providerName}
                    </option>

                  )
                )
              }

            </select>


            <span
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                pointerEvents: "none",
                color:
                  selectedBill
                    ? "#fff"
                    : "#666",
                fontSize: "12px"
              }}
            >
              ▼
            </span>

          </div>





          {/* ACCOUNT / PHONE NUMBER */}

          <input
            style={styles.input}
            placeholder="Account / Meter / Phone Number"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(
                e.target.value
              )
            }
          />





          {/* AMOUNT */}

          <input
            style={styles.input}
            placeholder="Amount (₦)"
            value={
              amount
                ?
                Number(amount)
                  .toLocaleString("en-NG")
                :
                ""
            }
            onChange={(e) => {

              const value =
                e.target.value
                  .replace(/,/g, "");


              if (!isNaN(value)) {
                setAmount(value);
              }

            }}
          />





          <button
            style={styles.button}
            onClick={handleContinue}
          >

            Continue

          </button>





        </div>


        <div
          style={{
            ...styles.card,
            marginTop: "30px"
          }}
        >


          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px"
            }}
          >

            Recent Payments

          </h2>





          {
            recentPayments.length === 0

              ?

              (

                <p
                  style={{
                    color: "#888"
                  }}
                >
                  No payments yet.
                </p>

              )

              :

              (

                recentPayments.map(
                  (payment, index) => (


                    <div
                      key={index}
                      style={styles.transaction}
                    >



                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px"
                        }}
                      >



                        <div
                          style={styles.debitIcon}
                        >

                          <ArrowUpRight
                            size={18}
                          />

                        </div>





                        <div>

                          <strong>
                            {
                              payment.name ||
                              "Bill Payment"
                            }
                          </strong>



                          <p
                            style={{
                              color: "#888",
                              margin: "5px 0 0",
                              fontSize: "13px"
                            }}
                          >

                            {
                              payment.date ||
                              "Unknown date"
                            }

                          </p>



                        </div>




                      </div>





                      <span
                        style={{
                          color: "#ff5f5f",
                          fontWeight: "700"
                        }}
                      >

                        -

                        ₦
                        {
                          Number(
                            String(
                              payment.amount
                            )
                              .replace(
                                /[^\d]/g,
                                ""
                              )
                          )
                            .toLocaleString(
                              "en-NG",
                              {
                                minimumFractionDigits:
                                  2
                              }
                            )
                        }


                      </span>



                    </div>


                  )
                )

              )

          }



        </div>





        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(0, 0)
          }
          style={{
            textDecoration: "none"
          }}
        >

          <button
            style={{
              ...styles.button,
              marginTop: "30px"
            }}
          >

            ← Back to Dashboard

          </button>


        </Link>





      </div>


    </div>

  );

}





function WalletIcon() {

  return (

    <div
      style={{
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        backgroundColor: "#22c55e",
        color: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "800"
      }}
    >

      ₦

    </div>

  );

}






const styles = {


  page: {
    backgroundColor: "#0d0d0d",
    minHeight: "100vh",
    color: "#fff"
  },



  navbar: {
    padding: "20px 50px",
    borderBottom: "1px solid #222"
  },



  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none"
  },



  logo: {
    width: "40px",
    height: "40px",
    backgroundColor: "#22c55e",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontWeight: "800"
  },



  brand: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "700"
  },



  container: {
    maxWidth: "700px",
    margin: "45px auto",
    padding: "0 20px"
  },



  heading: {
    color: "#22c55e",
    fontSize: "36px",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },



  subtitle: {
    color: "#999",
    marginBottom: "35px"
  },



  card: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "25px"
  },



  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },



  balance: {
    color: "#22c55e",
    fontSize: "38px",
    marginBottom: 0
  },



  text: {
    color: "#999"
  },



  input: {
    width: "100%",
    padding: "15px",
    marginTop: "12px",
    marginBottom: "15px",
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "10px",
    color: "#fff",
    boxSizing: "border-box",
    outline: "none"
  },



  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#22c55e",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer"
  },



  transaction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #2a2a2a"
  },



  debitIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#3b1111",
    color: "#ff5f5f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }



};


export default PayBills;