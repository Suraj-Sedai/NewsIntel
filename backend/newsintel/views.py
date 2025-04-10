'''Develop API Views
Decide whether to use function-based views or class-based views (or even ViewSets) with DRF. A common approach is to use ViewSets along with DRF’s routers for automatic URL routing.

For example, create an ArticleViewSet that handles listing, retrieving, and updating article objects.

Likewise, set up endpoints to update or retrieve user preferences.'''

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Article, UserPreferences
from .serializers import ArticleSerializer, UserPreferencesSerializer
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """
        Create a new article.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def update(self, request, *args, **kwargs):
        """
        Update an existing article.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def destroy(self, request, *args, **kwargs):
        """

        Delete an article.
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    def list(self, request, *args, **kwargs):
        """
        List all articles.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

