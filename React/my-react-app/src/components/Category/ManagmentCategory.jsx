import React, { useState, useEffect } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categoriesApi";
import "../../styles/CategoryManagement.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { name: categoryName });
      } else {
        await createCategory({ name: categoryName });
      }
      setCategoryName("");
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

 const handleDelete = async (id) => {
  if (window.confirm("האם את בטוחה שברצונך למחוק את הקטגוריה?")) {
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);

      const errorMessage =
        error.response?.data?.message || error.message || "";

      if (
        errorMessage.includes("לא ניתן למחוק") ||
        errorMessage.includes("בשימוש")
      ) {
        alert("הקטגוריה בשימוש ואי אפשר למחוק אותה.");
      } else {
        alert("אירעה שגיאה בעת מחיקת הקטגוריה.");
      }
    }
  }
};



  return (
    <div className="category-management">
      <h2>ניהול קטגוריות</h2>

      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="שם קטגוריה"
          required
        />
        <button type="submit">
          {editingCategory ? "עדכן קטגוריה" : "הוסף קטגוריה"}
        </button>
        {editingCategory && (
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              setEditingCategory(null);
              setCategoryName("");
            }}
          >
            בטל
          </button>
        )}
      </form>

      <table className="category-table">
        <thead>
          <tr>
            <th>שם הקטגוריה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(cat)}>
                  עריכה
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(cat.id)}
                >
                  מחיקה
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;
