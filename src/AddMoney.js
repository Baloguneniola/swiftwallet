import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Wallet,
  CheckCircle,
  CreditCard,
  ArrowDownLeft,
} from "lucide-react";
import API_URL from "./api";

function AddMoney() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");

  const [balance, setBalance] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showCardForm, setShowCardForm] = useState(false);

  const [selectedCard, setSelectedCard] =
    useState("saved");

  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  /*
    GET CURRENT USER FROM BACKEND

    The backend/database is the source
    of truth for the balance and
    transaction history.
  */
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token =
          localStorage.getItem(
            "swiftWalletToken"
          );

        /*
          USER IS NOT LOGGED IN
        */
        if (!token) {
          navigate("/login");
          return;
        }

        /*
          GET CURRENT USER
        */
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        /*
          TOKEN INVALID / EXPIRED
        */
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          localStorage.removeItem(
            "swiftWalletToken"
          );

          localStorage.removeItem(
            "swiftWalletCurrentUser"
          );

          localStorage.removeItem(
            "swiftWalletUser"
          );

          navigate("/login");

          return;
        }

        /*
          OTHER BACKEND ERROR
        */
        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load your account."
          );
        }

        const user =
          data.user;

        /*
          GET BALANCE FROM DATABASE
        */
        setBalance(
          Number(
            user?.account?.balance
          ) || 0
        );

        /*
          GET TRANSACTIONS FROM DATABASE
        */
        setTransactions(
          Array.isArray(
            user?.transactions
          )
            ? user.transactions
            : []
        );
      } catch (error) {
        console.error(
          "Add Money account loading error:",
          error
        );

        alert(
          "Unable to load your Swift Wallet account."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [navigate]);

  /*
    GET RECENT TOP UPS

    Credit transactions are treated
    as money added to the wallet.
  */
  const recentTopUps =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "credit"
      )
      .slice(0, 5);

  /*
    CONTINUE TO CARD PAYMENT
  */
  const handleContinue = () => {
    if (
      !amount ||
      Number(amount) <= 0
    ) {
      alert(
        "Please enter a valid amount."
      );

      return;
    }

    setShowCardForm(true);
  };

  /*
    CONTINUE TO TRANSACTION PIN
  */
  const handleAddMoney = () => {
    if (!amount || Number(amount) <= 0) {
      alert(
        "Please enter a valid amount."
      );

      return;
    }

    /*
      IF NEW CARD IS SELECTED,
      VALIDATE CARD DETAILS
    */
    if (
      selectedCard === "new" &&
      (
        !cardDetails.name ||
        !cardDetails.number ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      )
    ) {
      alert(
        "Please complete card details."
      );

      return;
    }

    /*
      SEND ONLY THE AMOUNT TO
      ADD MONEY PIN PAGE

      The backend will remain responsible
      for the actual wallet balance update.
    */
    navigate(
      "/add-money-pin",
      {
        state: {
          amount: Number(amount),
        },
      }
    );

    window.scrollTo(0, 0);
  };

  /*
    FORMAT TRANSACTION AMOUNT
  */
  const formatAmount = (value) => {
    if (
      typeof value === "number" &&
      Number.isFinite(value)
    ) {
      return value;
    }

    if (
      typeof value === "string"
    ) {
      const cleaned =
        value.replace(
          /[^\d.-]/g,
          ""
        );

      const number =
        Number(cleaned);

      return Number.isFinite(number)
        ? number
        : 0;
    }

    return 0;
  };

  /*
    FORMAT TRANSACTION DATE
  */
  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "Unknown date";
    }

    return parsedDate.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  /*
    LOADING SCREEN
  */
  if (loading) {
    return (
      <div
        style={{
          ...styles.page,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p
          style={{
            color: "#22c55e",
            fontSize: "18px",
          }}
        >
          Loading your Swift Wallet...
        </p>
      </div>
    );
  }

  return (
    <div
      style={styles.page}
    >
      {/* NAVBAR */}

      <div
        style={styles.navbar}
      >
        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(0, 0)
          }
          style={
            styles.logoContainer
          }
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

      {/* MAIN CONTENT */}

      <div
        style={styles.container}
      >
        <h1
          style={styles.heading}
        >
          <PlusCircle size={34} />

          Add Money
        </h1>

        <p
          style={styles.subtitle}
        >
          Add funds to your Swift Wallet securely.
        </p>

        {/* CURRENT BALANCE */}

        <div
          style={styles.card}
        >
          <div
            style={
              styles.sectionHeader
            }
          >
            <Wallet size={22} />

            <span>
              Current Balance
            </span>
          </div>

          <h2
            style={styles.balance}
          >
            ₦
            {balance.toLocaleString(
              "en-NG",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </h2>
        </div>

        {/* CARD PAYMENT */}

        <div
          style={{
            ...styles.card,
            marginTop: "25px",
          }}
        >
          <div
            style={
              styles.sectionHeader
            }
          >
            <CreditCard size={22} />

            <h2
              style={{
                margin: 0,
              }}
            >
              Card Payment
            </h2>
          </div>

          <p
            style={styles.text}
          >
            Enter the amount and select your payment method.
          </p>

          {/* AMOUNT */}

          <input
            type="text"
            inputMode="numeric"
            style={styles.input}
            placeholder="Amount (₦)"
            value={
              amount
                ? Number(
                    amount
                  ).toLocaleString(
                    "en-NG"
                  )
                : ""
            }
            onChange={(e) => {
              const value =
                e.target.value.replace(
                  /,/g,
                  ""
                );

              if (
                value === "" ||
                /^\d*$/.test(value)
              ) {
                setAmount(value);
              }
            }}
          />

          {/* FIRST CONTINUE BUTTON */}

          {!showCardForm && (
            <button
              style={
                styles.button
              }
              onClick={
                handleContinue
              }
            >
              Continue
            </button>
          )}

          {/* CARD OPTIONS */}

          {showCardForm && (
            <>
              {/* SAVED CARD */}

              <div
                style={
                  styles.cardOption
                }
                onClick={() =>
                  setSelectedCard(
                    "saved"
                  )
                }
              >
                <input
                  type="radio"
                  checked={
                    selectedCard ===
                    "saved"
                  }
                  readOnly
                />

                <span>
                  Saved Card
                </span>
              </div>

              {/* NEW CARD */}

              <div
                style={
                  styles.cardOption
                }
                onClick={() =>
                  setSelectedCard(
                    "new"
                  )
                }
              >
                <input
                  type="radio"
                  checked={
                    selectedCard ===
                    "new"
                  }
                  readOnly
                />

                <span>
                  Add New Card
                </span>
              </div>

              {/* NEW CARD DETAILS */}

              {selectedCard ===
                "new" && (
                <>
                  <input
                    style={
                      styles.input
                    }
                    placeholder="Card Holder Name"
                    value={
                      cardDetails.name
                    }
                    onChange={(e) =>
                      setCardDetails(
                        {
                          ...cardDetails,
                          name:
                            e.target
                              .value,
                        }
                      )
                    }
                  />

                  <input
                    style={
                      styles.input
                    }
                    type="text"
                    inputMode="numeric"
                    maxLength={19}
                    placeholder="Card Number"
                    value={
                      cardDetails.number
                    }
                    onChange={(e) => {
                      const value =
                        e.target.value.replace(
                          /\D/g,
                          ""
                        );

                      setCardDetails(
                        {
                          ...cardDetails,
                          number:
                            value,
                        }
                      );
                    }}
                  />

                  <input
                    style={
                      styles.input
                    }
                    placeholder="Expiry Date"
                    value={
                      cardDetails.expiry
                    }
                    onChange={(e) =>
                      setCardDetails(
                        {
                          ...cardDetails,
                          expiry:
                            e.target
                              .value,
                        }
                      )
                    }
                  />

                  <input
                    style={
                      styles.input
                    }
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="CVV"
                    value={
                      cardDetails.cvv
                    }
                    onChange={(e) => {
                      const value =
                        e.target.value.replace(
                          /\D/g,
                          ""
                        );

                      setCardDetails(
                        {
                          ...cardDetails,
                          cvv: value,
                        }
                      );
                    }}
                  />
                </>
              )}

              {/* ADD MONEY */}

              <button
                style={
                  styles.button
                }
                onClick={
                  handleAddMoney
                }
              >
                Add Money
              </button>
            </>
          )}
        </div>

        {/* RECENT TOP UPS */}

        <div
          style={{
            ...styles.card,
            marginTop: "25px",
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <CheckCircle
              size={22}
            />

            Recent Top Ups
          </h2>

          {recentTopUps.length ===
          0 ? (
            <p
              style={{
                color: "#888",
              }}
            >
              No top ups yet.
            </p>
          ) : (
            recentTopUps.map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    item.id ||
                    index
                  }
                  style={
                    styles.transaction
                  }
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={
                        styles.creditIcon
                      }
                    >
                      <ArrowDownLeft
                        size={18}
                      />
                    </div>

                    <div>
                      <strong>
                        {item.description ||
                          "Money Added"}
                      </strong>

                      <p
                        style={{
                          color:
                            "#888",
                          margin:
                            "5px 0 0",
                          fontSize:
                            "13px",
                        }}
                      >
                        {formatDate(
                          item.createdAt
                        )}
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      color:
                        "#22c55e",
                      fontWeight:
                        "700",
                    }}
                  >
                    +

                    ₦
                    {formatAmount(
                      item.amount
                    ).toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </span>
                </div>
              )
            )
          )}
        </div>

        {/* BACK TO DASHBOARD */}

        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(
              0,
              0
            )
          }
          style={{
            textDecoration:
              "none",
          }}
        >
          <button
            style={{
              ...styles.button,
              marginTop: "30px",
            }}
          >
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#0d0d0d",
    minHeight: "100vh",
    color: "#fff",
  },

  navbar: {
    padding: "20px 50px",
    borderBottom: "1px solid #222",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },

  logo: {
    width: "40px",
    height: "40px",
    backgroundColor: "#22c55e",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    fontWeight: "800",
  },

  brand: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "700",
  },

  container: {
    maxWidth: "700px",
    margin: "45px auto",
    padding: "0 20px",
  },

  heading: {
    color: "#22c55e",
    fontSize: "36px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  subtitle: {
    color: "#999",
    marginBottom: "35px",
  },

  card: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "25px",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
  },

  balance: {
    color: "#22c55e",
    fontSize: "38px",
    marginTop: "18px",
    marginBottom: 0,
  },

  text: {
    color: "#999",
  },

  input: {
    width: "100%",
    padding: "15px",
    marginTop: "12px",
    marginBottom: "15px",
    backgroundColor: "#111",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "10px",
    boxSizing: "border-box",
    fontSize: "15px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#22c55e",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
  },

  cardOption: {
    backgroundColor: "#111",
    border: "1px solid #333",
    padding: "16px",
    borderRadius: "12px",
    display: "flex",
    gap: "12px",
    marginBottom: "15px",
    cursor: "pointer",
    alignItems: "center",
  },

  transaction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #2a2a2a",
  },

  creditIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#123d23",
    color: "#22c55e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default AddMoney;