# Quick Start: Deploy Frontend to Vercel

## 🚀 5-Minute Deployment

### Step 1: Push Code to Git
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Sign Up / Log In
- Go to https://vercel.com
- Sign up with GitHub/GitLab/Bitbucket

### Step 3: Import Project
- Click "Add New..." → "Project"
- Select your repository
- **Root Directory**: `frontend`

### Step 4: Configure Settings

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
Add these:
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
VITE_BACKEND_URL=https://your-backend.onrender.com
```

### Step 5: Deploy
- Click "Deploy"
- Wait 1-3 minutes
- Your site is live! 🎉

## ✅ Post-Deployment

1. **Update Backend CORS:**
   - In Render, add your Vercel URL to `CORS_ALLOWED_ORIGINS`
   - Example: `https://your-project.vercel.app`

2. **Test Your Site:**
   - Visit your Vercel URL
   - Check browser console for errors
   - Test contact form

## 🔧 Common Issues

**Build Fails:**
- Check build logs
- Run `npm run build` locally first

**API Not Working:**
- Verify environment variables are set
- Check backend CORS includes Vercel URL
- Test backend API directly

**Environment Variables Not Working:**
- Must start with `VITE_` prefix
- Redeploy after adding variables

## 📝 Environment Variables

```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
VITE_BACKEND_URL=https://your-backend.onrender.com
```

See `VERCEL_DEPLOYMENT.md` for detailed instructions.
