import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /*
    LOAD CURRENT USER FROM BACKEND
  */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem(
            "swiftWalletToken"
          );

        if (!token) {
          navigate("/login");
          return;
        }

        const response =
          await fetch(
            "http://localhost:5000/api/auth/me",
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

        if (!response.ok) {
          if (
            response.status === 401
          ) {
            localStorage.removeItem(
              "swiftWalletToken"
            );

            navigate("/login");
            return;
          }

          throw new Error(
            data.message ||
              "Unable to load your profile."
          );
        }

        const user =
          data.user;

        /*
          USER DATA NOW COMES
          FROM THE DATABASE
        */
        setFirstName(
          user.firstName || ""
        );

        setLastName(
          user.lastName || ""
        );

        setEmail(
          user.email || ""
        );

        setPhoneNumber(
          user.phoneNumber || ""
        );

        setCountry(
          user.country || ""
        );

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
    SAVE PROFILE TO BACKEND
  */
  const saveProfile = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
      BASIC VALIDATION
    */
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phoneNumber.trim() ||
      !country.trim()
    ) {
      setError(
        "Please complete all profile fields."
      );

      return;
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem(
          "swiftWalletToken"
        );

      if (!token) {
        navigate("/login");
        return;
      }

      const response =
        await fetch(
          "http://localhost:5000/api/auth/update-profile",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              firstName:
                firstName.trim(),

              lastName:
                lastName.trim(),

              phoneNumber:
                phoneNumber.trim(),

              country:
                country.trim(),
            }),
          }
        );

      const data =
        await response.json();

      /*
        INVALID / EXPIRED TOKEN
      */
      if (
        response.status === 401
      ) {
        localStorage.removeItem(
          "swiftWalletToken"
        );

        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update your profile."
        );
      }

      /*
        SUCCESS
      */
      setSuccess(
        "Profile updated successfully."
      );

      /*
        Wait briefly so the user
        can see the success message.
      */
      setTimeout(() => {
        navigate("/profile");
        window.scrollTo(0, 0);
      }, 1000);

    } catch (error) {
      console.error(
        "Save profile error:",
        error
      );

      setError(
        error.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
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

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        color: "#fff",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/profile"
          style={{
            color: "#22c55e",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to Profile
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
          <h1
            style={{
              color: "#22c55e",
              marginBottom: "10px",
            }}
          >
            Edit Profile
          </h1>

          <p
            style={{
              color: "#888",
              marginBottom: "30px",
              lineHeight: "1.5",
            }}
          >
            Update your personal information
            below.
          </p>

          {error && (
            <div
              style={{
                backgroundColor: "#3b1111",
                border: "1px solid #6b2222",
                color: "#ff6b6b",
                padding: "12px 14px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                backgroundColor: "#123d23",
                border: "1px solid #1f6b3a",
                color: "#22c55e",
                padding: "12px 14px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              {success}
            </div>
          )}

          <form
            onSubmit={saveProfile}
          >
            <label
              style={labelStyle}
            >
              First Name
            </label>

            <input
              type="text"
              style={inputStyle}
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
              placeholder="Enter your first name"
              disabled={saving}
            />

            <label
              style={labelStyle}
            >
              Last Name
            </label>

            <input
              type="text"
              style={inputStyle}
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
              placeholder="Enter your last name"
              disabled={saving}
            />

            <label
              style={labelStyle}
            >
              Email
            </label>

            <input
              type="email"
              style={{
                ...inputStyle,
                opacity: "0.6",
                cursor: "not-allowed",
              }}
              value={email}
              disabled
            />

            <p
              style={{
                color: "#666",
                fontSize: "12px",
                marginTop: "6px",
              }}
            >
              Email address cannot be changed
              here.
            </p>

            <label
              style={labelStyle}
            >
              Phone Number
            </label>

            <input
              type="tel"
              style={inputStyle}
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(
                  e.target.value
                )
              }
              placeholder="Enter phone number"
              disabled={saving}
            />

            <label
              style={labelStyle}
            >
              Country
            </label>

            <input
              type="text"
              style={inputStyle}
              value={country}
              onChange={(e) =>
                setCountry(
                  e.target.value
                )
              }
              placeholder="Enter country"
              disabled={saving}
            />

            <button
              type="submit"
              disabled={saving}
              style={{
                ...buttonStyle,
                opacity: saving
                  ? 0.6
                  : 1,
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {saving
                ? "Saving Changes..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/profile")
              }
              disabled={saving}
              style={{
                ...cancelButtonStyle,
                opacity: saving
                  ? 0.6
                  : 1,
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  color: "#999",
  marginTop: "20px",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#111",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "15px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  marginTop: "30px",
  padding: "14px",
  backgroundColor: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "15px",
};

const cancelButtonStyle = {
  width: "100%",
  marginTop: "12px",
  padding: "14px",
  backgroundColor: "transparent",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "15px",
};

export default EditProfile;