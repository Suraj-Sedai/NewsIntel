from rest_framework import routers
from newsintel.views import ArticleViewSet
#import to include path
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'articles', ArticleViewSet)

urlpatterns = [
    # ... other url patterns
    path('api/', include(router.urls)),
]
