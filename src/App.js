// src/App.js - COMPLETELY FIXED VERSION
import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';
import { itemService } from './services/api';
import { toast } from './utils/toast';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, itemId: null });

  // Fetch all items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await itemService.getAll();
      setItems(data);
      setFilteredItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items');
      toast.error(err.message || 'Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search and sort logic
  useEffect(() => {
    let result = [...items];

    // Search filter
    if (searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    if (sortBy) {
      const [field, order] = sortBy.split('-');
      result.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (order === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    setFilteredItems(result);
  }, [searchTerm, sortBy, items]);

  // Create/Update item
  const saveItem = async (itemData) => {
    try {
      if (editingItem) {
        await itemService.update(editingItem.id, itemData);
        toast.success('Product updated successfully!');
      } else {
        await itemService.create(itemData);
        toast.success('Product added successfully!');
      }
      fetchItems();
      setEditingItem(null);
    } catch (err) {
      toast.error(err.message || 'Error saving product');
      console.error(err);
    }
  };

  // Delete item with confirmation
  const handleDeleteClick = (id) => {
    setConfirmModal({ isOpen: true, itemId: id });
  };

  const confirmDelete = async () => {
    try {
      await itemService.delete(confirmModal.itemId);
      toast.success('Product deleted successfully!');
      fetchItems();
    } catch (err) {
      toast.error(err.message || 'Error deleting product');
      console.error(err);
    } finally {
      setConfirmModal({ isOpen: false, itemId: null });
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
    toast.info('Editing mode activated');
  };

  const cancelEdit = () => {
    setEditingItem(null);
    toast.info('Edit cancelled');
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 E-Commerce Dashboard</h1>
        <p>Manage your products with ease</p>
      </header>
      
      <Toast />
      
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, itemId: null })}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
      
      <div className="container">
        <div className="form-section">
          <ItemForm 
            onSave={saveItem} 
            editingItem={editingItem}
            onCancel={cancelEdit}
          />
        </div>

        <div className="list-section">
          {loading ? (
            <div className="loading">⏳ Loading products...</div>
          ) : error ? (
            <div className="error">❌ {error}</div>
          ) : (
            <>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
              <ItemList 
                items={filteredItems} 
                onEdit={editItem}
                onDelete={handleDeleteClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;