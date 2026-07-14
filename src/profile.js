import React from "react";

function Profile() {
  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "420px",
          backgroundColor: "#1a1a1a",
          padding: "40px",
          borderRadius: "16px",
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
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px",
          }}
        >
          MJ
        </div>

        <h2 style={{ marginBottom: "8px" }}>Michael Jones</h2>

        <p style={{ color: "#aaa", marginBottom: "30px" }}>
          michael@email.com
        </p>

        <div
          style={{
            textAlign: "left",
            marginBottom: "25px",
          }}
        >
          <p><strong>Phone:</strong> +234 801 234 5678</p>
          <p><strong>Country:</strong> Nigeria</p>
          <p><strong>Account:</strong> Premium</p>
        </div>

        <button
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#22c55e",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            color: "#000",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          Edit Profile
        </button>

        <button
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "transparent",
            border: "1px solid #22c55e",
            borderRadius: "8px",
            color: "#22c55e",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;