from django.db import models

# Create your models here.
class  Article(models.Model):
    title = models.CharField(max_length=300)
    source = models.CharField(max_length=100)
    content = models.TextField()
    sentiment = models.CharField(max_length=20)
    summary = models.TextField()
    topics = models.TextField()
    timestamp = models.DateTimeField()

'''b. User Preferences Model
Associate user preferences with Django’s built-in User model. For example:

Preferred topics (Technology, Politics, Science, etc.).

History of interacted or read articles (possibly using a many-to-many field).'''

class UserPreferences(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    preferred_topics = models.TextField()
    read_articles = models.ManyToManyField(Article, blank=True)
    