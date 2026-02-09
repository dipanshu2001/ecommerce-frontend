// src/components/ItemCard.js
import React from 'react';
import './ItemCard.css';  // ✅ ADDED MISSING IMPORT

const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p className="description">{item.description}</p>
      <div className="item-details">
        <span className="price">₹{item.price}</span>
        <span className="category">{item.category}</span>
        <span className="id">ID: {item.id}</span>
      </div>
      <div className="actions">
        <button className="btn-edit" onClick={() => onEdit(item)}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;