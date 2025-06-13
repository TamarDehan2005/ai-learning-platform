// UserHistory.js
import React, { useState } from "react";
import { getUserHistory } from "../../api/usersApi";

export default function UserHistory() {
  const [userId, setUserId] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  async function handleFetch() {
    setError(null);
    try {
      const result = await getUserHistory(userId);
      setHistory(result);
    } catch (err) {
      setError(err.message || "שגיאה בקבלת היסטוריה");
    }
  }

  return (
    <div style={styles.form}>
      <h2>היסטוריית למידה</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleFetch} style={styles.button}>הצג היסטוריה</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {history.map((prompt, i) => (
          <li key={i}>{prompt.prompt1}</li>
        ))}
      </ul>
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
