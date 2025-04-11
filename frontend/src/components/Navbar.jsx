"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const location = useLocation()

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">NewsHub</span>
        </Link>

        {/* Search bar - only show on home page */}
        {location.pathname === "/" && (
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search articles..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
        )}

        {/* Navigation links */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/profile" className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}>
            Profile
          </Link>
          <Link to="/preferences" className={`nav-link ${location.pathname === "/preferences" ? "active" : ""}`}>
            Preferences
          </Link>
          <button className="nav-link logout-btn">Logout</button>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-button">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
