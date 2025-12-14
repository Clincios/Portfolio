# Quick Start: Deploy to Render

## 🚀 Quick Deployment Steps

### 1. Create PostgreSQL Database
- Render Dashboard → New + → PostgreSQL
- Name: `portfolio-db`
- Plan: Free (for testing) or Starter+ (for production)
- **Copy the Internal Database URL**

### 2. Create Web Service
- Render Dashboard → New + → Web Service
- Connect your Git repository
- **Root Directory**: `backend`
- **Build Command**: `chmod +x build.sh && ./build.sh`
- **Start Command**: `cd Portfolio_Project && gunicorn Portfolio_Project.wsgi:application --bind 0.0.0.0:$PORT`

### 3. Set Environment Variables

Add these in your Web Service → Environment:

```bash
# Required
SECRET_KEY=<generate-with-command-below>
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com,yourdomain.com
DATABASE_URL=<internal-database-url-from-step-1>
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com

# Security (Production)
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

**Generate SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4. Link Database
- Web Service → Connections → Link Database
- Select your PostgreSQL database

### 5. Deploy & Create Admin User
- Click "Save Changes" to deploy
- Once deployed, go to Shell tab
- Run: `cd Portfolio_Project && python manage.py createsuperuser`

## ✅ Verify Deployment

- Admin: `https://your-app-name.onrender.com/admin/`
- API: `https://your-app-name.onrender.com/api/profile/`

## 📝 Update Frontend

Update `frontend/.env`:
```env
VITE_API_BASE_URL=https://your-app-name.onrender.com/api
VITE_BACKEND_URL=https://your-app-name.onrender.com
```

## 🔧 Troubleshooting

- **Build fails**: Check build logs, verify all dependencies in requirements.txt
- **Database errors**: Verify DATABASE_URL is set and database is linked
- **CORS errors**: Check CORS_ALLOWED_ORIGINS includes your frontend URL
- **500 errors**: Check application logs, verify DEBUG=False

See `RENDER_DEPLOYMENT.md` for detailed instructions.
