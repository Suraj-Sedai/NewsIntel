"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import TopicBar from "../components/TopicBar"
import NewsFeed from "../components/NewsFeed"
import "./Home.css"

// Mock data for articles
const mockArticles = [
  {
    id: 1,
    title: "New AI Breakthrough Could Revolutionize Healthcare",
    summary:
      "Researchers have developed a new AI model that can predict disease progression with 95% accuracy, potentially transforming early intervention strategies.",
    source: "Tech Daily",
    timestamp: "2023-04-10T14:30:00Z",
    sentiment: "positive",
    topic: "technology",
    image: "https://via.placeholder.com/600x400?text=AI+Healthcare",
  },
  {
    id: 2,
    title: "Global Markets React to New Economic Policies",
    summary:
      "Stock markets worldwide showed mixed reactions to the newly announced economic stimulus package, with tech stocks seeing significant gains.",
    source: "Financial Times",
    timestamp: "2023-04-10T09:15:00Z",
    sentiment: "neutral",
    topic: "business",
    image: "https://via.placeholder.com/600x400?text=Global+Markets",
  },
  {
    id: 3,
    title: "Climate Change Report Shows Alarming Trends",
    summary:
      "The latest environmental study indicates accelerating ice melt in polar regions, raising concerns about faster-than-expected sea level rise.",
    source: "Science Today",
    timestamp: "2023-04-09T18:45:00Z",
    sentiment: "negative",
    topic: "science",
    image: "https://via.placeholder.com/600x400?text=Climate+Change",
  },
  {
    id: 4,
    title: "New Streaming Service Gains 10 Million Subscribers",
    summary:
      "The recently launched entertainment platform has exceeded growth projections, challenging established players in the streaming market.",
    source: "Entertainment Weekly",
    timestamp: "2023-04-09T12:20:00Z",
    sentiment: "positive",
    topic: "entertainment",
    image: "https://via.placeholder.com/600x400?text=Streaming+Service",
  },
  {
    id: 5,
    title: "Major Sports League Announces New Season Schedule",
    summary:
      "The upcoming season will feature an expanded format with more teams and a revised playoff structure, generating excitement among fans.",
    source: "Sports Network",
    timestamp: "2023-04-08T16:10:00Z",
    sentiment: "positive",
    topic: "sports",
    image: "https://via.placeholder.com/600x400?text=Sports+League",
  },
  {
    id: 6,
    title: "Political Tensions Rise as Negotiations Stall",
    summary:
      "Talks between opposing parties have reached an impasse, raising concerns about potential impacts on upcoming legislative agenda items.",
    source: "World Politics",
    timestamp: "2023-04-08T10:45:00Z",
    sentiment: "negative",
    topic: "politics",
    image: "https://via.placeholder.com/600x400?text=Political+Tensions",
  },
]

const Home = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [activeTopic, setActiveTopic] = useState("all")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Simulate fetching articles
  useEffect(() => {
    // Simulate API call delay
    const fetchArticles = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setArticles(mockArticles)
      setFilteredArticles(mockArticles)
      setLoading(false)
    }

    fetchArticles()
  }, [])

  // Filter articles when topic or search query changes
  useEffect(() => {
    let result = [...articles]

    // Filter by topic
    if (activeTopic !== "all") {
      result = result.filter((article) => article.topic === activeTopic)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (article) => article.title.toLowerCase().includes(query) || article.summary.toLowerCase().includes(query),
      )
    }

    setFilteredArticles(result)
  }, [activeTopic, searchQuery, articles])

  // Handle topic selection
  const handleTopicSelect = (topic) => {
    setActiveTopic(topic)
  }

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <div className="home-page">
      <Navbar onSearch={handleSearch} />

      <main className="main-content">
        <div className="container">
          <h1 className="page-title">Today's Top Stories</h1>

          <TopicBar activeTopic={activeTopic} onSelectTopic={handleTopicSelect} />

          <NewsFeed articles={filteredArticles} loading={loading} />
        </div>
      </main>
    </div>
  )
}

export default Home
