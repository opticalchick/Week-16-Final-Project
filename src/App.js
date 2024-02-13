import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navbar.js';
import './App.css';
import Home from './Components/Home.js';
import Footer from './Components/Footer.js';
import OCRecordList from './Components/OCRecordList.js';
import TireRecordList from './Components/TiresRecordList.js';
import PMRecordList from './Components/PMRecordList.js';
import NewOCRecord from './Components/NewOCRecord.js';
import NewPMRecord from './Components/NewPMRecord.js';
import NewTiresRecord from './Components/NewTiresRecord.js';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/oilChange" element={<OCRecordList />} />
        <Route path="/oilChangeNewEntry" element={<NewOCRecord />} />
        <Route path="/tires" element={<TireRecordList />} />
        <Route path="/tiresNewEntry" element={<NewTiresRecord />} />
        <Route path="/preventativeMaintenance" element={<PMRecordList />} />
        <Route path="/preventativeMaintenanceNewEntry" element={<NewPMRecord />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
