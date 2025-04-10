'''Serializers transform your model instances into JSON. In your app, create a file like serializers.py and define serializers for each model (e.g., ArticleSerializer, UserPreferenceSerializer). This is where you specify which fields to expose.'''

from rest_framework import serializers
from .models import Article, UserPreferences
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime
from django.core.exceptions import ValidationError

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'source', 'content', 'sentiment', 'summary', 'topics', 'timestamp']
        read_only_fields = ['id', 'timestamp']
        extra_kwargs = {
            'title': {'required': True},
            'source': {'required': True},
            'content': {'required': True},
            'sentiment': {'required': True},
            'summary': {'required': True},
            'topics': {'required': True},
        }
    def validate(self, data):
        """
        Validate the data before saving.
        """
        if not data.get('title'):
            raise ValidationError("Title is required.")
        if not data.get('source'):
            raise ValidationError("Source is required.")
        if not data.get('content'):
            raise ValidationError("Content is required.")
        if not data.get('sentiment'):
            raise ValidationError("Sentiment is required.")
        if not data.get('summary'):
            raise ValidationError("Summary is required.")
        if not data.get('topics'):
            raise ValidationError("Topics are required.")
        
        # Ensure timestamp is set to current time
        data['timestamp'] = timezone.now()
        
        return data
class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = ['user', 'preferred_topics', 'read_articles']
        read_only_fields = ['user']
        extra_kwargs = {
            'preferred_topics': {'required': True},
            'read_articles': {'required': False},
        }
    
    def validate(self, data):
        """
        Validate the data before saving.
        """
        if not data.get('preferred_topics'):
            raise ValidationError("Preferred topics are required.")
        
        return data