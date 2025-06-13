// UserDetails.js
import React, { useState } from "react";
import { getUserDetails } from "../../api/usersApi";

export default function UserDetails() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function handleFetch() {
    setError(null);
    try {
      const result = await getUserDetails(userId);
      setUser(result);
    } catch (err) {
      setError(err.message || "שגיאה בפרטי משתמש");
    }
  }

  return (
    <div style={styles.form}>
      <h2>פרטי משתמש</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleFetch} style={styles.button}>הצג פרטים</button>
      {user && (
        <p>{user.name} - {user.phone}</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
const styles = {
  form: {
    maxWidth: 500,
    margin: "20px auto",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 0 10px #bbb",
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: 100,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#28a745",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
