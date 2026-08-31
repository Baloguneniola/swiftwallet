import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import api from "./api";

function TransactionHistory() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
    GET LOGGED-IN USER'S
    TRANSACTIONS FROM BACKEND
  */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem(
          "swiftWalletToken"
        );

        if (!token) {
          setError(
            "Authentication session not found. Please log in again."
          );

          setLoading(false);
          return;
        }

        /*
          GET TRANSACTIONS FROM BACKEND
        */
        const response = await api.get(
          "/api/transfers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        /*
          BACKEND RETURNS:

          {
            transactions: [
              {
                id,
                type,
                amount,
                description,
                status,
                createdAt
              }
            ]
          }
        */

        const backendTransactions =
          Array.isArray(data.transactions)
            ? data.transactions
            : [];

        setTransactions(
          backendTransactions
        );
      } catch (error) {
        console.error(
          "Transaction history error:",
          error
        );

        /*
          HANDLE EXPIRED / INVALID TOKEN
        */
        if (
          error.response &&
          (
            error.response.status === 401 ||
            error.response.status === 403
          )
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

        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load transaction history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  /*
    SAFELY CONVERT BACKEND AMOUNT
    TO A NUMBER

    Prisma Decimal is converted to a
    string by the backend.

    Example:

    "5000.00" -> 5000
  */
  const getAmount = (amount) => {
    if (
      typeof amount === "number" &&
      Number.isFinite(amount)
    ) {
      return amount;
    }

    if (
      amount === null ||
      amount === undefined ||
      amount === ""
    ) {
      return 0;
    }

    const cleanedAmount = String(
      amount
    ).replace(/[^\d.-]/g, "");

    const parsedAmount =
      Number(cleanedAmount);

    return Number.isFinite(
      parsedAmount
    )
      ? parsedAmount
      : 0;
  };

  /*
    GET TRANSACTION DESCRIPTION
  */
  const getTransactionName = (
    transaction
  ) => {
    if (
      transaction &&
      transaction.description &&
      String(
        transaction.description
      ).trim()
    ) {
      return String(
        transaction.description
      ).trim();
    }

    if (
      transaction &&
      transaction.type === "credit"
    ) {
      return "Money received";
    }

    if (
      transaction &&
      transaction.type === "debit"
    ) {
      return "Money sent";
    }

    return "Transaction";
  };

  /*
    FORMAT BACKEND ISO DATE
  */
  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    const parsedDate = new Date(date);

    if (
      isNaN(
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
    FILTER + SEARCH
  */
  const filteredTransactions =
    transactions.filter(
      (transaction) => {
        const matchesFilter =
          filter === "All" ||
          (
            filter === "Credit" &&
            transaction.type === "credit"
          ) ||
          (
            filter === "Debit" &&
            transaction.type === "debit"
          );

        const transactionName =
          getTransactionName(
            transaction
          );

        const matchesSearch =
          transactionName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        return (
          matchesFilter &&
          matchesSearch
        );
      }
    );

  /*
    TOTAL MONEY RECEIVED
  */
  const moneyIn = transactions
    .filter(
      (transaction) =>
        transaction.type === "credit"
    )
    .reduce(
      (total, transaction) =>
        total +
        getAmount(
          transaction.amount
        ),
      0
    );

  /*
    TOTAL MONEY SENT
  */
  const moneyOut = transactions
    .filter(
      (transaction) =>
        transaction.type === "debit"
    )
    .reduce(
      (total, transaction) =>
        total +
        getAmount(
          transaction.amount
        ),
      0
    );

  /*
    OPEN TRANSACTION DETAILS
  */
  const openTransaction = (
    transaction
  ) => {
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

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <div style={styles.navbar}>

        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(0, 0)
          }
          style={styles.logoContainer}
        >
          <div style={styles.logo}>
            SW
          </div>

          <span style={styles.brand}>
            Swift Wallet
          </span>
        </Link>

      </div>

      {/* MAIN CONTENT */}
      <div style={styles.container}>

        <h1 style={styles.heading}>
          Transaction History
        </h1>

        <p style={styles.subtitle}>
          View all wallet activity.
        </p>

        {/* SUMMARY */}
        <div
          style={
            styles.summaryContainer
          }
        >

          {/* MONEY IN */}
          <div
            style={styles.summaryCard}
          >

            <div
              style={
                styles.summaryHeader
              }
            >
              <TrendingUp size={20} />

              Money In
            </div>

            <h2
              style={
                styles.creditAmount
              }
            >
              +₦
              {moneyIn.toLocaleString(
                "en-NG",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </h2>

          </div>

          {/* MONEY OUT */}
          <div
            style={styles.summaryCard}
          >

            <div
              style={
                styles.summaryHeader
              }
            >
              <TrendingDown
                size={20}
              />

              Money Out
            </div>

            <h2
              style={
                styles.debitAmount
              }
            >
              -₦
              {moneyOut.toLocaleString(
                "en-NG",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </h2>

          </div>

        </div>

        {/* SEARCH + FILTER */}
        <div
          style={{
            ...styles.card,
            marginBottom: "30px",
          }}
        >

          {/* SEARCH */}
          <div
            style={
              styles.inputWrapper
            }
          >

            <Search size={18} />

            <input
              style={
                styles.searchInput
              }
              placeholder="Search transactions"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* FILTER */}
          <div
            style={{
              position: "relative",
            }}
          >

            <select
              style={{
                ...styles.input,
                appearance: "none",
                cursor: "pointer",
              }}
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Transactions
              </option>

              <option value="Credit">
                Money In
              </option>

              <option value="Debit">
                Money Out
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
                fontSize: "12px",
              }}
            >
              ▼
            </span>

          </div>

        </div>

        {/* TRANSACTIONS */}
        <div style={styles.card}>

          <h2
            style={{
              color: "#22c55e",
              marginBottom: "25px",
            }}
          >
            Transactions
          </h2>

          {/* LOADING */}
          {loading ? (

            <p
              style={{
                color: "#888",
              }}
            >
              Loading transactions...
            </p>

          ) : error ? (

            /* ERROR */
            <p
              style={{
                color: "#ff5f5f",
              }}
            >
              {error}
            </p>

          ) : filteredTransactions.length ===
            0 ? (

            /* EMPTY */
            <p
              style={{
                color: "#888",
              }}
            >
              {search ||
              filter !== "All"
                ? "No transactions match your search or filter."
                : "No transactions found."}
            </p>

          ) : (

            /* TRANSACTION LIST */
            filteredTransactions.map(
              (
                transaction,
                index
              ) => {

                const amount =
                  getAmount(
                    transaction.amount
                  );

                const name =
                  getTransactionName(
                    transaction
                  );

                const isCredit =
                  transaction.type ===
                  "credit";

                return (
                  <div
                    key={
                      transaction.id ||
                      `transaction-${index}`
                    }
                    onClick={() =>
                      openTransaction(
                        transaction
                      )
                    }
                    style={{
                      ...styles.transaction,

                      borderBottom:
                        index ===
                        filteredTransactions.length -
                          1
                          ? "none"
                          : "1px solid #2a2a2a",
                    }}
                  >

                    {/* LEFT SIDE */}
                    <div
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: "15px",
                        minWidth: 0,
                      }}
                    >

                      {/* ICON */}
                      <div
                        style={
                          isCredit
                            ? styles.creditIcon
                            : styles.debitIcon
                        }
                      >

                        {isCredit ? (

                          <ArrowDownLeft
                            size={20}
                          />

                        ) : (

                          <ArrowUpRight
                            size={20}
                          />

                        )}

                      </div>

                      {/* DETAILS */}
                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >

                        <strong>
                          {name}
                        </strong>

                        <p
                          style={{
                            color: "#888",
                            margin:
                              "6px 0",
                            fontSize:
                              "13px",
                          }}
                        >
                          {formatDate(
                            transaction.createdAt
                          )}
                        </p>

                        {/* STATUS */}
                        {transaction.status && (

                          <p
                            style={{
                              color:
                                transaction.status ===
                                "completed"
                                  ? "#22c55e"
                                  : "#888",

                              margin:
                                "5px 0",

                              fontSize:
                                "13px",

                              textTransform:
                                "capitalize",
                            }}
                          >
                            {transaction.status}
                          </p>

                        )}

                        {/* TRANSACTION ID */}
                        {transaction.id && (

                          <small
                            style={{
                              color:
                                "#666",
                              display:
                                "block",
                              marginTop:
                                "4px",
                              wordBreak:
                                "break-all",
                            }}
                          >
                            ID:{" "}
                            {
                              transaction.id
                            }
                          </small>

                        )}

                      </div>

                    </div>

                    {/* AMOUNT */}
                    <span
                      style={{
                        color: isCredit
                          ? "#22c55e"
                          : "#ff5f5f",

                        fontWeight:
                          "700",

                        fontSize:
                          "16px",

                        whiteSpace:
                          "nowrap",
                      }}
                    >

                      {isCredit
                        ? "+"
                        : "-"}

                      ₦
                      {amount.toLocaleString(
                        "en-NG",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}

                    </span>

                  </div>
                );
              }
            )
          )}

        </div>

        {/* BACK TO DASHBOARD */}
        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(0, 0)
          }
          style={{
            textDecoration: "none",
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

/*
  STYLES
*/
const styles = {

  page: {
    backgroundColor: "#0d0d0d",
    minHeight: "100vh",
    color: "#fff",
  },

  navbar: {
    padding: "20px 50px",
    borderBottom:
      "1px solid #222",
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
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontWeight: "800",
  },

  brand: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "700",
  },

  container: {
    maxWidth: "800px",
    margin: "45px auto",
    padding: "0 20px",
  },

  heading: {
    color: "#22c55e",
    fontSize: "36px",
  },

  subtitle: {
    color: "#999",
    marginBottom: "35px",
  },

  summaryContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  summaryCard: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "25px",
  },

  summaryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#999",
  },

  creditAmount: {
    color: "#22c55e",
    marginBottom: 0,
  },

  debitAmount: {
    color: "#ff5f5f",
    marginBottom: 0,
  },

  card: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "25px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "0 14px",
    marginBottom: "15px",
  },

  searchInput: {
    width: "100%",
    padding: "15px 0",
    background: "transparent",
    border: "none",
    color: "#fff",
    outline: "none",
  },

  input: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#111",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "10px",
    boxSizing: "border-box",
  },

  transaction: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "20px 0",
    gap: "20px",
    cursor: "pointer",
  },

  creditIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#123d23",
    color: "#22c55e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },

  debitIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#3b1111",
    color: "#ff5f5f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
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
  },
};

export default TransactionHistory;