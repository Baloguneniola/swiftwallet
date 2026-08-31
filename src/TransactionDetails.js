import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle,
  Copy,
} from "lucide-react";

function TransactionDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const transaction =
    location.state?.transaction;

  /*
    If someone opens the page directly
    without selecting a transaction first.
  */
  if (!transaction) {
    return (
      <div style={styles.page}>
        <div style={styles.navbar}>
          <Link
            to="/dashboard"
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

        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.heading}>
              Transaction Not Found
            </h1>

            <p style={styles.subtitle}>
              Please select a transaction from
              your transaction history.
            </p>


          </div>
        </div>
      </div>
    );
  }

  /*
    SAFELY CONVERT AMOUNT
  */
  const getAmount = (amount) => {
    if (
      typeof amount === "number" &&
      !isNaN(amount)
    ) {
      return amount;
    }

    return (
      Number(
        String(amount || "").replace(
          /[^\d.-]/g,
          ""
        )
      ) || 0
    );
  };

  const amount = getAmount(
    transaction.amount
  );

  /*
    TRANSACTION TYPE
  */
  const isCredit =
    transaction.type === "credit";

  /*
    DESCRIPTION
  */
  const description =
    transaction.description ||
    (isCredit
      ? "Money received"
      : "Money sent");

  /*
    FORMAT DATE
  */
  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    const parsedDate = new Date(date);

    if (
      isNaN(parsedDate.getTime())
    ) {
      return "Unknown date";
    }

    return parsedDate.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  /*
    FORMAT TIME
  */
  const formatTime = (date) => {
    if (!date) {
      return "Unknown time";
    }

    const parsedDate = new Date(date);

    if (
      isNaN(parsedDate.getTime())
    ) {
      return "Unknown time";
    }

    return parsedDate.toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /*
    COPY TRANSACTION ID
  */
  const copyTransactionId = () => {
    if (transaction.id) {
      navigator.clipboard.writeText(
        transaction.id
      );
    }
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
          Transaction Details
        </h1>

        <p style={styles.subtitle}>
          View your transaction receipt.
        </p>

        {/* RECEIPT */}
        <div style={styles.receipt}>
          {/* SUCCESS HEADER */}
          <div style={styles.receiptHeader}>
            <div
              style={
                isCredit
                  ? styles.creditCircle
                  : styles.debitCircle
              }
            >
              {isCredit ? (
                <ArrowDownLeft size={30} />
              ) : (
                <ArrowUpRight size={30} />
              )}
            </div>

            <h2 style={styles.receiptTitle}>
              {isCredit
                ? "Money Received"
                : "Money Sent"}
            </h2>

            <div
              style={
                styles.statusContainer
              }
            >
              <CheckCircle
                size={17}
              />

              <span>
                {transaction.status
                  ? transaction.status
                  : "Completed"}
              </span>
            </div>
          </div>

          {/* AMOUNT */}
          <div style={styles.amountSection}>
            <p style={styles.amountLabel}>
              Amount
            </p>

            <h1
              style={
                isCredit
                  ? styles.creditAmount
                  : styles.debitAmount
              }
            >
              {isCredit ? "+" : "-"}₦
              {amount.toLocaleString(
                "en-NG",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </h1>
          </div>

          {/* DIVIDER */}
          <div style={styles.divider} />

          {/* DETAILS */}
          <div style={styles.details}>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>
                Description
              </span>

              <span
                style={styles.detailValue}
              >
                {description}
              </span>
            </div>

            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>
                Date
              </span>

              <span
                style={styles.detailValue}
              >
                {formatDate(
                  transaction.createdAt
                )}
              </span>
            </div>

            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>
                Time
              </span>

              <span
                style={styles.detailValue}
              >
                {formatTime(
                  transaction.createdAt
                )}
              </span>
            </div>

            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>
                Status
              </span>

              <span
                style={{
                  ...styles.detailValue,
                  color:
                    transaction.status ===
                      "completed" ||
                    !transaction.status
                      ? "#22c55e"
                      : "#fff",
                  textTransform:
                    "capitalize",
                }}
              >
                {transaction.status ||
                  "Completed"}
              </span>
            </div>

            {transaction.id && (
              <div
                style={{
                  ...styles.detailRow,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={styles.detailLabel}
                >
                  Transaction ID
                </span>

                <div
                  style={
                    styles.transactionIdContainer
                  }
                >
                  <span
                    style={
                      styles.transactionId
                    }
                  >
                    {transaction.id}
                  </span>

                  <button
                    onClick={
                      copyTransactionId
                    }
                    style={
                      styles.copyButton
                    }
                    title="Copy transaction ID"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RECEIPT FOOTER */}
          <div style={styles.receiptFooter}>
            <p>
              Swift Wallet Transaction
            </p>
          </div>
        </div>


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
    maxWidth: "650px",
    margin: "40px auto",
    padding: "0 20px 50px",
  },

  backButton: {
    background: "transparent",
    border: "none",
    color: "#999",
    padding: "0",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "30px",
  },

  heading: {
    color: "#22c55e",
    fontSize: "36px",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#999",
    marginBottom: "30px",
  },

  receipt: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "18px",
    overflow: "hidden",
  },

  receiptHeader: {
    textAlign: "center",
    padding: "35px 25px 25px",
  },

  creditCircle: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    backgroundColor: "#123d23",
    color: "#22c55e",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 18px",
  },

  debitCircle: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    backgroundColor: "#3b1111",
    color: "#ff5f5f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 18px",
  },

  receiptTitle: {
    margin: "0 0 12px",
    fontSize: "24px",
  },

  statusContainer: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    color: "#22c55e",
    fontSize: "14px",
    textTransform: "capitalize",
  },

  amountSection: {
    textAlign: "center",
    padding: "10px 25px 30px",
  },

  amountLabel: {
    color: "#888",
    margin: "0 0 5px",
    fontSize: "14px",
  },

  creditAmount: {
    color: "#22c55e",
    fontSize: "38px",
    margin: 0,
  },

  debitAmount: {
    color: "#ff5f5f",
    fontSize: "38px",
    margin: 0,
  },

  divider: {
    height: "1px",
    backgroundColor: "#2a2a2a",
    margin: "0 25px",
  },

  details: {
    padding: "10px 25px 20px",
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "25px",
    padding: "17px 0",
    borderBottom: "1px solid #252525",
  },

  detailLabel: {
    color: "#888",
    fontSize: "14px",
    flexShrink: 0,
  },

  detailValue: {
    color: "#fff",
    fontSize: "14px",
    textAlign: "right",
    wordBreak: "break-word",
  },

  transactionIdContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    maxWidth: "65%",
  },

  transactionId: {
    color: "#aaa",
    fontSize: "12px",
    wordBreak: "break-all",
    textAlign: "right",
  },

  copyButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#252525",
    border: "1px solid #333",
    color: "#aaa",
    borderRadius: "6px",
    padding: "6px",
    cursor: "pointer",
    flexShrink: 0,
  },

  receiptFooter: {
    borderTop: "1px dashed #333",
    padding: "18px 25px",
    textAlign: "center",
    color: "#666",
    fontSize: "12px",
  },

  button: {
    width: "100%",
    padding: "15px",
    marginTop: "25px",
    backgroundColor: "#22c55e",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
  },

  card: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "30px",
  },
};

export default TransactionDetails;