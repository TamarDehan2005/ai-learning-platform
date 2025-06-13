import React, { useState } from "react";
import { registerUser } from "../../api/usersApi";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!name.trim() || !phone.trim()) {
      setError("יש למלא שם ומספר טלפון.");
      return;
    }

    try {
      const user = await registerUser(name, phone);
      setMessage(`נרשמת בהצלחה: ${user.name} (${user.phone}) ${user.Id}`);
      setName("");
      setPhone("");
    } catch (err) {
      setError(err.message || "שגיאה בהרשמה");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>הרשמת משתמש חדש</h2>
      <input
        type="text"
        placeholder="שם"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>הרשם</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
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
