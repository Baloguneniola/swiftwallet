import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "./api";

function CompleteProfile() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    phoneNumber: "",
    dateOfBirth: "",
    residentialAddress: "",
    country: "",
    stateProvince: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setProfileData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleContinue = async () => {
    const {
      phoneNumber,
      dateOfBirth,
      residentialAddress,
      country,
      stateProvince,
    } = profileData;

    if (
      !phoneNumber ||
      !dateOfBirth ||
      !residentialAddress ||
      !country ||
      !stateProvince
    ) {
      setError("Please complete all fields.");
      return;
    }

    const email = localStorage.getItem(
      "pendingUserEmail"
    );

    if (!email) {
      setError(
        "We couldn't find your signup information. Please start again."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/complete-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            phoneNumber,
            dateOfBirth,
            residentialAddress,
            country,
            stateProvince,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to save your profile. Please try again."
        );
        return;
      }

      navigate("/identity-verification");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(
        "Complete profile error:",
        error
      );

      setError(
        "Unable to connect to Swift Wallet. Please make sure the Swift Wallet server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "35px",
          left: "50px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#22c55e",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "16px",
            color: "#000",
          }}
        >
          SW
        </div>

        <span
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          Swift Wallet
        </span>
      </Link>

      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "15px",
          width: "450px",
          textAlign: "center",
          border: "1px solid #2a2a2a",
          boxShadow:
            "0 0 20px rgba(34,197,94,0.15)",
        }}
      >
        <p
          style={{
            color: "#22c55e",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Step 3 of 5
        </p>

        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#333",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "60%",
              height: "100%",
              backgroundColor: "#22c55e",
            }}
          />
        </div>

        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          Complete Your Profile
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            fontSize: "15px",
          }}
        >
          Tell us a little more about yourself to
          continue.
        </p>

        <input
          type="tel"
          inputMode="tel"
          placeholder="Phone Number"
          value={profileData.phoneNumber}
          onChange={(e) =>
            handleChange(
              "phoneNumber",
              e.target.value
            )
          }
          style={inputStyle}
        />

        <p
          style={{
            color: "#aaa",
            textAlign: "left",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Date of Birth
        </p>

        <input
          type="date"
          value={profileData.dateOfBirth}
          onChange={(e) =>
            handleChange(
              "dateOfBirth",
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Residential Address"
          value={profileData.residentialAddress}
          onChange={(e) =>
            handleChange(
              "residentialAddress",
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Country"
          value={profileData.country}
          onChange={(e) =>
            handleChange(
              "country",
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="State / Province"
          value={profileData.stateProvince}
          onChange={(e) =>
            handleChange(
              "stateProvince",
              e.target.value
            )
          }
          style={inputStyle}
        />

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "14px",
              marginBottom: "20px",
              lineHeight: "1.5",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleContinue}
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          {loading
            ? "Saving Profile..."
            : "Continue"}
        </button>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Your information is encrypted and securely
          stored.
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  backgroundColor: "#111",
  border: "1px solid #333",
  color: "#fff",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  fontSize: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
};

export default CompleteProfile;