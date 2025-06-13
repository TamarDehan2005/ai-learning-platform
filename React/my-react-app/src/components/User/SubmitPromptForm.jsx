import React, { useState } from "react";
import { submitPrompt } from "../../api/usersApi";

export default function SubmitPromptForm() {
  const [userId, setUserId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [promptText, setPromptText] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResponse(null);

    if (!userId || !categoryName.trim() || !subCategoryName.trim() || !promptText.trim()) {
      setError("נא למלא את כל השדות.");
      return;
    }

    try {
      const res = await submitPrompt(
        parseInt(userId),
        categoryName,
        subCategoryName,
        promptText
      );
      setResponse(res);
      setUserId("");
      setCategoryName("");
      setSubCategoryName("");
      setPromptText("");
    } catch (err) {
      setError(err.message || "שגיאה בשליחת הפרומפט");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>שליחת פרומפט למערכת AI</h2>
      <input
        type="number"
        placeholder="מזהה משתמש"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="קטגוריה"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="תת-קטגוריה"
        value={subCategoryName}
        onChange={(e) => setSubCategoryName(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="טקסט פרומפט"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>שלח</button>
      {response && <p style={{ color: "green", whiteSpace: "pre-wrap" }}>{response}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
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
