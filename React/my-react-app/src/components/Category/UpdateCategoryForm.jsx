import React, { useState, useEffect } from "react";
import { updateCategory } from "../../api/categoriesApi";
import "../../styles/CategoryForm.css";

const UpdateCategoryForm = ({ category, onCategoryUpdated }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(category.id, { id: category.id, name: categoryName })
      .then(() => {
        onCategoryUpdated();
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  if (!category) return null;

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <h3>עריכת קטגוריה</h3>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="שם חדש לקטגוריה"
        required
      />
      <button type="submit">עדכן קטגוריה</button>
    </form>
  );
};

export default UpdateCategoryForm;
