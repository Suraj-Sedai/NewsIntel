"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import TopicBar from "../components/TopicBar"
import NewsFeed from "../components/NewsFeed"
import ArticleModal from "../components/ArticleModal"
import "./Home.css"

// Mock data for articles
const mockArticles = [
  {
    id: 1,
    title: "New AI Breakthrough Could Revolutionize Healthcare",
    summary:
      "Researchers have developed a new AI model that can predict disease progression with 95% accuracy, potentially transforming early intervention strategies.",
    content: `<p>In a groundbreaking development, researchers at the AI Health Institute have created an artificial intelligence system that can predict the progression of various diseases with unprecedented accuracy.</p>
      <p>The new model, named HealthPredict, uses a combination of machine learning algorithms and vast medical datasets to identify subtle patterns that human doctors might miss. In clinical trials, it achieved a remarkable 95% accuracy rate in predicting how diseases like diabetes, heart disease, and certain cancers would progress over time.</p>
      <p>"This is a game-changer for preventive medicine," said Dr. Sarah Chen, lead researcher on the project. "By accurately predicting disease trajectories, we can intervene earlier and potentially save countless lives."</p>
      <p>Healthcare providers are already expressing interest in implementing the technology. Several major hospitals have announced plans to begin testing HealthPredict in clinical settings by the end of the year.</p>
      <p>The implications for patient care are significant. Early intervention guided by AI predictions could reduce hospitalizations, lower treatment costs, and most importantly, improve patient outcomes across a wide range of conditions.</p>`,
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
    content: `<p>Financial markets around the world are showing varied responses to the economic stimulus package announced yesterday by the Federal Reserve.</p>
      <p>While technology stocks surged by an average of 3.2%, traditional banking and retail sectors experienced modest declines. Analysts attribute this divergence to the package's emphasis on digital infrastructure and innovation.</p>
      <p>"We're seeing a clear winner-takes-all reaction in the markets," explained Morgan Stanley analyst James Wilson. "Companies positioned to benefit from increased digital spending are being rewarded, while those tied to traditional consumer spending patterns are facing headwinds."</p>
      <p>Asian markets followed a similar pattern in early trading, with technology-focused indices in Japan and South Korea posting gains while broader market indicators remained flat or slightly negative.</p>
      <p>Economists are divided on the long-term implications of the stimulus. Some praise its targeted approach, while others express concern about potential inflationary pressures that could emerge in the coming quarters.</p>`,
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
    content: `<p>A comprehensive new climate report released today by the International Climate Research Coalition (ICRC) reveals that polar ice is melting at rates significantly faster than previous models predicted.</p>
      <p>According to the study, which compiled data from satellite imagery and on-site measurements, Arctic ice sheets have lost 13% more mass in the past five years than scientists had projected in their most pessimistic scenarios.</p>
      <p>"What we're seeing is deeply troubling," said Dr. Emma Frost, glaciologist and lead author of the report. "At current rates, we could see ice-free Arctic summers as early as 2035, not 2050 as previously estimated."</p>
      <p>The accelerated melting has profound implications for global sea levels. The report projects that coastal cities may need to prepare for sea level rises of up to 2 meters by 2100, rather than the 1-1.5 meters previously forecast.</p>
      <p>Environmental advocacy groups are calling for immediate policy responses, including more aggressive carbon emission reduction targets and increased funding for climate adaptation measures in vulnerable coastal regions.</p>`,
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
    content: `<p>StreamFlix, the streaming service launched just three months ago, announced today that it has already surpassed 10 million subscribers worldwide, far exceeding industry expectations.</p>
      <p>The platform, which specializes in original content and exclusive licensing deals with independent studios, has quickly established itself as a serious competitor to industry giants like Netflix and Disney+.</p>
      <p>"We identified a gap in the market for curated, high-quality content that isn't necessarily produced by the major studios," explained StreamFlix CEO Maria Rodriguez. "Our subscribers appreciate our focus on diverse storytelling and international productions."</p>
      <p>The company's stock price jumped 15% following the announcement, reflecting investor confidence in its growth strategy. Industry analysts note that StreamFlix has been particularly successful in attracting younger viewers, with approximately 70% of its subscriber base under the age of 35.</p>
      <p>The platform has already announced plans to expand its content library, with 50 new original series and 30 feature films scheduled for release in the coming year.</p>`,
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
    content: `<p>The National Basketball Association (NBA) revealed its plans for the upcoming 2023-2024 season today, introducing significant changes to both the regular season and playoff formats.</p>
      <p>The new schedule will include an expanded 84-game regular season, up from the traditional 82 games, and will welcome two new expansion teams based in Las Vegas and Seattle. This marks the first expansion of the league since 2004.</p>
      <p>"We're entering an exciting new era for basketball," said NBA Commissioner Adam Silver. "The addition of these two vibrant markets to our league reflects the growing global popularity of the sport and creates new opportunities for fans, players, and communities."</p>
      <p>Perhaps the most notable change is the introduction of a new playoff format that will include a mid-season tournament similar to cup competitions in European soccer. The tournament will take place in December, with the winner receiving an automatic playoff berth regardless of their regular season record.</p>
      <p>Fan reaction has been overwhelmingly positive, with ticket pre-sales for the expansion teams breaking all previous records for new franchises.</p>`,
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
    content: `<p>Bipartisan negotiations over the proposed infrastructure bill collapsed yesterday after three weeks of seemingly productive discussions, leaving the fate of the $1.2 trillion package in doubt.</p>
      <p>Representatives from both major parties blamed each other for the breakdown, with key sticking points reportedly including tax provisions, environmental regulations, and the overall size of the spending package.</p>
      <p>"We came to the table in good faith, but it became clear that our counterparts were not willing to compromise on essential elements," said Senator Robert Williams, the lead negotiator for the majority party.</p>
      <p>The opposition quickly countered this characterization. "The proposal put forward would have created unsustainable debt and failed to address the real infrastructure needs of everyday Americans," responded Minority Leader Jennifer Chen.</p>
      <p>The collapse of talks has significant implications for the administration's legislative agenda, potentially delaying action on other priorities including healthcare reform and climate initiatives. Political analysts suggest that the window for major legislative achievements may be narrowing as attention begins to shift toward the midterm elections.</p>`,
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
  const [selectedArticle, setSelectedArticle] = useState(null)

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

  // Handle article click
  const handleArticleClick = (article) => {
    setSelectedArticle(article)
  }

  // Close modal
  const handleCloseModal = () => {
    setSelectedArticle(null)
  }

  return (
    <div className="home-page">
      <Navbar onSearch={handleSearch} />

      <main className="main-content">
        <div className="container">
          <h1 className="page-title">Today's Top Stories</h1>

          <TopicBar activeTopic={activeTopic} onSelectTopic={handleTopicSelect} />

          <NewsFeed articles={filteredArticles} loading={loading} onArticleClick={handleArticleClick} />
        </div>
      </main>

      {/* Article Modal */}
      {selectedArticle && <ArticleModal article={selectedArticle} onClose={handleCloseModal} />}
    </div>
  )
}

export default Home
