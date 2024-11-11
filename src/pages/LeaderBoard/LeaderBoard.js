import React , {useState} from 'react';
import { ChevronLeft, ChevronRight, Target } from 'lucide-react';
import './LeaderBoard.css';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('By Month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
  };

  return (
    <div className="leader-board">
      <div className="header">
      <h1>Leader Board</h1>
        <div className="tabs">
            {['By Month', 'By Quarter'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab} 
              </button>
            ))}
          </div>
      </div>
      
      <div className="content">
      <div className="month-nav">
              <div className="month-title">
                <button className="nav-button" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft size={20} />
                </button>
                <span>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                <button className="nav-button" onClick={() => navigateMonth(1)}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
        
        <div className="target-section">
    <div className="target-cards-container">
        {/* Main target section */}
        <div className="target-main">
        <div className="target-icon">
                <Target size={80} /> 
              </div>
            <div className="target-content">
                <div className="target-label">Target</div>
                <div className="target-value">800K AED</div>
                <div className="progress-container">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: '50.7%' }}></div>
                  </div>
                  <div className="target-progress">50.7%</div> {/* Placed next to the progress bar */}
                </div>
            </div>
        </div>

        {/* Stats cards */}
        <div className="stats-cards">
            <div className="stats-card">
                <div className="stats-icon">🏆</div>
                <div className="stats-label">Achieved</div>
                <div className="stats-value">400.5K AED</div>
            </div>

            <div className="stats-card">
                <div className="stats-icon">🏆</div>
                <div className="stats-label">Remaining</div>
                <div className="stats-value">399.5K AED</div>
            </div>

            <div className="stats-card">
                <div className="stats-icon">🏠</div>
                <div className="stats-label">Closed Deals</div>
                <div className="stats-value">9</div>
            </div>
        </div>
    </div>
</div>

        <div className="leader-cards">
          {[1, 2, 3, 4, 5, 6 ,7 ,8].map((index) => (
            <div key={index} className="leader-card">
              <div className="leader-info">
                <div className="leader-image-container">
                  <div className="leader-image"></div>
                  <div className="leader-name">Sergio Sirbiladzle</div>
                </div>
                <div className="leader-achievements">
                  <div className="achievement-item">
                    <div className="achievement-label">Closed Deals</div>
                    <div className="achievement-value">9</div>
                  </div>
                  <div className="achievement-item">
                    <div className="achievement-label">Total Commission</div>
                    <div className="achievement-value">260 AED</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;