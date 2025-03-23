import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/ItemDetail.css';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const data = await api.getItemById(id);
        setItem(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch item details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.deleteItem(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete item. Please try again.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="error">Item not found</div>;

  return (
    <div className="item-detail">
      <h2>{item.name}</h2>
      <div className="detail-content">
        <p className="item-category">Category: {item.category}</p>
        <p className="item-description">{item.description}</p>
        
        <div className="created-info">
          <p>Created: {new Date(item.created_at).toLocaleString()}</p>
          {item.updated_at !== item.created_at && (
            <p>Last updated: {new Date(item.updated_at).toLocaleString()}</p>
          )}
        </div>
      </div>

      <div className="detail-actions">
        <Link to="/" className="back-btn">Back to List</Link>
        <Link to={`/edit/${item.id}`} className="edit-btn">Edit</Link>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ItemDetail;