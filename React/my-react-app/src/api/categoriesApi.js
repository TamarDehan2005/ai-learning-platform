const API_BASE = "http://localhost:5213/api/categories";

// מחזיר את כל הקטגוריות
export async function getAllCategories() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.json();
}

// מחזיר קטגוריה לפי מזהה
export async function getCategoryById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.json();
}

// יוצר קטגוריה חדשה
export async function createCategory(categoryDto) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryDto),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.json();
}

// מעדכן קטגוריה קיימת
export async function updateCategory(id, categoryDto) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryDto),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.json();
}

// מוחק קטגוריה לפי מזהה
export async function deleteCategory(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
}
