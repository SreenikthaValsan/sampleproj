import React, { useState, useEffect } from 'react';
import { Download, Columns, Plus, Edit, Eye, FileUp } from 'lucide-react';


const ContactsOwners = () => {
  const [activeTab, setActiveTab] = useState('All Contacts');
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
        <h1>Contacts & Owners</h1>
        <div className="tabs-container">
          <div className="tabs">
            {['All Contacts', 'Buyers', 'Sellers', 'Tenants', 'Landlords', 'Owners'].map((tab) => (
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
            <label>Type</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All</option>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Contact</label>
            <input
              type="text"
              name="refNo"
              value={filters.refNo}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
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
          
          {/* <div className="filter-group">
            <label>Stage</label>
            <select name="propertyFor" value={filters.propertyFor} onChange={handleFilterChange}>
              <option value="">All</option>
              {propertyForOptions.map((propertyFor, index) => (
                <option key={index} value={propertyFor}>{propertyFor}</option>
              ))}
            </select>
          </div> */}
         
          {/* <div className="filter-group">
            <label>Last Update</label>
            <input
              type="text"
              name="unitNo"
              value={filters.unitNo}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> */}
          {/* <div className="filter-group">
            <label>Enquiry Data</label>
            <input
              type="text"
              name="community"
              value={filters.community}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> */}
          {/* <div className="filter-group">
            <label>Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              {typeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div> */}
          {/* <div className="filter-group">
            <label>Client Details</label>
            <input
              type="text"
              name="subcommunity"
              value={filters.sub_community}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> */}
          {/* <div className="filter-group">
            <label>Property Details</label>
            <input
              type="text"
              name="tower"
              value={filters.tower}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div> */}
          {/* <div className="filter-group">
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
          </div> */}
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
            <label>Created by</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              {typeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Updated by</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All</option>
              {typeOptions.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
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
                <th>Type</th>
                <th>Contact</th>
                <th>Ref.No.</th>
                <th>Source</th>
                <th>Sub Source</th>
                <th>Created by</th>
                <th>Updated by</th>
                <th className="sticky-actions">Actions</th>
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
                  {/* <td>{listing.property?.title || 'N/A'}</td>
                  <td>{listing.property?.community?.name || 'N/A'}</td>
                  <td>{listing.property?.sub_community?.name || 'N/A'}</td>
                  <td>{listing.property?.tower?.name || 'N/A'}</td>
                  <td>{listing.lead_details?.bedroom || 'N/A'}</td>
                  <td>{`${listing.property?.price || 'N/A'} ${listing.property?.currency || ''}`}</td>
                  <td>{listing.source?.name || 'N/A'}</td>
                  <td>{listing.sub_source?.name || 'N/A'}</td>
                  <td> {listing.lead_agent?.name.split(' ')[0]} {listing.lead_agent.name.split(' ')[1]?.charAt(0)}.</td>
                  <td>{listing.assigned_date || 'N/A'}</td> */}
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

export default ContactsOwners;