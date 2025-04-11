"use client"

import { useRef } from "react"
import "./TopicBar.css"

const TopicBar = ({ topics, activeTopic, onSelectTopic }) => {
  const scrollRef = useRef(null)

  // Topics with predefined colors
  const topicsWithColors = [
    { id: "technology", name: "Technology", color: "#3b82f6" },
    { id: "politics", name: "Politics", color: "#ef4444" },
    { id: "science", name: "Science", color: "#10b981" },
    { id: "entertainment", name: "Entertainment", color: "#8b5cf6" },
    { id: "sports", name: "Sports", color: "#f59e0b" },
    { id: "business", name: "Business", color: "#6366f1" },
    { id: "health", name: "Health", color: "#ec4899" },
    { id: "education", name: "Education", color: "#14b8a6" },
  ]

  // Scroll left/right handlers
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div className="topic-bar-container">
      {/* Left scroll button */}
      <button className="scroll-button left" onClick={scrollLeft}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>

      {/* Scrollable topic buttons */}
      <div className="topic-bar" ref={scrollRef}>
        <button
          className={`topic-button ${activeTopic === "all" ? "active" : ""}`}
          onClick={() => onSelectTopic("all")}
        >
          All Topics
        </button>

        {topicsWithColors.map((topic) => (
          <button
            key={topic.id}
            className={`topic-button ${activeTopic === topic.id ? "active" : ""}`}
            onClick={() => onSelectTopic(topic.id)}
            style={{
              "--topic-color": topic.color,
              backgroundColor: activeTopic === topic.id ? topic.color : "transparent",
              color: activeTopic === topic.id ? "white" : "inherit",
              borderColor: topic.color,
            }}
          >
            {topic.name}
          </button>
        ))}
      </div>

      {/* Right scroll button */}
      <button className="scroll-button right" onClick={scrollRight}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  )
}

export default TopicBar
