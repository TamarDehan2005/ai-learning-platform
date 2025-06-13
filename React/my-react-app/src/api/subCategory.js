const API_URL = "https://localhost:7256/api/subcategories";

export const getAllSubCategories = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return await res.json();
};

export const createSubCategory = async (subCategory) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subCategory),
  });
  if (!res.ok) throw new Error("Failed to create subcategory");
  return await res.json();
};

export const updateSubCategory = async (id, subCategory) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subCategory),
  });
  if (!res.ok) throw new Error("Failed to update subcategory");
  return await res.json();
};

export const deleteSubCategory = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete subcategory");
  return true;
};
