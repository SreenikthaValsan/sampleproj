// Dashboard.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, defs, linearGradient, stop } from 'recharts';
import { Home, ChevronDown } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';

const salesData = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 20 },
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 30 },
  { month: 'May', value: 50 },
  { month: 'June', value: 40 }
];

const StatCard = ({ icon: Icon, title, value, change, isPositive }) => (
  <div className="stat-card">
    <div className="stat-header">
      <div className="icon-container">
        <Home className="home-icon" />
      </div>
      <span className="stat-title">{title}</span>
    </div>
    <div className="stat-value">{value}</div>
    <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
      {isPositive ? '+' : '-'}{Math.abs(change)}% than last month
    </div>
  </div>
);

const FollowUpCard = ({ name, phone, location, status, nextFollowUp, lastUpdate }) => (
  <div className="follow-up-card">
    <div className="follow-up-header">
      <div className="follow-up-info">
        <div className="avatar">
          <img src="/api/placeholder/48/48" alt="User" />
        </div>
        <div className="follow-up-details">
          <h3>{name}</h3>
          <p>{phone}</p>
          <p>{location}</p>
        </div>
      </div>
      <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>
        {status}
      </span>
    </div>
    <div className="follow-up-footer">
      <div className="notes-section">
        <span className="notes-icon">📝</span>
        <span className="notes-text">Notes...</span>
      </div>
      <div className="date-info">
        <div>
          <span className="date-label">Next Follow Up:</span> {nextFollowUp}
        </div>
        <div>
          <span className="date-label">Last Update:</span> {lastUpdate}
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-title">Dashboard</div>
        </header>
        
        {/* Stats and Chart Grid */}
        <div className="dashboard-grid">
          {/* Stats Container */}
          <div className="stats-container">
            <StatCard 
              icon={Home} 
              title="Total Properties" 
              value="59" 
              change={5} 
              isPositive={true} 
            />
            <StatCard 
              icon={Home} 
              title="Properties for sale" 
              value="23" 
              change={8} 
              isPositive={true} 
            />
            <StatCard 
              icon={Home} 
              title="Properties for rent" 
              value="36" 
              change={3} 
              isPositive={false} 
            />
            <StatCard 
              icon={Home} 
              title="New leads" 
              value="320" 
              change={12} 
              isPositive={true} 
            />
          </div>
          
          {/* Sales Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-title">
                Sales Analytics 
                <ChevronDown className="chevron-icon" />
              </div>
              <select className="chart-filter">
                <option>Last year</option>
              </select>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} barSize={30}>
                  <defs>
                    <linearGradient id="conicGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ff7e5f" />
                      <stop offset="33%" stopColor="#feb47b" />
                      <stop offset="66%" stopColor="#6a82fb" />
                      <stop offset="100%" stopColor="#fc5c7d" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Bar dataKey="value" fill="url(#conicGradient)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Follow Ups Section */}
        <div className="follow-ups-section">
          <div className="section-header">
            <h2>Follow Ups & Tasks</h2>
            <select className="follow-ups-filter">
              <option>All</option>
            </select>
          </div>
          <FollowUpCard 
            name="Dubizzle Call"
            phone="971508999519"
            location="Park Lane, Dubai Hills Estate"
            status="No Answer"
            nextFollowUp="Mar 23, 2023"
            lastUpdate="Mar 23, 2023"
          />
          <FollowUpCard 
            name="Dubizzle Call"
            phone="971508999519"
            location="Park Lane, Dubai Hills Estate"
            status="Agent Enquiry"
            nextFollowUp="Mar 23, 2023"
            lastUpdate="Mar 23, 2023"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;