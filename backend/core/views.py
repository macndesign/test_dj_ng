from __future__ import unicode_literals, absolute_import
from django.contrib.auth.models import User
from .serializers import TodoSerializer, UserSerializer
from .models import Todo
from .permissions import IsOwnerOrReadOnly
from rest_framework import viewsets, permissions


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

    def pre_save(self, obj):
        obj.user = self.request.user


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
