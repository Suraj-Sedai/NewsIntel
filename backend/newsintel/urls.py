from django.urls import path
from .views import register, LoginView, preferences, personalized_news, newsapi_articles
from django.conf import settings
from django.conf.urls.static import static

# ...
app_name = 'news'

urlpatterns = [
    # path('', views.index, name='index'),
    # path('article/<int:article_id>/', views.detail, name='detail'),
    # path('search/', views.search, name='search'),
    path('api/newsapi-articles/', newsapi_articles, name='newsapi_articles'),
    path('auth/register/', register),
    path('auth/login/', LoginView.as_view(), name='token_obtain_pair'),
    path('auth/preferences/', preferences),
    path('api/my-news/', personalized_news),

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)