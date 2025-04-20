import { fetchArticles } from '../services/newsService';
import './NewsList.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function NewsList() {
  const { token } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles(token).then(setArticles);
  }, [token]);

  return (
    <div className='top'>
      <h1 className="page-header">Top Headlines</h1>
      <div className="news-container">
        {articles.map((article, index) => (
          <div className="news-card" key={index}>
            <img   src={article.urlToImage || 'https://st3.depositphotos.com/11245678/36021/i/450/depositphotos_360215620-stock-photo-breaking-news-rendering-virtual-set.jpg'}alt="news" />

            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p className="published-date">{new Date(article.publishedAt).toLocaleString()}</p>
            <a className="read-more-btn" href={article.url} target="_blank" rel="noopener noreferrer">
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

