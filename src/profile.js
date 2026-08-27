import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, LogOut, Copy } from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  /*
    LOAD CURRENT USER FROM BACKEND
  */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem(
          "swiftWalletToken"
        );

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const contentType =
          response.headers.get("content-type") || "";

        let data;

        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();

          console.error(
            "Backend returned a non-JSON response:",
            text
          );

          throw new Error(
            "The backend returned an unexpected response."
          );
        }

        /*
          INVALID / EXPIRED TOKEN
        */
        if (response.status === 401) {
          localStorage.removeItem(
            "swiftWalletToken"
          );

          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load your profile."
          );
        }

        /*
          STORE THE LATEST USER DATA
          FROM THE DATABASE
        */
        setCurrentUser(data.user);
      } catch (error) {
        console.error(
          "Load profile error:",
          error
        );

        setError(
          error.message ||
            "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  /*
    COPY ACCOUNT NUMBER
  */
  const copyAccountNumber = async () => {
    if (!currentUser?.account?.accountNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        currentUser.account.accountNumber
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy account number error:",
        error
      );
    }
  };

  /*
    LOG OUT
  */
  const handleLogout = () => {
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

    window.scrollTo(0, 0);
  };

  /*
    LOADING SCREEN
  */
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#0d0d0d",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: "#22c55e",
            fontSize: "18px",
          }}
        >
          Loading your profile...
        </p>
      </div>
    );
  }

  /*
    ERROR SCREEN
  */
  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#0d0d0d",
          minHeight: "100vh",
          color: "#fff",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "550px",
            margin: "0 auto",
          }}
        >
          <Link
            to="/settings"
            onClick={() =>
              window.scrollTo(0, 0)
            }
            style={{
              color: "#22c55e",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            ← Back to Settings
          </Link>

          <div
            style={{
              backgroundColor: "#3b1111",
              border: "1px solid #6b2222",
              color: "#ff6b6b",
              padding: "16px",
              borderRadius: "8px",
              marginTop: "30px",
            }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  }

  /*
    SAFETY CHECK
  */
  if (!currentUser) {
    return null;
  }

  /*
    GET FULL NAME
  */
  const fullName =
    `${currentUser.firstName || ""} ${
      currentUser.lastName || ""
    }`.trim();

  /*
    GET INITIALS
  */
  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "SW";

  /*
    GET ACCOUNT INFORMATION
  */
  const accountNumber =
    currentUser.account?.accountNumber || "N/A";

  const balance = Number(
    currentUser.account?.balance || 0
  );

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "550px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/settings"
          onClick={() =>
            window.scrollTo(0, 0)
          }
          style={{
            color: "#22c55e",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to Settings
        </Link>

        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "16px",
            padding: "40px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                color: "#000",
                fontSize: "36px",
                fontWeight: "700",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 20px",
              }}
            >
              {initials}
            </div>

            <h1
              style={{
                marginBottom: "8px",
              }}
            >
              {fullName || "User"}
            </h1>

            <p
              style={{
                color: "#999",
              }}
            >
              {currentUser.email || "No email"}
            </p>
          </div>

          <div
            style={{
              marginTop: "35px",
            }}
          >
            <ProfileItem
              title="Account Number"
              value={accountNumber}
            />

            <button
              onClick={copyAccountNumber}
              disabled={
                accountNumber === "N/A"
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                backgroundColor:
                  accountNumber === "N/A"
                    ? "#333"
                    : "#22c55e",
                color:
                  accountNumber === "N/A"
                    ? "#777"
                    : "#000",
                border: "none",
                borderRadius: "8px",
                fontWeight: "700",
                cursor:
                  accountNumber === "N/A"
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Copy size={17} />

              {copied
                ? "Copied!"
                : "Copy Account Number"}
            </button>

            <ProfileItem
              title="Account Type"
              value="Premium"
            />

            <ProfileItem
              title="Wallet Balance"
              value={`₦${balance.toLocaleString(
                "en-NG",
                {
                  minimumFractionDigits: 2,
                }
              )}`}
            />

            <ProfileItem
              title="Phone Number"
              value={
                currentUser.phoneNumber ||
                "Not provided"
              }
            />

            <ProfileItem
              title="Country"
              value={
                currentUser.country ||
                "Not provided"
              }
            />
          </div>

          <button
            onClick={() =>
              navigate("/edit-profile")
            }
            style={buttonStyle}
          >
            <User size={18} />

            Edit Profile
          </button>

          <button
            onClick={() =>
              navigate("/change-pin")
            }
            style={secondaryButton}
          >
            <Lock size={18} />

            Change PIN
          </button>

          <button
            onClick={handleLogout}
            style={{
              ...secondaryButton,
              borderColor: "#ff5f5f",
              color: "#ff5f5f",
            }}
          >
            <LogOut size={18} />

            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ title, value }) {
  return (
    <div
      style={{
        padding: "16px 0",
        borderBottom: "1px solid #2a2a2a",
      }}
    >
      <p
        style={{
          color: "#888",
          margin: "0 0 6px",
          fontSize: "14px",
        }}
      >
        {title}
      </p>

      <strong>{value}</strong>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "30px",
  backgroundColor: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

const secondaryButton = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  backgroundColor: "transparent",
  color: "#22c55e",
  border: "1px solid #22c55e",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

export default Profile;