// import React, { useState } from "react";
// import { handleUserPrompt } from "../api/promptsApi";

// export default function SubmitPromptForm({ userId }) {
//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [promptText, setPromptText] = useState("");
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function onSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setResponse(null);

//     try {
//       const res = await handleUserPrompt(userId, categoryName, subCategoryName, promptText);
//       setResponse(res);
//     } catch (err) {
//       setError(err.message || "שגיאה בשליחת ההנחיה");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={onSubmit} style={styles.form}>
//       <h2>שליחת הנחיה</h2>
//       <input
//         placeholder="קטגוריה"
//         value={categoryName}
//         onChange={e => setCategoryName(e.target.value)}
//         style={styles.input}
//         required
//       />
//       <input
//         placeholder="תת קטגוריה"
//         value={subCategoryName}
//         onChange={e => setSubCategoryName(e.target.value)}
//         style={styles.input}
//         required
//       />
//       <textarea
//         placeholder="כתוב את ההנחיה כאן"
//         value={promptText}
//         onChange={e => setPromptText(e.target.value)}
//         style={{ ...styles.input, height: 80 }}
//         required
//       />
//       <button disabled={loading} style={styles.button} type="submit">
//         {loading ? "שולח..." : "שלח"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {response && (
//         <div style={styles.responseBox}>
//           <h3>תשובת AI:</h3>
//           <p>{response}</p>
//         </div>
//       )}
//     </form>
//   );
// }

// const styles = {
//   form: {
//     maxWidth: 400,
//     margin: "auto",
//     padding: 20,
//     borderRadius: 8,
//     boxShadow: "0 0 10px #ccc",
//     backgroundColor: "#f9f9f9",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 4,
//     border: "1px solid #ccc",
//     fontSize: 16,
//     boxSizing: "border-box",
//   },
//   button: {
//     width: "100%",
//     padding: 12,
//     backgroundColor: "#007bff",
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//     border: "none",
//     borderRadius: 4,
//     cursor: "pointer",
//   },
//   responseBox: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: "#e9f5ff",
//     borderRadius: 6,
//     border: "1px solid #b3d4fc",
//   },
// };
