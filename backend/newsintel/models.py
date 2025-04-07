from django.db import models

# Create your models here.
class  Article(models.Model):
    title = models.CharField(max_length=300)
    source = models.CharField(max_length=100)
    content = models.TextField()
    sentiment = models.CharField(max_length=20)
    summary = models.TextField()
    topics = models.TextField()
    published_at = models.DateTimeField()