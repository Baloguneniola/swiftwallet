import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function IdentityVerification() {
  const navigate = useNavigate();

  const [verificationData, setVerificationData] = useState({
    nationality: "",
    identityType: "",
    identityNumber: "",
    identityDocument: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setVerificationData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setVerificationData((previous) => ({
      ...previous,
      identityDocument: file.name,
    }));

    setError("");
  };

  const handleContinue = async () => {
    const {
      nationality,
      identityType,
      identityNumber,
      identityDocument,
    } = verificationData;

    if (
      !nationality ||
      !identityType ||
      !identityNumber ||
      !identityDocument
    ) {
      setError("Please complete all identity verification fields.");
      return;
    }

    const email = localStorage.getItem("pendingUserEmail");

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
        "http://localhost:5000/api/auth/identity-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            nationality,
            identityType,
            identityNumber,
            identityDocument,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
          "Unable to save your identity verification information."
        );
        return;
      }

      navigate("/create-pin");
    } catch (error) {
      console.error("Identity verification error:", error);

      setError(
        "Unable to connect to Swift Wallet. Please try again."
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
        padding: "40px 20px",
        boxSizing: "border-box",
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
          boxShadow: "0 0 20px rgba(34,197,94,0.15)",
        }}
      >
        <p
          style={{
            color: "#22c55e",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Step 4 of 5
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
              width: "80%",
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
          Identity Verification
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
            fontSize: "15px",
            lineHeight: "1.5",
          }}
        >
          Verify your identity to unlock all Swift Wallet features.
        </p>

        <input
          type="text"
          placeholder="Nationality"
          value={verificationData.nationality}
          onChange={(e) =>
            handleChange("nationality", e.target.value)
          }
          style={inputStyle}
        />

        <select
          value={verificationData.identityType}
          onChange={(e) =>
            handleChange("identityType", e.target.value)
          }
          style={selectStyle}
        >
          <option value="" disabled>
            Select ID Type
          </option>
          <option value="National ID">National ID</option>
          <option value="Passport">Passport</option>
          <option value="Driver's Licence">Driver's Licence</option>
        </select>

        <input
          type="text"
          placeholder="ID Number"
          value={verificationData.identityNumber}
          onChange={(e) =>
            handleChange("identityNumber", e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="file"
          id="upload-id"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <label
          htmlFor="upload-id"
          style={uploadButton}
        >
          {verificationData.identityDocument
            ? verificationData.identityDocument
            : "Upload Government ID"}
        </label>

        {verificationData.identityDocument && (
          <p
            style={{
              color: "#22c55e",
              fontSize: "13px",
              marginTop: "-8px",
              marginBottom: "18px",
            }}
          >
            Document selected successfully.
          </p>
        )}

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "14px",
              marginBottom: "20px",
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
          {loading ? "Saving..." : "Continue"}
        </button>

        <p
          style={{
            color: "#888",
            marginTop: "25px",
            fontSize: "14px",
          }}
        >
          Your documents are securely encrypted and protected.
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

const selectStyle = {
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
  cursor: "pointer",
};

const uploadButton = {
  display: "block",
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  backgroundColor: "transparent",
  color: "#22c55e",
  border: "2px dashed #22c55e",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "15px",
  boxSizing: "border-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

export default IdentityVerification;