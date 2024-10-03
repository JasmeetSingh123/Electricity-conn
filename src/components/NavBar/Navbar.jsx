import React from 'react'
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = ({name}) => {
  return (
    <div>
      <nav className="navbar">
      <div className="navbar-logo">
        <h2>{name}</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-user">Add User</Link></li>
        <li><Link to="/chart">Charts</Link></li>
      </ul>
      
    </nav>
    </div>
  )
}

export default Navbar
