from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, UserPreferencesViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'preferences', UserPreferencesViewSet, basename='preferences')

urlpatterns = [
    path('api/', include(router.urls)),
]
