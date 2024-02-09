import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navbar.js';
import './App.css';
import Home from './Components/Home.js';
import Footer from './Components/Footer.js';
import OCRecordList from './Components/OCRecordList.js';
import TiresRecordList from './Components/TiresRecordList.js';
import PMRecordList from './Components/PMRecordList.js';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oilChange" element={<OCRecordList />} />
        <Route path="/tires" element={<TiresRecordList />} />
        <Route path="/preventativeMaintenance" element={<PMRecordList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
