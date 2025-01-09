# app/urls.py
from django.contrib import admin
from django.urls import path
from . import views
from django.views.generic import RedirectView #For a generic homepage for now

urlpatterns = [
    # API endpoint for fetching monster data
    path('admin/', admin.site.urls),
    #path('api/get_monster_data/', views.get_monster_data, name='get_monster_data'),
    path('Monster/<str:pk>/', views.MonsterAPI.as_view(), name='monster-detail'),
    path('Monster/', views.MonsterAPI.as_view(), name='monster-api'),
    path('Monster/', views.MonsterAPI.as_view(), name='monster-list'),
]