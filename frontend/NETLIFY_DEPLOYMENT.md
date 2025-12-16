# Netlify Deployment Guide - Step by Step

This guide will walk you through deploying your React + Vite frontend to Netlify.

## Prerequisites

- ✅ Your code pushed to GitHub
- ✅ Your backend deployed on Render (or ready to deploy)
- ✅ Netlify account (free tier works perfectly)

---

## Step 1: Sign Up / Log In to Netlify

1. Go to **https://netlify.com**
2. Click **"Sign up"** or **"Log in"**
3. Choose **"Sign up with GitHub"** (recommended - easiest integration)
4. Authorize Netlify to access your GitHub repositories

---

## Step 2: Import Your Project

1. After logging in, you'll see the Netlify dashboard
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"** as your Git provider
4. If prompted, authorize Netlify to access your repositories
5. **Search for and select** your repository: `Clincios/Portfolio`

---

## Step 3: Configure Build Settings

Netlify will try to auto-detect, but you need to configure these:

### Basic Build Settings:

1. **Base directory:** 
   - Click **"Show advanced"** or scroll down
   - Set to: `frontend`

2. **Build command:**
   - Should be: `npm run build`
   - (Netlify might auto-detect this)

3. **Publish directory:**
   - Should be: `dist`
   - (This is where Vite outputs your built files)

**Important:** 
- If Base directory is `frontend`, then Publish directory should be `dist`
- If Base directory is empty, then Publish directory should be `frontend/dist`

---

## Step 4: Set Environment Variables

**Before clicking "Deploy site", set your environment variables:**

1. Scroll down to **"Environment variables"** section
2. Click **"New variable"** and add:

   **Variable 1:**
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://portfolio-mit4.onrender.com/api`
   - **Scope:** Select **"All scopes"** (or at least Production)

   **Variable 2:**
   - **Key:** `VITE_BACKEND_URL`
   - **Value:** `https://portfolio-mit4.onrender.com` 
   - **Important:** No trailing slash!
   - **Scope:** Select **"All scopes"** (or at least Production)

3. Click **"Add variable"** for each one

---

## Step 5: Deploy!

1. Click the big **"Deploy site"** button
2. Netlify will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build your project (`npm run build`)
   - Deploy to a production URL
3. **Wait 1-3 minutes** for the build to complete
4. You'll see a success message with your site URL (e.g., `https://random-name-123.netlify.app`)

---

## Step 6: Update Backend CORS

**Critical step!** Your backend needs to allow your Netlify domain:

1. Go to **Render Dashboard** → Your backend service
2. Go to **Environment Variables**
3. Find or add `CORS_ALLOWED_ORIGINS`
4. Update it to include your Netlify URL:
   ```
   http://localhost:3000,http://localhost:5173,https://your-site-name.netlify.app
   ```
   Replace `your-site-name.netlify.app` with your actual Netlify URL
5. **Save** and **redeploy** your backend
6. Wait for backend deployment to complete

---

## Step 7: Verify Deployment

1. **Visit your Netlify URL** (e.g., `https://your-site.netlify.app`)
2. **Open browser console** (F12) → Console tab
3. **Check for errors:**
   - Should see no CORS errors
   - API calls should succeed
4. **Test your site:**
   - Homepage loads
   - Data displays (profile, skills, projects, etc.)
   - Contact form works

---

## Step 8: Configure Custom Domain (Optional)

1. In Netlify Dashboard → Your site → **Site settings**
2. Click **"Domain management"**
3. Click **"Add custom domain"**
4. Enter your domain (e.g., `www.yourdomain.com`)
5. Follow Netlify's instructions to configure DNS
6. Wait for DNS propagation (can take up to 48 hours)

---

## Automatic Deployments

Netlify automatically deploys:
- ✅ **Production:** Every push to `main` branch
- ✅ **Deploy previews:** Every push to other branches
- ✅ **Branch deploys:** For feature branches (optional)

---

## Troubleshooting

### Build Fails

**Check:**
- Build logs in Netlify dashboard
- Verify Base directory is `frontend`
- Verify Publish directory is `dist`
- Run `npm run build` locally first to catch errors

### Data Not Loading (400/500 Errors)

**Most common issue:**
1. **CORS not configured:**
   - Add your Netlify URL to `CORS_ALLOWED_ORIGINS` in Render
   - Format: `https://your-site.netlify.app`

2. **Environment variables not set:**
   - Verify both variables are in Netlify
   - Redeploy after adding variables

3. **Backend not running:**
   - Check Render dashboard - is backend live?
   - Test backend API directly in browser

### Environment Variables Not Working

- Variables must start with `VITE_` prefix
- Redeploy after adding/changing variables
- Check variable scope includes Production

---

## Quick Reference

### Build Settings:
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Environment Variables:
```
VITE_API_BASE_URL=https://portfolio-mit4.onrender.com/api
VITE_BACKEND_URL=https://portfolio-mit4.onrender.com
```

### Backend CORS:
```
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://your-site.netlify.app
```

---

## Checklist

- [ ] Signed up/logged in to Netlify
- [ ] Imported GitHub repository
- [ ] Set Base directory: `frontend`
- [ ] Set Build command: `npm run build`
- [ ] Set Publish directory: `dist`
- [ ] Added `VITE_API_BASE_URL` environment variable
- [ ] Added `VITE_BACKEND_URL` environment variable (no trailing slash)
- [ ] Clicked "Deploy site"
- [ ] Updated backend CORS with Netlify URL
- [ ] Tested deployed site
- [ ] Verified data loads correctly

---

## Support

- Netlify Docs: https://docs.netlify.com
- Netlify Community: https://answers.netlify.com

**Your site should now be live! 🎉**
