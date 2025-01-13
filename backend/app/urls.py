# app/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from .views import MonsterViewSet
from django.views.generic import RedirectView #For a generic homepage for now
from django.conf import settings
from django.conf.urls.static import static

'''urlpatterns = [
    # API endpoint for fetching monster data
    path('admin/', admin.site.urls),
    #path('api/get_monster_data/', views.get_monster_data, name='get_monster_data'),
    path('Monster/<str:pk>/', views.MonsterAPI.as_view(), name='monster-detail'),
    path('Monster/', views.MonsterAPI.as_view(), name='monster-api'),
    path('Monster/', views.MonsterAPI.as_view(), name='monster-list'),
]'''
router = DefaultRouter()
router.register(r'Monster', MonsterViewSet, basename='monster')

urlpatterns = [
    path('', include(router.urls)),  # Automatically generates all routes for CRUD operations
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)