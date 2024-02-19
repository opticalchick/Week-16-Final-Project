import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import OtherRecordList from './Components/OtherRecordList.js';
import NewOtherRecord from './Components/NewOtherRecord.js';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oilChange" element={<OCRecordList />} />
        <Route path="/oilChangeNewEntry" element={<NewOCRecord />} />
        <Route path="/tires" element={<TireRecordList />} />
        <Route path="/tiresNewEntry" element={<NewTiresRecord />} />
        <Route path="/preventativeMaintenance" element={<PMRecordList />} />
        <Route path="/preventativeMaintenanceNewEntry" element={<NewPMRecord />} />
        <Route path="/otherRecord" element={<OtherRecordList />} />
        <Route path="/otherRecordNewEntry" element={<NewOtherRecord />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
