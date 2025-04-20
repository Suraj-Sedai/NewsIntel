from django.shortcuts import render
from .models import Article
import requests
from django.urls import reverse

# def index(request):
#     api_key = '15866422dea04a8b85fc0ae163cdca13'
#     url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={api_key}'
#     response = requests.get(url)
#     data = response.json()
#     latest_articles = data['articles']
#     context = {'latest_articles': latest_articles}
#     return render(request, 'news/index.html', context)

# def detail(request, article_id):
#     api_key = '15866422dea04a8b85fc0ae163cdca13'
#     url = f'https://newsapi.org/v2/everything?q={article_id}&apiKey={api_key}'
#     response = requests.get(url)
#     data = response.json()
#     articles = data['articles']
#     if len(articles) > 0:
#         article = articles[0]
#     else:
#         article = None
#     context = {
#         'article': article,
#     }
#     return render(request, 'news/details.html', context)
# def search(request):
#     query = request.GET.get('q')
#     if query:
#         articles = Article.objects.filter(author__contains=query)
#         context = {'articles': articles}
#         return render(request, 'news/search.html', context)
#     else:
#         error_message = "Please enter a valid search term."
#         context = {'error_message': error_message}
#         return render(request, 'news/search.html', context)

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Preference
from .serializers import (
    RegisterSerializer, UserSerializer,
    PreferenceSerializer
)

@api_view(['GET'])
def newsapi_articles(request):
    api_key = '15866422dea04a8b85fc0ae163cdca13'
    url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={api_key}'
    response = requests.get(url)
    data = response.json()
    latest_articles = data.get('articles', [])
    
    # Optional: reduce fields sent to frontend
    trimmed_articles = [
        {
            'title': a['title'],
            'description': a['description'],
            'url': a['url'],
            'urlToImage': a['urlToImage'],
            'publishedAt': a['publishedAt'],
        } for a in latest_articles
    ]
    
    return Response(trimmed_articles)

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response(UserSerializer(user).data, status=201)

class LoginView(TokenObtainPairView):
    # returns { access: "...jwt...", refresh: "..." }
    pass

@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def preferences(request):
    pref = Preference.objects.get(user=request.user)
    if request.method == 'GET':
        return Response(PreferenceSerializer(pref).data)
    else:  # PUT to update
        serializer = PreferenceSerializer(pref, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def personalized_news(request):
    # pull categories
    cats = Preference.objects.get(user=request.user).categories
    # here use NewsAPI or your existing logic, but pass categories
    # for simplicity, fetch top-headlines for each category
    all_articles = []
    for cat in cats:
        # call NewsAPI with &category=cat ...
        # extend all_articles
        pass
    return Response(all_articles)
