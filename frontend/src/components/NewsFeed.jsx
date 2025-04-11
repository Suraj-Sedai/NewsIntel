"use client"

import NewsCard from "./NewsCard"
import "./NewsFeed.css"

const NewsFeed = ({ articles, loading, onArticleClick }) => {
  // If loading, show skeleton loader
  if (loading) {
    return (
      <div className="news-feed">
        <div className="news-feed-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="news-card-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-summary"></div>
                <div className="skeleton-meta">
                  <div className="skeleton-source"></div>
                  <div className="skeleton-timestamp"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // If no articles, show empty state
  if (!articles || articles.length === 0) {
    return (
      <div className="news-feed-empty">
        <div className="empty-icon">📰</div>
        <h3>No articles found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="news-feed">
      <div className="news-feed-grid">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} onClick={onArticleClick} />
        ))}
      </div>
    </div>
  )
}

export default NewsFeed
