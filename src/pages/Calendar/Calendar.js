import React, { useState , useEffect } from 'react';
import { ChevronLeft, ChevronRight, Moon } from 'lucide-react';
import './Calendar.css';

const Calendar = () => {
  const [activeTab, setActiveTab] = useState('Month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]); // State to store events
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const API_BASE_URL = 'http://127.0.0.1:5050/getCalendarData';

    useEffect(() => {
      const fetchCalendarData = async () => {
        try {
          const response = await fetch(API_BASE_URL, {
            method: 'POST',
          });
          const data = await response.json();
          setEvents(data.data.eventsData); // Store events in state
          console.log("cal",data.data.eventsData)
        } catch (error) {
          console.error('Error fetching calendar data:', error);
        }
      };
  
      fetchCalendarData();
    }, []);
  
    const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
  
    const getFirstDayOfMonth = (date) => {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      return firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
    };
  
    const navigateMonth = (direction) => {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
    };
  
    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDayOffset = getFirstDayOfMonth(currentDate);
        const calendarDays = [];
        
        // Add empty cells for offset
        for (let i = 0; i < firstDayOffset; i++) {
          const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
          calendarDays.push(
            <div key={`empty-prev-${i}`} className="day-cell">
              <span className="day-number disabled">
                {prevMonthDays - firstDayOffset + i + 1}
              </span>
            </div>
          );
        }
    
        // Add current month days
        for (let day = 1; day <= daysInMonth; day++) {
          // Find all events for the current day
          const eventsForDay = events.filter(event => {
            const eventDate = new Date(event.event_date);
            return eventDate.getDate() === day && 
                   eventDate.getMonth() === currentDate.getMonth() && 
                   eventDate.getFullYear() === currentDate.getFullYear();
          });
    
          calendarDays.push(
            <div key={`day-${day}`} className="day-cell">
              <span className="day-number">{day}</span>
              {eventsForDay.length > 0 && (
                <div className="events">
                  {eventsForDay.map((event, index) => (
                    <div key={index} className="event" style={{ color: 'blue' }}>
                      {event.note}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }
  
      // Add next month days
      const remainingCells = 42 - (firstDayOffset + daysInMonth); // Always show 6 weeks
      for (let i = 1; i <= remainingCells; i++) {
        calendarDays.push(
          <div key={`empty-next-${i}`} className="day-cell">
            <span className="day-number disabled">{i}</span>
          </div>
        );
      }
  
      return calendarDays;
    };
  
    return (
      <div className="app-container">
        <div className="calendar">
          <div className="header">
            <div className=" top-bar">
              <h1>Calendar</h1>
            </div>
            
            <div className="tabs">
            {['Day', 'Week', 'Month'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab} 
              </button>
            ))}
          </div>
  
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
          </div>
  
          <div className="calendar-body">
            <div className="week-days">
              {days.map(day => (
                <div key={day} className="week-day">{day}</div>
              ))}
            </div>
  
            <div className="days-grid">
              {renderCalendarDays()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Calendar;