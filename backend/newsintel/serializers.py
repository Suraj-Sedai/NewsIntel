from rest_framework import serializers
from .models import Article, Preference
from django.contrib.auth.models import User


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ('id','username','email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ('username','email','password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated):
        user = User.objects.create_user(**validated)
        Preference.objects.create(user=user)  
        return user

class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Preference
        fields = ('categories',)
