from django.conf import settings
from rest_framework import serializers
from .models import Article, UserPreferences, Topic

class ArticleSerializer(serializers.ModelSerializer):
    # If you normalized topics with a Topic model:
    # topics = serializers.SlugRelatedField(
    #     many=True,
    #     queryset=Topic.objects.all(),
    #     slug_field='name',
    # )

    # If you used ArrayField for topics:
    topics = serializers.ListField(
        child=serializers.CharField(max_length=50),
        allow_empty=True
    )

    class Meta:
        model = Article
        fields = [
            'id', 'title', 'source',
            'description', 'content',
            'url', 'published_at', 'fetched_at',
            'sentiment', 'summary', 'topics'
        ]
        read_only_fields = ['id', 'fetched_at']
        extra_kwargs = {
            'description': {'required': False, 'allow_blank': True},
            'content':     {'required': False, 'allow_blank': True},
            'sentiment':   {'required': False},
            'summary':     {'required': False},
        }

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title may not be blank.")
        return value

    def validate_source(self, value):
        if not value.strip():
            raise serializers.ValidationError("Source may not be blank.")
        return value

    def validate_published_at(self, value):
        if value > serializers.DateTimeField().to_representation(serializers.datetime.datetime.now()):
            raise serializers.ValidationError("Published date cannot be in the future.")
        return value

    def create(self, validated_data):
        # fetched_at is auto_now_add; published_at must be present
        return super().create(validated_data)


class UserPreferencesSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    preferred_topics = serializers.ListField(
        child=serializers.CharField(max_length=50),
        allow_empty=True
    )
    read_articles = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Article.objects.all(),
        required=False
    )

    class Meta:
        model = UserPreferences
        fields = ['user', 'preferred_topics', 'read_articles']
        read_only_fields = ['user']

    def validate_preferred_topics(self, value):
        if any(not topic.strip() for topic in value):
            raise serializers.ValidationError("Topic names cannot be blank.")
        return value

    def update(self, instance, validated_data):
        # Ensure you clear or merge topics and read_articles as you prefer
        topics = validated_data.pop('preferred_topics', None)
        if topics is not None:
            instance.preferred_topics = topics

        articles = validated_data.pop('read_articles', None)
        if articles is not None:
            instance.read_articles.set(articles)

        return super().update(instance, validated_data)
