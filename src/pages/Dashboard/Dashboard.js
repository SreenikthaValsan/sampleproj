import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend , Tooltip } from 'recharts';
import { Home, ChevronDown } from 'lucide-react';
import lead from '../../assets/lead.jpg'

import './Dashboard.css';

// Sample sales data
const salesData = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 20 },
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 30 },
  { month: 'May', value: 50 },
  { month: 'June', value: 40 }
];

// Sample pie chart data
const pieChartData = [
  { name: 'Target', value: 100 },
  { name: 'Achieved', value: 70 },
  { name: 'Remaining', value: 30 },
  { name: 'Closed', value: 50 }
];

// Sample leaderboard data
const leaderboardData = [
  { id: 1, name: 'Christina B.', score: 80, rank: 1, image: {lead} },
  { id: 2, name: 'Adnan G.', score: 74, rank: 2, image: {lead} },
  { id: 3, name: 'Ahmed K.', score: 70, rank: 3, image: {lead} }
];

const StatCard = ({ icon: Icon, title, value, change, isPositive }) => (
  <div className="stat-card">
    <div className="stat-header">
      <div className="icon-container">
        <Icon className="home-icon" />
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
          <img src="/api/placeholder/48/48" alt="User " />
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

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <span className="trophy-icon">🌟</span>
        <h2>Wall of Fame</h2>
      </div>
      <div className="leaderboard-content">
        {leaderboardData.map((user) => {
          const isFirst = user.rank === 1;
          const avatarOrder = user.rank === 1 ? 2 : user.rank === 2 ? 1 : 3;
          
          return (
            <div 
              key={user.id} 
              className={`leaderboard-item rank-${user.rank}`}
              style={{ order: avatarOrder }}
            >
              <div className="avatar-container">
                <img 
                  src={lead}
                  alt={user.name} 
                  className="avatar-image"
                />
                <div className="rank-badge">{user.rank}</div>
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-score">{user.score}</span>
              </div>
            </div>
          );
        })}
      </div>
      </div>
  );
};

const DealsMetrics = () => {
  const totalDeals = 100;
  const achievedDeals = 70;
  const remainingDeals = totalDeals - achievedDeals;
  const closedDeals = 50;
  
  const closedDealsData = [
    {
      name: 'Deals',
      'Closed Deals': closedDeals,
      'In Progress': achievedDeals - closedDeals,
      'Remaining': remainingDeals,
    }
  ];

  return (
    <div className="deals-card">
      <div className="card-header">
        <h2>Deals Progress</h2>
      </div>
      <div className="card-content">
        <div className="metrics-container">
          <div className="progress-section">
            <div className="progress-header">
              <span>Overall Progress ({achievedDeals}/{totalDeals})</span>
              <span className="muted-text">{(achievedDeals/totalDeals * 100).toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(achievedDeals/totalDeals * 100)}%` }} 
              />
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-item">
              <p className="metric-value">{totalDeals}</p>
              <p className="metric-label">Target Deals</p>
            </div>
            <div className="metric-item">
              <p className="metric-value success">{achievedDeals}</p>
              <p className="metric-label">Achieved</p>
            </div>
            <div className="metric-item">
              <p className="metric-value info">{closedDeals}</p>
              <p className="metric-label">Closed</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={closedDealsData} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip />
                <Bar dataKey="Closed Deals" stackId="a" fill="#2563eb" />
                <Bar dataKey="In Progress" stackId="a" fill="#84cc16" />
                <Bar dataKey="Remaining" stackId="a" fill="#e5e7eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-dot closed" />
              <span>Closed</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot in-progress" />
              <span>In Progress</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot remaining" />
              <span>Remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <main className="main-content">
        <header className="main-header">
          <div className="title">Dashboard</div>
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
              is Positive={false} 
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
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Bar dataKey="value" fill="#ddaee6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        

        <div className="pie-leaderboard-container">
          <DealsMetrics />
          <div className="leaderboard-section">
            <Leaderboard />
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
          <div className="follow-up-cards-container">
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;