import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;
