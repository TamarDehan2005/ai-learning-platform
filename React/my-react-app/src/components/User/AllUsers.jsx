// AllUsers.js
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/usersApi";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await getAllUsers();
        setUsers(result);
      } catch (err) {
        setError(err.message || "שגיאה בקבלת משתמשים");
      }
    }
    fetchUsers();
  }, []);

  return (
    <div style={styles.form}>
      <h2>כל המשתמשים</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.phone}</li>
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

