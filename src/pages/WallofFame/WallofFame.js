import React, { useState, useEffect } from 'react';
import { Download, Columns, Plus, Edit, Eye, FileUp } from 'lucide-react';


const WallofFame = () => {
  const [activeTab, setActiveTab] = useState('All Leads');
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

  const API_BASE_URL = 'http://127.0.0.1:5050/getLeads';
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
        <h1>Leads</h1>
        <div className="tabs-container">
          <div className="tabs">
            {['All Leads', 'Unassigned', 'Active Leads', 'Pending Leads', 'Closed Deals', 'Dead Leads','Leads Pool'].map((tab) => (
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
              <Download size={16} />
              Export
            </button>
            <button className="btn btn-secondary">
              <Columns size={16} />
              Columns
            </button>
            <button className="btn btn-primary">
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Top Filters */}
      <div className="filters-row">
        <div className="search-filters">
         
          <div className="filter-group">
            <label>Ref No.</label>
            <input
              type="text"
              name="refNo"
              value={filters.refNo}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All</option>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Stage</label>
            <select name="propertyFor" value={filters.propertyFor} onChange={handleFilterChange}>
              <option value="">All</option>
              {propertyForOptions.map((propertyFor, index) => (
                <option key={index} value={propertyFor}>{propertyFor}</option>
              ))}
            </select>
          </div>
         
          <div className="filter-group">
            <label>Last Update</label>
            <input
              type="text"
              name="unitNo"
              value={filters.unitNo}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Enquiry Data</label>
            <input
              type="text"
              name="community"
              value={filters.community}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              {typeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Client Details</label>
            <input
              type="text"
              name="subcommunity"
              value={filters.sub_community}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Property Details</label>
            <input
              type="text"
              name="tower"
              value={filters.tower}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Community</label>
            <input
              type="text"
              name="tower"
              value={filters.tower}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Sub Community</label>
            <input
              type="text"
              name="tower"
              value={filters.tower}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Tower</label>
            <input
              type="text"
              name="tower"
              value={filters.tower}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Beds</label>
            <input
              type="text"
              name="beds"
              value={filters.beds}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="filter-group">
            <label>Source</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              {typeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Sub Source</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              {typeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Lead Agent</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              {typeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Assigned On</label>
            <input
              type="text"
              name="beds"
              value={filters.beds}
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
                <th>Ref.No</th>
                <th>Status</th>
                <th>Stage</th>
                <th>Last Update</th>
                <th>Enquiry Date</th>
                <th>Type</th>
                <th>Client Details</th>
                <th>Property Details</th>
                <th>Community</th>
                <th>Sub Community</th>
                <th>Tower</th>
                <th>Beds</th>
                <th>price</th>
                <th>Source</th>
                <th>Sub Source</th>
                <th>Lead Agent</th>
                <th>Assigned on</th>
                <th className="sticky-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing, index) => (
                <tr key={index}>
                  <td>{listing.status.name.split(' - ').pop()}</td>
                  <td>{listing.refno}</td>
                  <td>{listing.property_for}</td>
                  <td>{listing.prop_type.name}</td>
                  <td>{listing.unit_no}</td>
                  <td>{listing.community.name}</td>
                  <td>{listing.sub_community.name}</td>
                  <td>{listing.tower.name}</td>
                  <td>{listing.portals.map(portal => portal.name).join(', ')}</td>
                  <td>{listing.beds}</td>
                  <td>{listing.baths}</td>
                  <td>{`${listing.price} ${listing.currency}`}</td>
                  <td>{listing.bua}</td>
                  <td>{listing.rera_permit}</td>
                  <td> {listing.listing_agent.name.split(' ')[0]} {listing.listing_agent.name.split(' ')[1]?.charAt(0)}.</td>
                  <td>{listing.updated_at}</td>
                  <td>{listing.published_at}</td>
                  <td className="sticky-actions">
                    <div className="action-icons">
                      <button className="icon-btn">
                        <Edit size={16} />
                      </button>
                      <button className="icon-btn">
                        <Eye size={16} />
                      </button>
                      <button className="icon-btn">
                        <FileUp size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WallofFame;