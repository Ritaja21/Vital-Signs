import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-container">
    <div className='navbar'>
      <div className="navbar-logo">
        <h1>Vital Signs</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
    </div>
  )
}

export default Navbar