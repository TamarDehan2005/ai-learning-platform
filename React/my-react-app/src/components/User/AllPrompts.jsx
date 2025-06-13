// AllPrompts.js
import React, { useEffect, useState } from "react";
import { getAllPrompts } from "../../api/usersApi";

export default function AllPrompts() {
  const [prompts, setPrompts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrompts() {
      try {
        const result = await getAllPrompts();
        setPrompts(result);
      } catch (err) {
        setError(err.message || "שגיאה בקבלת פרומפטים");
      }
    }
    fetchPrompts();
  }, []);

  return (
    <div style={styles.form}>
      <h2>כל ההנחיות</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {prompts.map((prompt, i) => (
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
