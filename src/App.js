import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/add" element={<ItemForm />} />
            <Route path="/edit/:id" element={<ItemForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;