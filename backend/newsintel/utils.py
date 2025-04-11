# utils.py
import requests
from bs4 import BeautifulSoup
from django.utils import timezone
from .serializers import ArticleSerializer
from .models import Article

def scrape_article(url):
    """
    Scrape an article from the given URL.
    - Makes an HTTP GET request to the URL.
    - Uses BeautifulSoup to parse the HTML.
    - Extracts the title and content based on provided selectors.
    Adjust the tag names and classes depending on the target website's structure.
    """
    response = requests.get(url)
    if response.status_code != 200:
        # If the response isn’t OK, return None.
        return None
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Example extraction: update these selectors to match the website you’re targeting.
    title_tag = soup.find('h1')
    content_tag = soup.find('div', class_='article-content')
    if title_tag and content_tag:
        title = title_tag.get_text(strip=True)
        content = content_tag.get_text(strip=True)
    else:
        return None

    # Return a dictionary of the scraped data.
    return {
        'title': title,
        'content': content,
        'url': url
    }

def clean_article_data(article):
    """
    Clean and format raw article data.
    You can add text cleaning steps here like removing unwanted characters,
    extra whitespace, or even stopword removal if necessary.
    
    This function prepares the data in a structure that matches your Article model.
    """
    cleaned_article = {
        'title': article.get('title'),
        # If your data from external sources comes with a nested structure for the source:
        'source': article.get('source', {}).get('name', 'Unknown'),
        'content': article.get('content'),
        # Placeholders for later NLP processing such as sentiment, summarization, and topics.
        'sentiment': None,
        'summary': None,
        'topics': [],
        'timestamp': timezone.now(),  # Record the current time as the article's ingestion time.
    }
    return cleaned_article

def save_articles(articles):
    """
    Save a list of articles to the database.
    - Cleans each article using clean_article_data.
    - Validates and saves each article using the ArticleSerializer.
    """
    for article in articles:
        cleaned_data = clean_article_data(article)
        serializer = ArticleSerializer(data=cleaned_data)
        if serializer.is_valid():
            serializer.save()
        else:
            # In a production environment, use proper logging rather than print.
            print("Error saving article:", serializer.errors)

def fetch_news():
    """
    Stub function to simulate fetching news articles from an external API like NewsAPI.
    Replace this with a call to the actual API and format its response as needed.
    """
    return [
        {
            'title': 'Example News Title',
            'content': 'This is example content fetched from a news API.',
            'source': {'name': 'Example Source'},
        },
        # Additional articles can be appended to this list.
    ]

def fetch_and_save_news():
    """
    Fetch articles using fetch_news() and save them to the database.
    This function ties together fetching external data and processing it.
    """
    articles = fetch_news()
    if articles:
        save_articles(articles)
    else:
        print("No articles found.")
