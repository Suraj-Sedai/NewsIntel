#connect to the newsintel app
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from newsintel.views import ArticleViewSet
# Create a router and register our viewset with it.
router = routers.DefaultRouter()
router.register(r'articles', ArticleViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # ... other url patterns
]
