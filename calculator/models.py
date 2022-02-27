from django.db import models


class ConstElement(models.Model):
    element_name = models.CharField(max_length=6)
    const_value = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ['-id']


class Chapter(models.Model):
    chapter_name = models.CharField(max_length=255)
    videos = models.ManyToManyField("VideoHelp", blank=True)
    conspects = models.ManyToManyField("Conspect", blank=True)


class VideoHelp(models.Model):
    video_name = models.CharField(max_length=255)
    video_url = models.URLField()


class Conspect(models.Model):
    name = models.CharField(max_length=255)
    text = models.TextField()
