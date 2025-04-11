"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import "./Preferences.css"

const Preferences = () => {
  // State for user preferences
  const [preferences, setPreferences] = useState({
    topics: {
      technology: true,
      politics: false,
      science: true,
      entertainment: true,
      sports: false,
      business: true,
      health: false,
      education: false,
    },
    notifications: {
      breaking: true,
      daily: true,
      weekly: false,
    },
    display: {
      darkMode: false,
      fontSize: "medium",
      layout: "grid",
    },
  })

  // Handle topic toggle
  const handleTopicToggle = (topic) => {
    setPreferences((prev) => ({
      ...prev,
      topics: {
        ...prev.topics,
        [topic]: !prev.topics[topic],
      },
    }))
  }

  // Handle notification toggle
  const handleNotificationToggle = (type) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }))
  }

  // Handle display option change
  const handleDisplayChange = (option, value) => {
    setPreferences((prev) => ({
      ...prev,
      display: {
        ...prev.display,
        [option]: value,
      },
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save to backend/localStorage
    alert("Preferences saved successfully!")
  }

  return (
    <div className="preferences-page">
      <Navbar />

      <main className="main-content">
        <div className="container">
          <h1 className="page-title">Preferences</h1>

          <form className="preferences-form" onSubmit={handleSubmit}>
            {/* Topics Section */}
            <section className="preferences-section">
              <h2 className="section-title">Topics</h2>
              <p className="section-description">Select topics you're interested in</p>

              <div className="topics-grid">
                {Object.entries(preferences.topics).map(([topic, isSelected]) => (
                  <div
                    key={topic}
                    className={`topic-item ${isSelected ? "selected" : ""}`}
                    onClick={() => handleTopicToggle(topic)}
                  >
                    <div className="topic-checkbox">
                      <input
                        type="checkbox"
                        id={`topic-${topic}`}
                        checked={isSelected}
                        onChange={() => {}} // Handled by onClick on parent div
                      />
                      <span className="checkmark"></span>
                    </div>
                    <label htmlFor={`topic-${topic}`}>{topic.charAt(0).toUpperCase() + topic.slice(1)}</label>
                  </div>
                ))}
              </div>
            </section>

            {/* Notifications Section */}
            <section className="preferences-section">
              <h2 className="section-title">Notifications</h2>
              <p className="section-description">Manage your notification preferences</p>

              <div className="notification-options">
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Breaking News</h3>
                    <p>Get notified about important breaking news</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.breaking}
                      onChange={() => handleNotificationToggle("breaking")}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Daily Digest</h3>
                    <p>Receive a summary of top stories each day</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.daily}
                      onChange={() => handleNotificationToggle("daily")}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Weekly Recap</h3>
                    <p>Get a weekly summary of the most important stories</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.weekly}
                      onChange={() => handleNotificationToggle("weekly")}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </section>

            {/* Display Settings Section */}
            <section className="preferences-section">
              <h2 className="section-title">Display Settings</h2>
              <p className="section-description">Customize how content appears</p>

              <div className="display-options">
                <div className="display-item">
                  <h3>Dark Mode</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.display.darkMode}
                      onChange={() => handleDisplayChange("darkMode", !preferences.display.darkMode)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="display-item">
                  <h3>Font Size</h3>
                  <div className="radio-group">
                    <label className={preferences.display.fontSize === "small" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="fontSize"
                        value="small"
                        checked={preferences.display.fontSize === "small"}
                        onChange={() => handleDisplayChange("fontSize", "small")}
                      />
                      Small
                    </label>
                    <label className={preferences.display.fontSize === "medium" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="fontSize"
                        value="medium"
                        checked={preferences.display.fontSize === "medium"}
                        onChange={() => handleDisplayChange("fontSize", "medium")}
                      />
                      Medium
                    </label>
                    <label className={preferences.display.fontSize === "large" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="fontSize"
                        value="large"
                        checked={preferences.display.fontSize === "large"}
                        onChange={() => handleDisplayChange("fontSize", "large")}
                      />
                      Large
                    </label>
                  </div>
                </div>

                <div className="display-item">
                  <h3>Layout</h3>
                  <div className="radio-group">
                    <label className={preferences.display.layout === "grid" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="layout"
                        value="grid"
                        checked={preferences.display.layout === "grid"}
                        onChange={() => handleDisplayChange("layout", "grid")}
                      />
                      Grid
                    </label>
                    <label className={preferences.display.layout === "list" ? "selected" : ""}>
                      <input
                        type="radio"
                        name="layout"
                        value="list"
                        checked={preferences.display.layout === "list"}
                        onChange={() => handleDisplayChange("layout", "list")}
                      />
                      List
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Save Preferences
              </button>
              <button type="button" className="btn-secondary">
                Reset to Default
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Preferences
