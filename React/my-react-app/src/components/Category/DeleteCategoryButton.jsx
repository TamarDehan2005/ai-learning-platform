import React from "react";
import { deleteCategory } from "../../api/categoriesApi";
import "../../styles/CategoryForm.css";

const DeleteCategoryButton = ({ categoryId, onCategoryDeleted }) => {
  const handleDelete = () => {
    if (window.confirm("האם את בטוחה שברצונך למחוק את הקטגוריה?")) {
      deleteCategory(categoryId)
        .then(() => {
          onCategoryDeleted();
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  };

  return (
    <button className="delete-button category-form" onClick={handleDelete}>
      מחק קטגוריה
    </button>
  );
};

export default DeleteCategoryButton;
