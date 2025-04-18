# project/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from newsintel.views import ArticleViewSet, UserPreferencesViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'preferences', UserPreferencesViewSet, basename='preferences')

urlpatterns = [
    path('admin/', admin.site.urls),
    # JWT token endpoints for login / refresh
    path('api/token/',   TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Browsable‐API login/logout (optional, for DRF UI)
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # Your main API
    path('api/', include(router.urls)),
]
