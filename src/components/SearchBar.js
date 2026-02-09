// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, onSortChange, sortBy }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products by name, description, or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="">Sort by...</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="category-asc">Category (A-Z)</option>
      </select>
    </div>
  );
};

export default SearchBar;
