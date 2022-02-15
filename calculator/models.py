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
    name = models.CharField(max_length=255)


class VideoHelp(models.Model):
    name = models.CharField(max_length=255)
    chapters = models.ManyToManyField("Chapter")
    url = models.URLField()
