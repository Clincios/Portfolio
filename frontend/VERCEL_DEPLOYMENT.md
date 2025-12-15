# Vercel Deployment Guide for Portfolio Frontend

This guide will help you deploy your React + Vite frontend to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com - free tier available)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Your backend deployed and accessible (e.g., on Render)

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Make sure all your changes are committed and pushed to your Git repository
2. Verify your `package.json` has a `build` script (should be: `"build": "npx vite build"`)

### Step 2: Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose to sign up with GitHub, GitLab, or Bitbucket (recommended for easy integration)

### Step 3: Import Your Project

1. After logging in, click "Add New..." → "Project"
2. Import your Git repository:
   - If you connected GitHub/GitLab/Bitbucket, select your repository
   - If not, click "Import Git Repository" and connect your account
3. Select the repository containing your portfolio project

### Step 4: Configure Project Settings

Vercel will auto-detect your framework, but verify these settings:

**Framework Preset:**
- Select: **Vite** (or it should auto-detect)

**Root Directory:**
- Set to: `frontend` (since your frontend is in a subdirectory)

**Build and Output Settings:**
- **Build Command**: `npm run build` (or `npm install && npm run build` if needed)
- **Output Directory**: `dist` (Vite's default output directory)
- **Install Command**: `npm install`

**Environment Variables:**
Click "Environment Variables" and add:

```
VITE_API_BASE_URL=https://your-backend-app.onrender.com/api
VITE_BACKEND_URL=https://your-backend-app.onrender.com
```

Replace `your-backend-app.onrender.com` with your actual Render backend URL.

### Step 5: Deploy

1. Click "Deploy" button
2. Vercel will:
   - Install dependencies (`npm install`)
   - Build your project (`npm run build`)
   - Deploy to a production URL
3. Wait for the build to complete (usually 1-3 minutes)

### Step 6: Verify Deployment

1. Once deployment is complete, you'll see a success message
2. Click on your deployment URL (e.g., `https://your-project.vercel.app`)
3. Test your application:
   - Check if the homepage loads
   - Verify API calls are working (check browser console for errors)
   - Test the contact form

### Step 7: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains" tab
3. Add your custom domain (e.g., `www.yourdomain.com`)
4. Follow Vercel's instructions to configure DNS records
5. Wait for DNS propagation (can take up to 48 hours)

## Post-Deployment Configuration

### Update Backend CORS Settings

Make sure your backend (Render) has the correct CORS settings:

1. Go to your Render backend service
2. In Environment Variables, update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS=https://your-project.vercel.app,https://yourdomain.com
   ```
3. Redeploy your backend if needed

### Verify Environment Variables

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify these are set:
   - `VITE_API_BASE_URL` - Your backend API URL
   - `VITE_BACKEND_URL` - Your backend base URL

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to your `main` or `master` branch
- **Preview**: Every push to other branches (creates preview URLs)

## Troubleshooting

### Build Fails

**Error: "Build command failed"**
- Check build logs in Vercel dashboard
- Verify `package.json` has correct build script
- Ensure all dependencies are listed in `package.json`
- Try running `npm run build` locally to identify issues

**Error: "Module not found"**
- Check that all dependencies are in `package.json`
- Verify `node_modules` is in `.gitignore` (it should be)
- Ensure import paths are correct

### API Calls Not Working

**Error: "CORS policy" or "Network Error"**
- Verify `VITE_API_BASE_URL` environment variable is set correctly
- Check backend CORS settings include your Vercel URL
- Ensure backend is deployed and accessible

**Error: "404 Not Found" on API calls**
- Verify the API URL in environment variables
- Check that your backend routes are correct
- Test backend API directly (e.g., `https://your-backend.onrender.com/api/profile/`)

### Environment Variables Not Working

- Environment variables must start with `VITE_` to be accessible in Vite
- After adding/changing environment variables, redeploy your project
- Clear browser cache if variables still not updating

### Static Assets Not Loading

- Verify `dist` is set as Output Directory
- Check that assets are being built correctly
- Ensure asset paths are relative (not absolute)

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://portfolio-backend.onrender.com/api` |
| `VITE_BACKEND_URL` | Backend base URL for media | `https://portfolio-backend.onrender.com` |

**Important:** All Vite environment variables must be prefixed with `VITE_` to be accessible in your React code.

## Vercel Configuration File (Optional)

You can create a `vercel.json` file in your `frontend` directory for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures proper routing for React Router (if you're using it) and sets build configuration.

## Cost Considerations

- **Free Tier (Hobby Plan)**:
  - Unlimited deployments
  - 100GB bandwidth per month
  - Perfect for personal portfolios
  - Custom domains supported

- **Pro Plan ($20/month)**:
  - Everything in Hobby
  - Team collaboration
  - More bandwidth
  - Advanced analytics

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] Backend CORS is configured to allow your Vercel domain
- [ ] No sensitive data in environment variables (use Vercel's secure storage)
- [ ] Custom domain has SSL enabled (automatic with Vercel)
- [ ] API keys are stored in environment variables, not in code

## Quick Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] Vercel account created
- [ ] Project imported from Git
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables added (`VITE_API_BASE_URL`, `VITE_BACKEND_URL`)
- [ ] Backend CORS updated with Vercel URL
- [ ] Deployment successful
- [ ] Application tested and working

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Vite Documentation: https://vitejs.dev

---

**Next Steps:**
1. Deploy your frontend following this guide
2. Update your backend CORS settings
3. Test your deployed application
4. Configure custom domain (optional)
5. Share your portfolio! 🚀
