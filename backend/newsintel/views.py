from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.permissions import IsAuthenticated

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ['source', 'topics']
    search_fields    = ['title', 'description', 'content']
    ordering_fields  = ['published_at']
    ordering         = ['-published_at']


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import UserPreferences
from .serializers import UserPreferencesSerializer

class UserPreferencesViewSet(viewsets.ModelViewSet):
    queryset = UserPreferences.objects.all()
    serializer_class = UserPreferencesSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # ensure each user only touches their own prefs
        return UserPreferences.objects.get_or_create(user=self.request.user)[0]
