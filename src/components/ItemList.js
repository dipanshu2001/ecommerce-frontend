// src/components/ItemList.js
import React from 'react';
import ItemCard from './ItemCard';
import './ItemList.css';

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <div className="item-list">
      <h2>📦 Products ({items.length})</h2>
      <div className="grid">
        {items.map(item => (
          <ItemCard 
            key={item.id} 
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
