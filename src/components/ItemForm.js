// src/components/ItemForm.js
import React, { useState, useEffect } from 'react';

const ItemForm = ({ onSave, editingItem, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price.toString(),
        category: editingItem.category || ''
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || parseFloat(formData.price) < 100) {
      alert('Name, description required. Price must be ≥ 100');
      return;
    }
    onSave({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category
    });
    if (!editingItem) {
      setFormData({ name: '', description: '', price: '', category: '' });
    }
  };

  return (
    <div className="item-form">
      <h2>{editingItem ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name *"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description *"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price (min 100) *"
          value={formData.price}
          onChange={handleChange}
          min="100"
          step="0.01"
          required
        />
        <input
          name="category"
          placeholder="Category (optional)"
          value={formData.category}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingItem ? 'Update' : 'Add Product'}
          </button>
          {editingItem && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
