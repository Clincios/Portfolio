from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.db import connection
from django.db.utils import OperationalError, ProgrammingError
from .models import Profile, Skill, Project, Experience, Education, Contact
from .serializers import (
    ProfileSerializer, SkillSerializer, ProjectSerializer,
    ExperienceSerializer, EducationSerializer, ContactSerializer
)

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    pagination_class = None  # Disable pagination for profile
    
    def get_queryset(self):
        """Get queryset with error handling"""
        try:
            return Profile.objects.all()
        except (OperationalError, ProgrammingError) as e:
            # Database table doesn't exist - migrations not run
            return Profile.objects.none()
    
    def list(self, request, *args, **kwargs):
        """Handle database errors gracefully"""
        try:
            response = super().list(request, *args, **kwargs)
            return response
        except (OperationalError, ProgrammingError) as e:
            return Response({
                'error': 'Database error',
                'detail': 'Database tables may not exist. Please run migrations.',
                'message': str(e)
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            return Response({
                'error': 'Server error',
                'detail': 'Unable to fetch profile data',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    pagination_class = None  # Disable pagination for skills
    
    def get_queryset(self):
        try:
            return Skill.objects.all()
        except (OperationalError, ProgrammingError):
            return Skill.objects.none()
    
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except (OperationalError, ProgrammingError) as e:
            return Response({
                'error': 'Database error',
                'detail': 'Database tables may not exist. Please run migrations.',
                'message': str(e)
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            return Response({
                'error': 'Server error',
                'detail': 'Unable to fetch skills data',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = None  # Disable pagination for projects
    
    def get_queryset(self):
        try:
            return Project.objects.all()
        except (OperationalError, ProgrammingError):
            return Project.objects.none()
    
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except (OperationalError, ProgrammingError) as e:
            return Response({
                'error': 'Database error',
                'detail': 'Database tables may not exist. Please run migrations.',
                'message': str(e)
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            return Response({
                'error': 'Server error',
                'detail': 'Unable to fetch projects data',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    pagination_class = None  # Disable pagination for experience
    
    def get_queryset(self):
        try:
            return Experience.objects.all()
        except (OperationalError, ProgrammingError):
            return Experience.objects.none()
    
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except (OperationalError, ProgrammingError) as e:
            return Response({
                'error': 'Database error',
                'detail': 'Database tables may not exist. Please run migrations.',
                'message': str(e)
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            return Response({
                'error': 'Server error',
                'detail': 'Unable to fetch experience data',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    pagination_class = None  # Disable pagination for education
    
    def get_queryset(self):
        try:
            return Education.objects.all()
        except (OperationalError, ProgrammingError):
            return Education.objects.none()
    
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except (OperationalError, ProgrammingError) as e:
            return Response({
                'error': 'Database error',
                'detail': 'Database tables may not exist. Please run migrations.',
                'message': str(e)
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            return Response({
                'error': 'Server error',
                'detail': 'Unable to fetch education data',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    http_method_names = ['post']
    throttle_classes = [AnonRateThrottle]
    throttle_scope = 'contact'  # Uses the stricter 'contact' rate limit (5/hour)


@api_view(['GET'])
def api_root(request):
    """API root endpoint - provides links to all available endpoints"""
    return Response({
        'message': 'Portfolio API',
        'version': '1.0',
        'endpoints': {
            'profile': '/api/profile/',
            'skills': '/api/skills/',
            'projects': '/api/projects/',
            'experience': '/api/experience/',
            'education': '/api/education/',
            'contact': '/api/contact/',
            'admin': '/admin/',
        }
    })


@api_view(['GET'])
def health_check(request):
    """Health check endpoint for monitoring"""
    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return Response({
        'status': 'healthy',
        'database': db_status,
        'service': 'portfolio-backend'
    })
