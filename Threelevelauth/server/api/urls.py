from django.urls import path
from . import views

urlpatterns=[
    path('',views.GetEndPoints),
    path('api/register',views.register),
    path('api/login',views.login)
]