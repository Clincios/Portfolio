from rest_framework import serializers
from .models import Profile, Skill, Project, Experience, Education, Contact

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    # Field-level validation with length constraints
    name = serializers.CharField(
        max_length=200,
        min_length=2,
        help_text="Name must be between 2 and 200 characters"
    )
    email = serializers.EmailField(
        help_text="Valid email address required"
    )
    subject = serializers.CharField(
        max_length=200,
        min_length=5,
        help_text="Subject must be between 5 and 200 characters"
    )
    message = serializers.CharField(
        max_length=5000,
        min_length=10,
        help_text="Message must be between 10 and 5000 characters"
    )
    
    class Meta:
        model = Contact
        fields = '__all__'
        read_only_fields = ['created_at', 'read']
    
    def validate_name(self, value):
        """Additional validation for name field"""
        # Remove leading/trailing whitespace
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Name cannot be empty.")
        # Check for suspicious patterns (basic XSS prevention)
        if '<script' in value.lower() or 'javascript:' in value.lower():
            raise serializers.ValidationError("Invalid characters in name.")
        return value
    
    def validate_message(self, value):
        """Additional validation for message field"""
        # Remove leading/trailing whitespace
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Message cannot be empty.")
        # Basic XSS prevention
        dangerous_patterns = ['<script', 'javascript:', 'onerror=', 'onload=']
        for pattern in dangerous_patterns:
            if pattern in value.lower():
                raise serializers.ValidationError("Message contains potentially unsafe content.")
        return value

