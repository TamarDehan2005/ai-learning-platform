// import React, { useEffect, useState } from "react";
// import { getAllUserPrompts } from "../../api/promptsApi";

// export default function UserPrompts({ userId }) {
//   const [prompts, setPrompts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!userId) return;

//     setLoading(true);
//     setError(null);

//     getAllUserPrompts(userId)
//       .then(data => setPrompts(data))
//       .catch(err => setError(err.message || "שגיאה בטעינת ההנחיות"))
//       .finally(() => setLoading(false));
//   }, [userId]);

//   if (loading) return <p>טוען...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={styles.container}>
//       <h2>הנחיות של משתמש #{userId}</h2>
//       {prompts.length === 0 ? (
//         <p>אין הנחיות להצגה.</p>
//       ) : (
//         <ul>
//           {prompts.map((prompt, idx) => (
//             <li key={idx}>{prompt.prompt1}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: 600,
//     margin: "auto",
//     padding: 20,
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
// };
