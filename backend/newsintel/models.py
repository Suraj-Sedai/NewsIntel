from django.db import models
from django.urls import reverse
from django.conf import settings


class Article(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    url = models.URLField()
    pub_date = models.DateTimeField()
    source = models.CharField(max_length=100)
    author = models.CharField(max_length=100) 
    image = models.ImageField(upload_to='news/')


class Preference(models.Model):
    user       = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    categories = models.JSONField(default=list)   # e.g. ["business","sports"]
