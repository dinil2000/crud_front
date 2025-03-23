import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

    

  useEffect(() => {
    fetchItems();
  
    
   
  }, []);

  // console.log(loading);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await api.getAllItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (searchTerm.trim() === '') {
        fetchItems();
      } else {
        const data = await api.searchItems(searchTerm);
        setItems(data);
      }
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.deleteItem(id);
        // Remove item from state
        setItems(items.filter(item => item.id !== id));
      } catch (err) {
        setError('Failed to delete item. Please try again.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="item-list">
      <h2>Items List</h2>
      
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      
      {items.length === 0 ? (
        <div className="no-items">
          <p>No items found.</p>
          <Link to="/add" className="add-link">Add New Item</Link>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p className="item-category">{item.category}</p>
              <p className="item-description">{item.description.substring(0, 100)}...</p>
              <div className="item-actions">
                <Link to={`/items/${item.id}`} className="view-btn">View</Link>
                <Link to={`/edit/${item.id}`} className="edit-btn">Edit</Link>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;