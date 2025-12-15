# Render Deployment Guide for Portfolio Backend

This guide will help you deploy your Django backend to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure all your changes are committed and pushed to your Git repository.

### 2. Create a PostgreSQL Database on Render

1. Go to your Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `portfolio-db` (or your preferred name)
   - **Database**: `portfolio`
   - **User**: `portfolio_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free (for testing) or Starter+ (for production)
4. Click "Create Database"
5. **Important**: Copy the "Internal Database URL" - you'll need this

### 3. Create a Web Service

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your repository
3. Configure the service:

   **Basic Settings:**
   - **Name**: `portfolio-backend`
   - **Region**: Same as your database
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```bash
     chmod +x build.sh && ./build.sh
     ```
   - **Start Command**:
     ```bash
     gunicorn Portfolio_Project.Portfolio_Project.wsgi:application --bind 0.0.0.0:$PORT
     ```

### 4. Configure Environment Variables

In your Web Service settings, go to "Environment" and add:

**Required Variables:**
```
SECRET_KEY=<generate-a-secure-key>
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com,yourdomain.com,www.yourdomain.com
DATABASE_URL=<internal-database-url-from-step-2>
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com,https://www.your-frontend-url.com
```

**Security Variables (for production):**
```
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
```

**To Generate SECRET_KEY:**
Run this locally:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 5. Link the Database

1. In your Web Service settings, go to "Connections"
2. Click "Link Database"
3. Select your PostgreSQL database created in Step 2
4. Render will automatically set the `DATABASE_URL` environment variable

### 6. Deploy

1. Click "Save Changes"
2. Render will automatically start building and deploying your application
3. Monitor the build logs for any errors
4. Once deployed, your API will be available at: `https://your-app-name.onrender.com`

## Post-Deployment Steps

### 1. Create a Superuser

1. Go to your Web Service in Render Dashboard
2. Click "Shell" tab
3. Run:
   ```bash
   cd Portfolio_Project
   python manage.py createsuperuser
   ```
4. Follow the prompts to create an admin user

### 2. Verify Deployment

- Visit: `https://your-app-name.onrender.com/admin/`
- Login with your superuser credentials
- Check API endpoints: `https://your-app-name.onrender.com/api/profile/`

### 3. Update Frontend Configuration

Update your frontend `.env` file:
```env
VITE_API_BASE_URL=https://your-app-name.onrender.com/api
VITE_BACKEND_URL=https://your-app-name.onrender.com
```

## Troubleshooting

### Build Fails

- Check build logs in Render dashboard
- Ensure all dependencies are in `requirements.txt`
- Verify Python version matches (3.12.0)

### Database Connection Errors

- Verify `DATABASE_URL` is set correctly
- Check database is linked to your web service
- Ensure database is running (not paused)

### Static Files Not Loading

- Verify `collectstatic` ran successfully in build logs
- Check WhiteNoise middleware is in `MIDDLEWARE`
- Ensure `STATIC_ROOT` is set correctly

### CORS Errors

- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check frontend is using the correct API URL
- Ensure CORS middleware is enabled

### 500 Internal Server Error

- Check application logs in Render dashboard
- Verify all environment variables are set
- Check `DEBUG=False` is set (don't enable DEBUG in production)

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | Generated key |
| `DEBUG` | Debug mode | `False` |
| `ALLOWED_HOSTS` | Allowed hostnames | `app.onrender.com,yourdomain.com` |
| `DATABASE_URL` | PostgreSQL connection | Auto-set by Render |
| `CORS_ALLOWED_ORIGINS` | Frontend URLs | `https://yourdomain.com` |
| `SECURE_SSL_REDIRECT` | Force HTTPS | `True` |
| `SESSION_COOKIE_SECURE` | Secure cookies | `True` |
| `CSRF_COOKIE_SECURE` | Secure CSRF cookies | `True` |

## Cost Considerations

- **Free Tier**: 
  - Web services spin down after 15 minutes of inactivity
  - PostgreSQL database pauses after 90 days of inactivity
  - Good for testing/development

- **Starter Plan ($7/month)**:
  - Always-on web service
  - Better for production

## Security Checklist

- [ ] `DEBUG=False` in production
- [ ] `SECRET_KEY` is unique and secure
- [ ] `ALLOWED_HOSTS` only includes your domains
- [ ] `CORS_ALLOWED_ORIGINS` only includes your frontend
- [ ] SSL/HTTPS security headers enabled
- [ ] Database credentials are secure (handled by Render)
- [ ] Admin panel is protected (requires authentication)

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Django Deployment: https://docs.djangoproject.com/en/stable/howto/deployment/

