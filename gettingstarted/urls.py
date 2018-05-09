'''
    File name: urls.py
    Author: Biplov Dahal
    Date created: 05/08/2018
    Date last modified: 05/08/2018
    Python Version: 3
'''
from django.conf.urls import include, url
from django.urls import path

from django.contrib import admin

admin.autodiscover()

import hello.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', hello.views.placesAPI.as_view(), name='my_rest_view'),
    #url(r'^$', hello.views.index, name='index'),
    #url(r'^db', hello.views.db, name='db'),
    path('admin/', admin.site.urls),
]
