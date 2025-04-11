import "./NewsCard.css"

const NewsCard = ({ article }) => {
  const { title, summary, source, timestamp, sentiment, image } = article

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
    <div className="news-card">
      {/* Article image */}
      <div className="news-card-image">
        <img src={image || "https://via.placeholder.com/300x200"} alt={title} />
        <div className={`sentiment-badge ${sentimentInfo.className}`}>
          <span className="sentiment-icon">{sentimentInfo.icon}</span>
          <span className="sentiment-label">{sentimentInfo.label}</span>
        </div>
      </div>

      {/* Article content */}
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-summary">{summary}</p>

        {/* Article metadata */}
        <div className="news-card-meta">
          <div className="news-card-source">{source}</div>
          <div className="news-card-timestamp">{formatDate(timestamp)}</div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
