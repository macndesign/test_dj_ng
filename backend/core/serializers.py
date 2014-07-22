from __future__ import unicode_literals, absolute_import
from django.contrib.auth.models import User
from core.models import Todo
from rest_framework import serializers


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.Field(source='user.username')

    class Meta:
        model = Todo
        fields = ('url', 'title', 'description', 'active', 'user', 'created', 'updated')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    todos = serializers.HyperlinkedRelatedField(many=True, view_name='todo-detail')

    class Meta:
        model = User
        fields = ('id', 'username', 'todos')
