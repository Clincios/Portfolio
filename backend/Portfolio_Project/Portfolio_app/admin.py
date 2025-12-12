from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Count
from django.template.response import TemplateResponse
from django.urls import path
from .models import Profile, Skill, Project, Experience, Education, Contact


# Custom Admin Site Configuration
admin.site.site_header = "Portfolio CMS"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Dashboard"


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email_display', 'location', 'social_links']
    readonly_fields = ['profile_preview']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'title', 'profile_image', 'profile_preview'),
            'classes': ('wide',)
        }),
        ('🏠 Home Section', {
            'fields': ('bio',),
            'description': 'Short intro text displayed on the Home/Hero section'
        }),
        ('👤 About Me Section', {
            'fields': ('about',),
            'description': 'Detailed description displayed on the About Me section'
        }),
        ('Contact Details', {
            'fields': ('email', 'phone', 'location'),
        }),
        ('Social Links', {
            'fields': ('github', 'linkedin', 'twitter'),
            'classes': ('collapse',)
        }),
        ('Documents', {
            'fields': ('resume',),
            'classes': ('collapse',)
        }),
    )
    
    def email_display(self, obj):
        return format_html(
            '<a href="mailto:{}" style="color: #6366f1; font-weight: 500;">{}</a>',
            obj.email, obj.email
        )
    email_display.short_description = 'Email'
    
    def social_links(self, obj):
        links = []
        if obj.github:
            links.append(format_html('<a href="{}" target="_blank" style="margin-right: 10px;"><i class="fab fa-github"></i></a>', obj.github))
        if obj.linkedin:
            links.append(format_html('<a href="{}" target="_blank" style="margin-right: 10px;"><i class="fab fa-linkedin"></i></a>', obj.linkedin))
        if obj.twitter:
            links.append(format_html('<a href="{}" target="_blank"><i class="fab fa-twitter"></i></a>', obj.twitter))
        return format_html(''.join(links)) if links else '-'
    social_links.short_description = 'Social'
    
    def profile_preview(self, obj):
        if obj.profile_image:
            return format_html(
                '<img src="{}" style="max-width: 150px; border-radius: 50%; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"/>',
                obj.profile_image.url
            )
        return 'No image uploaded'
    profile_preview.short_description = 'Preview'


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category_badge', 'proficiency_bar', 'icon']
    list_filter = ['category']
    search_fields = ['name']
    list_per_page = 20
    ordering = ['category', '-proficiency']
    
    def category_badge(self, obj):
        colors = {
            'frontend': '#6366f1',
            'backend': '#10b981',
            'database': '#f59e0b',
            'tools': '#ec4899',
        }
        color = colors.get(obj.category, '#64748b')
        return format_html(
            '<span style="background: {}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 500;">{}</span>',
            color, obj.get_category_display()
        )
    category_badge.short_description = 'Category'
    category_badge.admin_order_field = 'category'
    
    def proficiency_bar(self, obj):
        color = '#10b981' if obj.proficiency >= 80 else '#f59e0b' if obj.proficiency >= 50 else '#ef4444'
        return format_html(
            '''<div style="width: 150px; background: #e2e8f0; border-radius: 10px; overflow: hidden;">
                <div style="width: {}%; background: {}; height: 8px;"></div>
            </div>
            <span style="font-size: 0.8rem; color: #64748b; margin-left: 8px;">{}%</span>''',
            obj.proficiency, color, obj.proficiency
        )
    proficiency_bar.short_description = 'Proficiency'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category_badge', 'featured', 'tech_stack', 'links', 'date', 'order']
    list_filter = ['featured', 'category', 'created_at']
    search_fields = ['title', 'description', 'technologies']
    list_editable = ['order', 'featured']
    list_per_page = 15
    date_hierarchy = 'created_at'
    actions = ['make_featured', 'remove_featured']
    
    fieldsets = (
        ('📝 Basic Information', {
            'fields': ('title', 'description', 'long_description', 'category', 'date', 'completed_at'),
            'classes': ('wide',)
        }),
        ('🖼️ Media & Links', {
            'fields': ('image', 'github_url', 'live_url', 'technologies'),
        }),
        ('🎬 Gallery', {
            'fields': ('media', 'images', 'videos'),
            'classes': ('collapse',),
            'description': 'Add images and videos for the project gallery. Use JSON format: ["url1", "url2"]'
        }),
        ('📖 Project Story', {
            'fields': ('challenges', 'solutions', 'learnings'),
            'classes': ('wide',),
            'description': 'Document the journey of this project. Use JSON format: ["item1", "item2"]'
        }),
        ('⚙️ Display Settings', {
            'fields': ('featured', 'order'),
        }),
    )
    
    def category_badge(self, obj):
        colors = {
            'full-stack development': '#6366f1',
            'data visualization': '#06b6d4',
            'saas application': '#8b5cf6',
            'frontend': '#10b981',
            'backend': '#f59e0b',
            'mobile': '#ec4899',
            'other': '#64748b',
        }
        color = colors.get(obj.category, '#64748b')
        display = obj.category.title() if obj.category else 'Other'
        return format_html(
            '<span style="background: {}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 500; white-space: nowrap;">{}</span>',
            color, display
        )
    category_badge.short_description = 'Category'
    category_badge.admin_order_field = 'category'
    
    def featured_badge(self, obj):
        if obj.featured:
            return format_html(
                '<span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem;">⭐ Featured</span>'
            )
        return format_html('<span style="color: #94a3b8;">—</span>')
    featured_badge.short_description = 'Featured'
    featured_badge.admin_order_field = 'featured'
    
    def tech_stack(self, obj):
        if obj.technologies:
            tags = obj.technologies[:3]  # Show first 3
            html = ' '.join([
                format_html(
                    '<span style="background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; margin-right: 4px;">{}</span>',
                    tech
                ) for tech in tags
            ])
            if len(obj.technologies) > 3:
                html += format_html('<span style="color: #94a3b8; font-size: 0.7rem;">+{} more</span>', len(obj.technologies) - 3)
            return format_html(html)
        return '-'
    tech_stack.short_description = 'Technologies'
    
    def links(self, obj):
        links = []
        if obj.live_url:
            links.append(format_html(
                '<a href="{}" target="_blank" style="color: #10b981; margin-right: 8px;" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>',
                obj.live_url
            ))
        if obj.github_url:
            links.append(format_html(
                '<a href="{}" target="_blank" style="color: #374151;" title="GitHub"><i class="fab fa-github"></i></a>',
                obj.github_url
            ))
        return format_html(''.join(links)) if links else '-'
    links.short_description = 'Links'
    
    @admin.action(description='⭐ Mark as Featured')
    def make_featured(self, request, queryset):
        updated = queryset.update(featured=True)
        self.message_user(request, f'{updated} project(s) marked as featured.')
    
    @admin.action(description='Remove from Featured')
    def remove_featured(self, request, queryset):
        updated = queryset.update(featured=False)
        self.message_user(request, f'{updated} project(s) removed from featured.')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['position', 'company', 'location', 'duration', 'current_badge']
    list_filter = ['current', 'start_date']
    search_fields = ['position', 'company', 'description']
    ordering = ['-start_date']
    list_per_page = 10
    
    fieldsets = (
        ('Position Details', {
            'fields': ('position', 'company', 'location'),
        }),
        ('Duration', {
            'fields': ('start_date', 'end_date', 'current'),
        }),
        ('Description', {
            'fields': ('description', 'responsibilities'),
            'classes': ('wide',),
        }),
    )
    
    def duration(self, obj):
        start = obj.start_date.strftime('%b %Y') if obj.start_date else '-'
        end = 'Present' if obj.current else (obj.end_date.strftime('%b %Y') if obj.end_date else '-')
        return format_html(
            '<span style="color: #64748b; font-size: 0.9rem;">{} — {}</span>',
            start, end
        )
    duration.short_description = 'Duration'
    
    def current_badge(self, obj):
        if obj.current:
            return format_html(
                '<span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 500;">● Current</span>'
            )
        return format_html('<span style="color: #94a3b8;">Completed</span>')
    current_badge.short_description = 'Status'
    current_badge.admin_order_field = 'current'


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'field_of_study', 'duration', 'gpa_display']
    list_filter = ['current', 'start_date']
    search_fields = ['degree', 'institution', 'field_of_study']
    ordering = ['-start_date']
    
    fieldsets = (
        ('Education Details', {
            'fields': ('degree', 'field_of_study', 'institution'),
        }),
        ('Duration', {
            'fields': ('start_date', 'end_date', 'current'),
        }),
        ('Additional Info', {
            'fields': ('description', 'gpa'),
            'classes': ('collapse',),
        }),
    )
    
    def duration(self, obj):
        start = obj.start_date.strftime('%Y') if obj.start_date else '-'
        end = 'Present' if obj.current else (obj.end_date.strftime('%Y') if obj.end_date else '-')
        return format_html(
            '<span style="color: #64748b;">{} — {}</span>',
            start, end
        )
    duration.short_description = 'Years'
    
    def gpa_display(self, obj):
        if obj.gpa:
            return format_html(
                '<span style="background: #dbeafe; color: #1e40af; padding: 4px 10px; border-radius: 6px; font-weight: 600;">{}</span>',
                obj.gpa
            )
        return '-'
    gpa_display.short_description = 'GPA'


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email_link', 'subject_preview', 'created_display', 'read_badge']
    list_filter = ['read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    list_per_page = 20
    actions = ['mark_as_read', 'mark_as_unread']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Sender Information', {
            'fields': ('name', 'email'),
        }),
        ('Message', {
            'fields': ('subject', 'message'),
            'classes': ('wide',),
        }),
        ('Status', {
            'fields': ('read', 'created_at'),
        }),
    )
    
    def email_link(self, obj):
        return format_html(
            '<a href="mailto:{}" style="color: #6366f1;">{}</a>',
            obj.email, obj.email
        )
    email_link.short_description = 'Email'
    
    def subject_preview(self, obj):
        truncated = obj.subject[:40] + '...' if len(obj.subject) > 40 else obj.subject
        return format_html(
            '<span title="{}">{}</span>',
            obj.subject, truncated
        )
    subject_preview.short_description = 'Subject'
    
    def created_display(self, obj):
        return format_html(
            '<span style="color: #64748b; font-size: 0.85rem;">{}</span>',
            obj.created_at.strftime('%b %d, %Y %H:%M')
        )
    created_display.short_description = 'Received'
    created_display.admin_order_field = 'created_at'
    
    def read_badge(self, obj):
        if obj.read:
            return format_html(
                '<span style="background: #f1f5f9; color: #64748b; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem;">Read</span>'
            )
        return format_html(
            '<span style="background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 500;">● New</span>'
        )
    read_badge.short_description = 'Status'
    read_badge.admin_order_field = 'read'
    
    @admin.action(description='✓ Mark as Read')
    def mark_as_read(self, request, queryset):
        updated = queryset.update(read=True)
        self.message_user(request, f'{updated} message(s) marked as read.')
    
    @admin.action(description='Mark as Unread')
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(read=False)
        self.message_user(request, f'{updated} message(s) marked as unread.')
    
    def has_add_permission(self, request):
        return False  # Contacts are only created via the frontend form
    
    def has_change_permission(self, request, obj=None):
        return True  # Allow changing read status
    
    def has_delete_permission(self, request, obj=None):
        return True  # Allow deleting messages
