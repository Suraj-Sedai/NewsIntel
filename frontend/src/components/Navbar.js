import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      {/* logo.png lives in public/, so path is absolute */}
      <a href='/'><img src="/logo.png" alt="News Intel Logo" /></a>
    </div>
    <ul className="navbar-links">
      <li><a href="/">Home</a></li>
      <li><a href="/search">Search</a></li>
      <li><a href="/categories">Categories</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
);

export default Navbar;
