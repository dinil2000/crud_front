import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/ItemForm.css';

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const data = await api.getItemById(id);
          setFormData({
            name: data.name,
            description: data.description,
            category: data.category || ''
          });
          setError(null);
        } catch (err) {
          setError('Failed to fetch item details. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItem();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      const errorMessage = Object.values(validationErrors).join(', ');
      setError(errorMessage);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      if (isEditMode) {
        await api.updateItem(id, formData);
      } else {
        await api.createItem(formData);
      }
      
      setSubmitSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      const errorMessage = isEditMode
        ? 'Failed to update item. Please try again.'
        : 'Failed to create item. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) return <div className="loading">Loading...</div>;

  return (
    <div className="item-form">
      <h2>{isEditMode ? 'Edit Item' : 'Add New Item'}</h2>
      
      {submitSuccess && (
        <div className="success-message">
          {isEditMode ? 'Item updated successfully!' : 'Item created successfully!'}
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Item' : 'Create Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;