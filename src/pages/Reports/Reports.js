import React, { useState, useEffect } from 'react';
import { Download, Columns, Plus, Edit, Eye, FileUp } from 'lucide-react';


const Reports = () => {
  const [activeTab, setActiveTab] = useState('All Calls');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);
  const [propertyForOptions, setPropertyForOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]);
  const [portalOptions, setPortalOptions] = useState([]);
  const [counts, setCounts] = useState({});

  const [filters, setFilters] = useState({
    status: '',
    propertyFor: '',
    type: '',
    agent: '',
    portal: '',
    refNo: '',
    unitNo: ''
  });

  const API_BASE_URL = 'http://127.0.0.1:5050/getContacts';
  const COUNTS_URL = 'http://127.0.0.1:5050/getCounts';

  // Function to get the count key for a tab
  const getCountKey = (tabName) => {
    const mapping = {
      'All Leads': 'all_leads',
      'Unassigned': 'unassigned_leads',
      'Active Leads': 'active_leads',
      'Pending Leads': 'pending_leads',
      'Closed Deals': 'closed_leads',
      'Dead Leads': 'dead_leads',
      'Pending Leads': 'pending_leads',
      'Leads Pool': 'leads_pool',
    };
    return mapping[tabName];
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
        });
        const data = await response.json();
        setListings(data.data);

        // Extract unique options from listings
        const uniqueStatuses = [...new Set(data.data.map(listing => listing.status.name))];
        const uniquePropertyFors = [...new Set(data.data.map(listing => listing.property_for))];
        const uniqueTypes = [...new Set(data.data.map(listing => listing.prop_type.name))];
        const uniqueAgents = [...new Set(data.data.map(listing => listing.listing_agent.name))];
        const uniquePortals = [...new Set(data.data.flatMap(listing => listing.portals.map(portal => portal.name)))];

        setStatusOptions(uniqueStatuses);
        setPropertyForOptions(uniquePropertyFors);
        setTypeOptions(uniqueTypes);
        setAgentOptions(uniqueAgents);
        setPortalOptions(uniquePortals);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(COUNTS_URL, {
          method: 'POST',
        });
        const data = await response.json();
        setCounts(data.leadCounts);
        console.log("dta",data.leadCounts)
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="listing-container">
      <div className="header">
        <h1>Reports</h1>
        <div className="tabs-container">
          <div className="tabs">
            {['All Calls', 'Team Calls', 'Agent Reports'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab} {counts[getCountKey(tab)] !== undefined ? `(${counts[getCountKey(tab)]})` : '(0)'}
              </button>
            ))}
          </div>
          <div className="action-buttons">
           
            <button className="btn btn-secondary">
              <Columns size={16} />
              Columns
            </button>
           
          </div>
        </div>
      </div>

      {/* Top Filters */}
      <div className="filters-row">
        <div className="search-filters">
          <div className="filter-group">
            <label>Agent</label>
            <input
              type="text"
              name="refNo"
              value={filters.refNo}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Start date</label>
            <input
              type="text"
              name="refNo"
              value={filters.refNo}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Answer date</label>
            <input
              type="text"
              name="unitNo"
              value={filters.unitNo}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Direction</label>
            <input
              type="text"
              name="community"
              value={filters.community}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
         <div className="filter-group">
            <label>Source</label>
            <input
              type="text"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> 
          <div className="filter-group">
            <label>Destination</label>
            <input
              type="text"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> 
          <div className="filter-group">
            <label>Hang side</label>
            <input
              type="text"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> 
          <div className="filter-group">
            <label>Reason</label>
            <input
              type="text"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> 
          <div className="filter-group">
            <label>Duration</label>
            <input
              type="text"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> 
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-scroll-container">
          <table>
            <thead>
              <tr>
                <th>Agent</th>
                <th>Start date</th>
                <th>Answer date</th>
                <th>Direction</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Hang side</th>
                <th>Reason</th>
                <th>Duration</th>
                
              </tr>
            </thead>
            <tbody>
              {listings.map((listing, index) => (
                <tr key={index}>
                   <td>{listing.contact_type || 'N/A'}</td>
                  <td>{listing.name || 'N/A'}</td>
                  <td>{listing.refno || 'N/A'}</td>
                  <td>{listing.source?.name || 'N/A'}</td>
                  <td>{listing.sub_source?.name || 'N/A'}</td>
                  <td>{listing.created_by_user?.external_name || 'N/A'}</td>
                  <td>{listing.updates_at || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;