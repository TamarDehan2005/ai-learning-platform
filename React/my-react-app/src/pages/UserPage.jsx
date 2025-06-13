import React from "react";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>ברוך הבא לעמוד משתמש</h2>
      <button 
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }} 
        onClick={() => navigate("/user/Register")}
      >
        רישום משתמש
      </button>
      <button 
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }} 
        onClick={() => navigate("/user/history")}
      >
        היסטוריית משתמש
      </button>
      <button 
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }} 
        onClick={() => navigate("/user/details")}
      >
        פרטי משתמש
      </button>
      <button 
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }} 
        onClick={() => navigate("/user/submit-prompt")}
      >
        שליחת הצעה
      </button>
       {/* <button
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }} 
       onClick={() => navigate("/user/history_")}
       >הצג היסטוריית פרומפטים שלי</button>
    */}

    <button 
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }} 
        onClick={() => navigate("/user/CategoryList")}
      >
        הצג קטגוריות
      </button>
    </div>

   );
}

export default UserPage;
