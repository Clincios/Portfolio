# Production Deployment Guide

This guide covers deploying your Portfolio application to production using modern cloud platforms.

## 🚀 Recommended Deployment Method

### **Option 1: Vercel (Frontend) + Railway/Render (Backend)** ⭐ Recommended

This is the easiest and most cost-effective method for beginners.

---

## 📋 Pre-Deployment Checklist

### Backend Preparation

1. **Update Environment Variables**
   
   **Option A: Use the setup script (Recommended)**
   ```bash
   cd backend
   python setup_env.py
   ```
   This will generate a secure SECRET_KEY and guide you through setup.
   
   **Option B: Manual setup**
   - Copy `backend/.env.example` to `backend/.env`
   - Generate a new SECRET_KEY: 
     ```bash
     python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
     ```
   - Update `.env` file:
     - Set `SECRET_KEY` to the generated key
     - Set `DEBUG=False` for production
     - Configure `ALLOWED_HOSTS` with your domain (comma-separated)
     - Set `CORS_ALLOWED_ORIGINS` to your frontend URL(s)
     - Set `CORS_ALLOW_ALL_ORIGINS=False` for production

2. **Database Setup**
   - For production, use PostgreSQL (Railway/Render provide free PostgreSQL)
   - Update `DATABASE_URL` in your `.env` file

3. **Static Files**
   - Run `python manage.py collectstatic` before deployment
   - WhiteNoise is configured to serve static files

### Frontend Preparation

1. **Update API URLs**
   - Copy `frontend/.env.example` to `frontend/.env.production`
   - Set `VITE_API_BASE_URL` to your backend URL
   - Set `VITE_BACKEND_URL` to your backend URL

---

## 🎯 Deployment Steps

### Backend Deployment (Railway)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # Navigate to backend directory
   cd backend/Portfolio_Project
   
   # Initialize Railway project
   railway init
   
   # Add environment variables
   railway variables set SECRET_KEY=your-secret-key
   railway variables set DEBUG=False
   railway variables set ALLOWED_HOSTS=your-backend-url.railway.app
   railway variables set DATABASE_URL=postgresql://... # Railway provides this
   
   # Deploy
   railway up
   ```

3. **Run Migrations**
   ```bash
   railway run python manage.py migrate
   railway run python manage.py createsuperuser
   ```

4. **Collect Static Files**
   ```bash
   railway run python manage.py collectstatic --noinput
   ```

**Alternative: Render.com**

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd backend/Portfolio_Project && pip install -r ../../requirements.txt && python manage.py collectstatic --noinput`
4. Set start command: `cd backend/Portfolio_Project && gunicorn Portfolio_Project.wsgi:application`
5. Add environment variables in Render dashboard
6. Add PostgreSQL database (free tier available)

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy via Vercel Dashboard**
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
   - Add environment variables:
     - `VITE_API_BASE_URL`: Your backend API URL
     - `VITE_BACKEND_URL`: Your backend URL

3. **Deploy via CLI**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Navigate to frontend directory
   cd frontend
   
   # Deploy
   vercel
   
   # For production
   vercel --prod
   ```

**Alternative: Netlify**

1. Create account on [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Set build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Add environment variables in Site settings

---

## 🐳 Docker Deployment (Alternative)

If you prefer Docker, use the provided Dockerfiles:

### Build and Run

```bash
# Build backend
cd backend/Portfolio_Project
docker build -t portfolio-backend .

# Build frontend
cd frontend
docker build -t portfolio-frontend .

# Run with docker-compose
docker-compose up -d
```

---

## 🔧 Post-Deployment

### 1. Update CORS Settings

After deploying, update your backend CORS settings:

```python
# In settings.py or environment variables
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.vercel.app",
    "https://your-custom-domain.com",
]
```

### 2. Configure Custom Domain (Optional)

**Vercel:**
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

**Railway/Render:**
- Add custom domain in project settings
- Update DNS records

### 3. SSL/HTTPS

Both Vercel and Railway/Render provide free SSL certificates automatically.

### 4. Database Backup

Set up automatic backups for your PostgreSQL database:
- Railway: Automatic backups included
- Render: Configure in database settings

---

## 🔒 Security Checklist

- [ ] `DEBUG=False` in production
- [ ] Strong `SECRET_KEY` set
- [ ] `ALLOWED_HOSTS` configured correctly
- [ ] CORS origins restricted to frontend domain
- [ ] Database credentials secured
- [ ] Environment variables not committed to git
- [ ] HTTPS enabled (automatic on Vercel/Railway)

---

## 📊 Monitoring & Logs

### Railway
- View logs: `railway logs`
- Monitor in Railway dashboard

### Vercel
- View logs in Vercel dashboard
- Set up analytics if needed

### Render
- View logs in Render dashboard
- Set up uptime monitoring

---

## 🆘 Troubleshooting

### Backend Issues

**Static files not loading:**
```bash
railway run python manage.py collectstatic --noinput
```

**Database connection errors:**
- Verify `DATABASE_URL` is set correctly
- Check database is running and accessible

**CORS errors:**
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check frontend `VITE_API_BASE_URL` is correct

### Frontend Issues

**API calls failing:**
- Verify environment variables are set in Vercel
- Check backend URL is accessible
- Verify CORS settings on backend

**Build errors:**
- Check Node.js version (Vercel uses Node 18+ by default)
- Verify all dependencies are in `package.json`

---

## 💰 Cost Estimation

### Free Tier (Recommended for Portfolio)
- **Vercel**: Free (unlimited for personal projects)
- **Railway**: $5/month free credit (usually enough for portfolio)
- **Render**: Free tier available (with limitations)

### Paid Options
- **Vercel Pro**: $20/month (for teams)
- **Railway**: Pay-as-you-go after free credit
- **Render**: $7/month for web service + database

---

## 📚 Additional Resources

- [Django Deployment Checklist](https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

---

## 🎉 Success!

Once deployed, your portfolio will be live at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app`
- Admin: `https://your-backend.railway.app/admin`

Remember to:
1. Create a superuser account
2. Add your portfolio data via admin panel
3. Test all functionality
4. Share your portfolio! 🚀

