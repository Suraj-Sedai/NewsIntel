from django.conf import settings
from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField  # PG-specific

class Topic(models.Model):
    """If you’d rather have a full lookup table for topics."""
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Article(models.Model):
    title         = models.CharField(max_length=300)
    source        = models.CharField(max_length=100, db_index=True)
    description   = models.TextField(blank=True)
    content       = models.TextField(blank=True)
    url           = models.URLField(unique=True)
    published_at  = models.DateTimeField(db_index=True)  # when the article was actually published
    fetched_at    = models.DateTimeField(auto_now_add=True)  # when you ingested it
    sentiment     = models.FloatField(null=True, blank=True)     # optional
    summary       = models.TextField(null=True, blank=True)      # optional
    # Choice A: PG ArrayField
    topics        = ArrayField(
                       models.CharField(max_length=50),
                       default=list,
                       blank=True,
                   )
    # Choice B: normalized via Topic model
    # topics       = models.ManyToManyField(Topic, blank=True)
    fetched_at = models.DateTimeField(
            auto_now_add=True,
            null=True,               # ← existing rows become NULL
            blank=True,
        )
    class Meta:
        ordering = ['-published_at']
        indexes = [
            models.Index(fields=['-published_at', 'source']),
        ]

    def __str__(self):
        return f"{self.title} ({self.source})"


class UserPreferences(models.Model):
    user             = models.OneToOneField(
                           settings.AUTH_USER_MODEL,
                           on_delete=models.CASCADE,
                       )
    # Again, either PG Array or normalized M2M:
    preferred_topics = ArrayField(
                           models.CharField(max_length=50),
                           default=list,
                           blank=True,
                       )
    # preferred_topics = models.ManyToManyField(Topic, blank=True)

    read_articles    = models.ManyToManyField(Article, blank=True)
    updated_at       = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Prefs for {self.user.username}"
