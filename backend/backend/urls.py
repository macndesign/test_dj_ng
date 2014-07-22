from __future__ import unicode_literals, absolute_import
from django.conf.urls import patterns, include, url

from django.contrib import admin
from rest_framework.routers import DefaultRouter
from core import views

admin.autodiscover()

# Created a router and register our viewsets with it
router = DefaultRouter()
router.register(r'todos', views.TodoViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('',
    url(r'^api/', include(router.urls)),

    # To basic auth

    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),

    # To retrieve auth token:
    # >>> import requests, json
    # >>> api_url = 'http://127.0.0.1:8000/api-token-auth/'
    # >>> header = {'content-type': 'application/json'}
    # >>> login = {'username': 'mario', 'password': 's3cr3t3'}
    # >>> api_auth = requests.post(api_url, data=json.dumps(login), headers=header)
    # >>> api_auth.json()['token']
    # u'8e1b3a36263ff74e0522f1551c9ba103a9a1bd26'

    # Using the token to make some actions
    # header = {'Authorization': 'Token 8e1b3a36263ff74e0522f1551c9ba103a9a1bd26', 'content-type': 'application/json'}
    # >>> post = requests.post('http://127.0.0.1:8000/api/todos/', data=json.dumps(payload), headers=header)
    # >>> post.reason
    # 'CREATED'
    # >>> put = requests.put('http://127.0.0.1:8000/api/todos/4/', data=json.dumps(payload), headers=header)
    # >>> payload = {'active': True}
    # >>> patch = requests.pacth('http://127.0.0.1:8000/api/todos/4/', data=json.dumps(payload), headers=header)
    # >>> delete = requests.delete('http://127.0.0.1:8000/api/todos/2/', headers=header)
    # >>> delete.reason
    # 'NO CONTENT'

    url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token'),
)
