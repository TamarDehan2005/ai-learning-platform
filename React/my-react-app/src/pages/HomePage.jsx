import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import { useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [error, setError] = useState("");

  // פונקציה לבדוק אם האדמין קיים (דוגמה, תעדכן לפי ה-API שלך)
  const checkAdminExists = async (id) => {
    try {
      const res = await fetch(`http://localhost:5213/api/users/${id}`);
      if (!res.ok) throw new Error();
      const user = await res.json();
      return user && user.isAdmin; // תעדכן לפי המבנה שלך
    } catch {
      return false;
    }
  };

  const handleAdminLogin = async () => {
    if (!adminId) {
      setError("Please enter your admin ID.");
      return;
    }
    const exists = await checkAdminExists(adminId);
    if (exists) {
      navigate("/admin");
    } else {
      setError("Admin not found. Please register first.");
      setTimeout(() => {
        navigate("/register");
      }, 1500);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title"> Welcome :)</h1>
      <button className="home-button" onClick={() => navigate("/register")}>
        Login as a user
        <br />
        Press Here: 👆
      </button>
      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Enter Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          className="home-input"
        />
        <button className="home-button" onClick={handleAdminLogin}>
          Log in as administrator
          <br />
          Press Here: 👆
        </button>
        {error && <div className="home-error">{error}</div>}
      </div>
    </div>
  );
}

export default HomePage;