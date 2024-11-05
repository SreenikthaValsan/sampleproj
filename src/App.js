// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/pages/Dashboard/Dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Add more routes as needed */}
        <Route path="/calendar" element={<div>Calendar Page</div>} />
        <Route path="/listing" element={<div>Listing Page</div>} />
        <Route path="/leads" element={<div>Leads Page</div>} />
        <Route path="/contacts" element={<div>Contacts Page</div>} />
        <Route path="/reports" element={<div>Reports Page</div>} />
        <Route path="/email-template" element={<div>Email Template Page</div>} />
        <Route path="/form-generator" element={<div>Form Generator Page</div>} />
        <Route path="/leader-board" element={<div>Leader Board Page</div>} />
        <Route path="/wall-of-fame" element={<div>Wall of Fame Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;