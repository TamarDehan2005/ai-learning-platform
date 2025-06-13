const API_BASE = "http://localhost:5213/api/users";

export async function registerUser(name, phone) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function submitPrompt(userId, categoryName, subCategoryName, promptText) {
  const res = await fetch(`${API_BASE}/submit-prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, categoryName, subCategoryName, promptText }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

export async function getUserHistory(userId) {
  const res = await fetch(`${API_BASE}/${userId}/history`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getAllPrompts() {
  const res = await fetch(`${API_BASE}/all-prompts`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteUser(userId) {
  const res = await fetch(`${API_BASE}/delete/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

// הפונקציה שהוספתי, לפי הקומפוננטה שלך:
export async function getUserDetails(userId) {
  const res = await fetch(`${API_BASE}/${userId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
