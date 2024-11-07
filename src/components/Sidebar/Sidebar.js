import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { icon: '📊', label: 'Dashboard', path: '/' },
  { icon: '📅', label: 'Calendar', path: '/calendar' },
  { icon: '📝', label: 'Listing', path: '/listing' },
  { icon: '👥', label: 'Leads', path: '/leads' },
  { icon: '📞', label: 'Contacts & Owners', path: '/contacts' },
  { icon: '📊', label: 'Reports', path: '/reports' },
  { icon: '📧', label: 'Email Template', path: '/email-template' },
  { icon: '📄', label: 'Form Generator', path: '/form-generator' },
  { icon: '🏆', label: 'Leader Board', path: '/leader-board' },
  { icon: '🌟', label: 'Wall of Fame', path: '/wall-of-fame' }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false); // Close the sidebar after navigation
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <X /> : <Menu />}
      </div>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo">Logo</div>
        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;