from django import template
from ..models import Project, Contact, Skill, Experience

register = template.Library()

@register.simple_tag
def get_project_count():
    return Project.objects.count()

@register.simple_tag
def get_contact_count():
    return Contact.objects.count()

@register.simple_tag
def get_skill_count():
    return Skill.objects.count()

@register.simple_tag
def get_experience_count():
    return Experience.objects.count()

@register.simple_tag
def get_unread_count():
    return Contact.objects.filter(read=False).count()

