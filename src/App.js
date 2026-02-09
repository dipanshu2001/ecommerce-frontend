// src/App.js - FIXED VERSION
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import Toast from './components/Toast';  // ADD TOAST
import './App.css';

const API_BASE_URL = '/api';  // ✅ PROXY ROUTE (NOT direct Railway URL)

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch all items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/items`);
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create/Update item
  const saveItem = async (itemData) => {
    try {
      if (editingItem) {
        await axios.put(`${API_BASE_URL}/items/${editingItem.id}`, itemData);
      } else {
        await axios.post(`${API_BASE_URL}/items`, itemData);
      }
      fetchItems();
      setEditingItem(null);
    } catch (err) {
      alert('Error saving item');
    }
  };

  // Delete item  
  const deleteItem = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await axios.delete(`${API_BASE_URL}/items/${id}`);
        fetchItems();
      } catch (err) {
        alert('Error deleting item');
      }
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 E-Commerce Dashboard</h1>
        <p>Live API: <a href="https://simple-e-commerce-production.up.railway.app/api/items" target="_blank" rel="noopener noreferrer">Railway</a></p>
      </header>
      
      <Toast />  {/* ADD TOAST COMPONENT */}
      
      <div className="container">
        <div className="form-section">
          <ItemForm 
            onSave={saveItem} 
            editingItem={editingItem}
            onCancel={() => setEditingItem(null)}
          />
        </div>

        <div className="list-section">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <ItemList 
              items={items} 
              onEdit={editItem}
              onDelete={deleteItem}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
