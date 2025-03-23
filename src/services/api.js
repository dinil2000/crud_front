import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  
  getAllItems: async () => {
    try {
      const response = await axios.get(`${API_URL}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  getItemById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  },

  searchItems: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/items/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching items:', error);
      throw error;
    }
  },

  createItem: async (item) => {
    try {
      const response = await axios.post(`${API_URL}/items`, item);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  updateItem: async (id, item) => {
    try {
      const response = await axios.put(`${API_URL}/items/${id}`, item);
      return response.data;
    } catch (error) {
      console.error(`Error updating item ${id}:`, error);
      throw error;
    }
  },

  deleteItem: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  }
};

export default api;