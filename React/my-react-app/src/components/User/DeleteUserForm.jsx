// DeleteUserForm.js
import React, { useState } from "react";
import { deleteUser } from "../../api/usersApi";

export default function DeleteUserForm() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleDelete() {
    setError(null);
    setMessage(null);
    try {
      const result = await deleteUser(userId);
      setMessage(result);
    } catch (err) {
      setError(err.message || "שגיאה במחיקה");
    }
  }

  return (
    <div style={styles.form}>
      <h2>מחיקת משתמש</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleDelete} style={styles.button}>מחק</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
const styles = {
  form: {
    maxWidth: 400,
    margin: "auto",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 0 10px #ccc",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
