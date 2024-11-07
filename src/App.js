// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Listing from './pages/Listing/Listing';
import Calendar from './pages/Calendar/Calendar';
import Leads from './pages/Leads/Leads';
import Reports from './pages/Reports/Reports';
import ContactsOwners from './pages/ContactsOwners/ContactsOwners';
import CommunicationTemplate from './pages/CommunicationTemplate/CommunicationTemplate';
import FormGenerator from './pages/FormGenerator/FormGenerator';
import LeaderBoard from './pages/LeaderBoard/LeaderBoard';
import WallofFame from './pages/WallofFame/WallofFame';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/contacts" element={<ContactsOwners />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/communication-template" element={<CommunicationTemplate />} />
            <Route path="/form-generator" element={<FormGenerator />} />
            <Route path="/leader-board" element={<LeaderBoard />} />
            <Route path="/wall-of-fame" element={<WallofFame />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;