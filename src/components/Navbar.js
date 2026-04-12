import React from "react";

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Daycare Waitlist</h1>

      {isLoggedIn && (
        <button
  style={styles.logoutButton}
  onClick={() => {
    onLogout();
    alert("Logged out successfully");
  }}
>
  Logout
</button>
      )}
    </nav>
  );
}
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  title: {
    margin: 0,
    fontSize: "20px",
  },
  logoutButton: {
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#e74c3c",
    color: "#fff",
    transition: "background-color 0.2s ease",
  },
};