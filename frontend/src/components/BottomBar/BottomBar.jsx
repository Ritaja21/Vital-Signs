import React from 'react';
import { Link } from 'react-router-dom';  // We'll use Link for navigation
import { FaHome, FaSearch, FaUser } from 'react-icons/fa';  // Import icons
import './BottomBar.css';  // We'll style the bar



const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <Link to='/dashboard' className="bottom-bar-icon">
        <FaHome size={24} />
        <span>Dashboard</span>
      </Link>
      <Link to="/search" className="bottom-bar-icon">
        <FaSearch size={24} />
        <span>Search</span>
      </Link>
      <Link to="/patient-history" className="bottom-bar-icon">
        <FaUser size={24} />
        <span>History</span>
      </Link>
    </div>
  );
};

export default BottomBar
