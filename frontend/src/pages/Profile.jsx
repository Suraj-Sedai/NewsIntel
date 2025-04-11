import Navbar from "../components/Navbar"
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import "./Profile.css"

const Profile = () => {
  // Mock data for reading history
  const readingHistory = [
    {
      id: 1,
      title: "The Future of Renewable Energy",
      timestamp: "2023-04-10T15:30:00Z",
      topic: "science",
    },
    {
      id: 2,
      title: "New Smartphone Features Unveiled",
      timestamp: "2023-04-09T12:45:00Z",
      topic: "technology",
    },
    {
      id: 3,
      title: "Global Economic Outlook for 2023",
      timestamp: "2023-04-08T09:20:00Z",
      topic: "business",
    },
    {
      id: 4,
      title: "Major Sports Tournament Results",
      timestamp: "2023-04-07T18:15:00Z",
      topic: "sports",
    },
    {
      id: 5,
      title: "New Entertainment Streaming Options",
      timestamp: "2023-04-06T14:10:00Z",
      topic: "entertainment",
    },
  ]

  // Mock data for topic distribution
  const topicData = [
    { name: "Technology", value: 35, color: "#3b82f6" },
    { name: "Science", value: 25, color: "#10b981" },
    { name: "Business", value: 15, color: "#6366f1" },
    { name: "Sports", value: 15, color: "#f59e0b" },
    { name: "Entertainment", value: 10, color: "#8b5cf6" },
  ]

  // Mock data for reading time
  const readingTimeData = [
    { day: "Mon", minutes: 45 },
    { day: "Tue", minutes: 30 },
    { day: "Wed", minutes: 60 },
    { day: "Thu", minutes: 25 },
    { day: "Fri", minutes: 50 },
    { day: "Sat", minutes: 75 },
    { day: "Sun", minutes: 65 },
  ]

  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="profile-page">
      <Navbar />

      <main className="main-content">
        <div className="container">
          <div className="profile-header">
            <div className="profile-info">
              <div className="profile-avatar">
                <img src="https://via.placeholder.com/100" alt="User Avatar" />
              </div>
              <div>
                <h1 className="profile-name">John Doe</h1>
                <p className="profile-email">john.doe@example.com</p>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stats-card">
              <h3>Reading Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">42</span>
                  <span className="stat-label">Articles Read</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">5.2</span>
                  <span className="stat-label">Hours This Week</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Saved Articles</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-content">
            {/* Charts section */}
            <div className="charts-section">
              <h2 className="section-title">Your Reading Insights</h2>

              <div className="charts-grid">
                {/* Topic distribution chart */}
                <div className="chart-card">
                  <h3>Topic Distribution</h3>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={topicData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {topicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Reading time chart */}
                <div className="chart-card">
                  <h3>Reading Time (Last 7 Days)</h3>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={readingTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Bar dataKey="minutes" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading history section */}
            <div className="history-section">
              <h2 className="section-title">Recent Reading History</h2>

              <div className="history-list">
                {readingHistory.map((item) => (
                  <div key={item.id} className="history-item">
                    <div className="history-content">
                      <h4 className="history-title">{item.title}</h4>
                      <div className="history-meta">
                        <span className="history-topic">{item.topic}</span>
                        <span className="history-time">{formatDate(item.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
