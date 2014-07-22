from __future__ import absolute_import, unicode_literals
from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class TimeStamped(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Todo(TimeStamped):
    title = models.CharField(max_length=120)
    description = models.TextField()
    active = models.BooleanField(default=True)
    user = models.ForeignKey('auth.User', related_name='todos')

    def __unicode__(self):
        return self.title


@receiver(post_save, sender=get_user_model())
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
