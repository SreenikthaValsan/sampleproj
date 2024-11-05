// Sidebar.js
import React from 'react';
import './Sidebar.css'

const navItems = [
  { icon: '📊', label: 'Dashboard', active: true },
  { icon: '📅', label: 'Calendar' },
  { icon: '📝', label: 'Listing' },
  { icon: '👥', label: 'Leads' },
  { icon: '📞', label: 'Contacts & Owners' },
  { icon: '📊', label: 'Reports' },
  { icon: '📧', label: 'Email Template' },
  { icon: '📄', label: 'Form Generator' },
  { icon: '🏆', label: 'Leader Board' },
  { icon: '🌟', label: 'Wall of Fame' }
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">Logo</div>
      <nav className="nav-menu">
        {navItems.map((item, index) => (
          <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;