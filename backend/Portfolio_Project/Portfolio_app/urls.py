from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profile', views.ProfileViewSet, basename='profile')
router.register(r'skills', views.SkillViewSet, basename='skills')
router.register(r'projects', views.ProjectViewSet, basename='projects')
router.register(r'experience', views.ExperienceViewSet, basename='experience')
router.register(r'education', views.EducationViewSet, basename='education')
router.register(r'contact', views.ContactViewSet, basename='contact')

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('api/', include(router.urls)),
    path('health/', views.health_check, name='health-check'),
]

