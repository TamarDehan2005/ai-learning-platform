import React from 'react';

function CategoryItem({ category, onEdit, onDelete }) {
  return (
    <div className="category-item">
      <h3>{category.name}</h3>

    </div>
  );
}

export default CategoryItem;