# 🚀 Quick Start - Production Deployment

## Fastest Method: Vercel + Railway (Recommended)

### Step 1: Deploy Backend to Railway (5 minutes)

1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Django
5. **Generate SECRET_KEY** (run this command locally):
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
6. Add these environment variables in Railway dashboard:
   ```
   SECRET_KEY=<paste-generated-key-here>
   DEBUG=False
   ALLOWED_HOSTS=your-app.railway.app
   CORS_ALLOW_ALL_ORIGINS=False
   ```
7. Add PostgreSQL database (Railway will auto-create `DATABASE_URL`)
8. Deploy! Railway will run migrations automatically

**Get your backend URL:** `https://your-app.railway.app`

### Step 2: Deploy Frontend to Vercel (3 minutes)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Add New Project" → Import your repository
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables:
   ```
   VITE_API_BASE_URL=https://your-app.railway.app/api
   VITE_BACKEND_URL=https://your-app.railway.app
   ```
5. Deploy!

**Get your frontend URL:** `https://your-app.vercel.app`

### Step 3: Update CORS (2 minutes)

1. Go to Railway dashboard → Your backend service
2. Add environment variable:
   ```
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
   ```
3. Redeploy backend

### Step 4: Create Admin User

In Railway dashboard, open terminal and run:
```bash
python manage.py createsuperuser
```

### ✅ Done!

Your portfolio is live at: `https://your-app.vercel.app`

---

## Alternative: Render.com (Free Tier)

### Backend on Render

1. Go to [render.com](https://render.com) → Sign up
2. New → Web Service → Connect GitHub
3. Settings:
   - **Name:** portfolio-backend
   - **Environment:** Python 3
   - **Build Command:** `cd backend/Portfolio_Project && pip install -r ../../requirements.txt && python manage.py collectstatic --noinput`
   - **Start Command:** `cd backend/Portfolio_Project && gunicorn Portfolio_Project.wsgi:application`
4. Add PostgreSQL database (free tier)
5. Add environment variables (same as Railway)
6. Deploy!

### Frontend on Netlify

1. Go to [netlify.com](https://netlify.com) → Sign up
2. Add new site → Import from Git
3. Settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. Add environment variables (same as Vercel)
5. Deploy!

---

## Generate Secret Key

Run this command to generate a secure secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## Need Help?

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

