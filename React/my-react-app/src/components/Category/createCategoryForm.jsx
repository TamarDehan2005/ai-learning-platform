import React, { useState } from "react";
import { createCategory } from "../../api/categoriesApi";
import "../../styles/CategoryForm.css";

const CreateCategoryForm = ({ onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ name: categoryName })
      .then(() => {
        setCategoryName("");
        onCategoryCreated();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <h3>יצירת קטגוריה חדשה</h3>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="שם הקטגוריה"
        required
      />
      <button type="submit">צור קטגוריה</button>
    </form>
  );
};

export default CreateCategoryForm;
