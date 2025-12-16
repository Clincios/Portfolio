# Quick Start: Deploy to Netlify (5 Minutes)

## 🚀 Fast Deployment Steps

### 1. Sign Up
- Go to https://netlify.com
- Sign up with GitHub

### 2. Import Project
- Click "Add new site" → "Import an existing project"
- Select your repository: `Clincios/Portfolio`

### 3. Configure Settings

**Build Settings:**
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`

**Environment Variables** (click "Show advanced"):
```
VITE_API_BASE_URL=https://portfolio-mit4.onrender.com/api
VITE_BACKEND_URL=https://portfolio-mit4.onrender.com
```

### 4. Deploy
- Click "Deploy site"
- Wait 1-3 minutes
- Your site is live! 🎉

### 5. Update Backend CORS
- Render Dashboard → Backend → Environment Variables
- Update `CORS_ALLOWED_ORIGINS`:
  ```
  http://localhost:3000,http://localhost:5173,https://your-site.netlify.app
  ```
- Redeploy backend

## ✅ Done!

Visit your Netlify URL and test your portfolio!

See `NETLIFY_DEPLOYMENT.md` for detailed instructions.
