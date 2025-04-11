"use client"

import { useEffect } from "react"
import "./ArticleModal.css"

const ArticleModal = ({ article, onClose }) => {
  const { title, summary, content, source, timestamp, sentiment, image } = article

  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  // Determine sentiment class and icon
  const getSentimentInfo = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return {
          className: "sentiment-positive",
          icon: "😊",
          label: "Positive",
        }
      case "negative":
        return {
          className: "sentiment-negative",
          icon: "😔",
          label: "Negative",
        }
      default:
        return {
          className: "sentiment-neutral",
          icon: "😐",
          label: "Neutral",
        }
    }
  }

  const sentimentInfo = getSentimentInfo(sentiment)

  // Handle click on the backdrop to close the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="article-modal-backdrop" onClick={handleBackdropClick}>
      <div className="article-modal">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>

        <div className="article-modal-image">
          <img src={image || "https://via.placeholder.com/800x400"} alt={title} />
          <div className={`modal-sentiment-badge ${sentimentInfo.className}`}>
            <span className="sentiment-icon">{sentimentInfo.icon}</span>
            <span className="sentiment-label">{sentimentInfo.label}</span>
          </div>
        </div>

        <div className="article-modal-content">
          <div className="article-modal-header">
            <h2 className="article-modal-title">{title}</h2>
            <div className="article-modal-meta">
              <span className="article-modal-source">{source}</span>
              <span className="article-modal-timestamp">{formatDate(timestamp)}</span>
            </div>
          </div>

          {/* Summary Section */}
          <div className="article-summary-section">
            <h3 className="summary-title">Summary</h3>
            <p className="summary-content">{summary}</p>
          </div>

          {/* Full Article Content */}
          <div className="article-full-content">
            <h3 className="content-title">Full Article</h3>
            <div className="content-body">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <p>
                  {summary} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                  tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget
                  ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleModal
