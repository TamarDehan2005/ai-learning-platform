import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "12px 24px",
    margin: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "30px" }}>שלום מנהל</h1>
      <button style={buttonStyle} onClick={() => navigate("/admin/delete")}>
        מחיקת משתמש
      </button>
      <button style={buttonStyle} onClick={() => navigate("/admin/prompts")}>
        כל ההנחיות שמשתמשים בקשו
      </button>
       <button style={buttonStyle} onClick={() => navigate("/admin/users")}>
        כל המשתמשים
      </button>
      
        <button style={buttonStyle} onClick={() => navigate("/admin/ManageCategory")}>
        ניהול קטגוריות  
        
      </button>
       <button style={buttonStyle} onClick={() => navigate("/admin/ManageSubCategory")}>
        ניהול קטגוריות משנה  
        
      </button>
    </div>
  );
}

export default AdminPage;
