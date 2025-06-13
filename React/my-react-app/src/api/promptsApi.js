const API_BASE = "http://localhost:5213/api/prompts";

// שולח prompt ל-AI ושומר תשובה
export async function handleUserPrompt(userId, categoryName, subCategoryName, promptText) {
  const res = await fetch(`${API_BASE}/handle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, categoryName, subCategoryName, promptText }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  const data = await res.json();
  return data.response;  // לפי מה שהשרת מחזיר - מחזיר את המפתח response
}

// מחזיר את כל ההנחיות של משתמש ספציפי
export async function getAllUserPrompts(userId) {
  const res = await fetch(`${API_BASE}/user/${userId}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.json();
}
