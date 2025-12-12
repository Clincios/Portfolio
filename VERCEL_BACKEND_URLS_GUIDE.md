# 🔗 Step-by-Step: Getting Backend URLs for Vercel

This guide shows you exactly how to get your backend URLs and add them to Vercel.

---

## 📋 Step 1: Deploy Backend First (Railway or Render)

**You MUST deploy your backend BEFORE setting up Vercel!**

### If using Railway:

1. Go to [railway.app](https://railway.app) and deploy your backend
2. After deployment completes, click on your **service/project**
3. Look for one of these:
   - **"Settings"** tab → Scroll to **"Networking"** or **"Domains"**
   - **"Generate Domain"** button (click it if you see it)
   - The URL displayed at the top of the service page

4. **Your backend URL will look like:**
   ```
   https://your-app-name-production.up.railway.app
   ```
   OR
   ```
   https://your-app-name.railway.app
   ```

5. **Copy this URL** - this is your `VITE_BACKEND_URL`

### If using Render:

1. Go to [render.com](https://render.com) and deploy your backend
2. After deployment, click on your **web service**
3. Look at the **top of the page** - you'll see your URL
4. **Your backend URL will look like:**
   ```
   https://your-app-name.onrender.com
   ```
5. **Copy this URL** - this is your `VITE_BACKEND_URL`

---

## 📋 Step 2: Test Your Backend URL

Before adding to Vercel, test that your backend works:

1. **Open in browser:**
   ```
   https://your-backend-url.railway.app/admin/
   ```
   Should show Django admin login page ✅

2. **Test API endpoint:**
   ```
   https://your-backend-url.railway.app/api/profile/
   ```
   Should return JSON (even if empty array `[]`) ✅

---

## 📋 Step 3: Add URLs to Vercel

### Option A: During Initial Setup

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Before clicking "Deploy", click "Environment Variables"** (or "Advanced" → "Environment Variables")

6. **Add these two variables:**

   **Variable 1:**
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend-url.railway.app/api`
   - **Environment:** Production, Preview, Development (select all)

   **Variable 2:**
   - **Name:** `VITE_BACKEND_URL`
   - **Value:** `https://your-backend-url.railway.app`
   - **Environment:** Production, Preview, Development (select all)

7. Click **"Deploy"**

### Option B: Add After Deployment

1. Go to your Vercel project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left sidebar
4. Click **"Add New"**
5. Add both variables as shown above
6. **Redeploy** your project (go to "Deployments" → Click "..." → "Redeploy")

---

## 📝 Example Values

### If your Railway URL is:
```
https://portfolio-backend-production.up.railway.app
```

### Then in Vercel, set:

| Variable Name | Variable Value |
|--------------|----------------|
| `VITE_API_BASE_URL` | `https://portfolio-backend-production.up.railway.app/api` |
| `VITE_BACKEND_URL` | `https://portfolio-backend-production.up.railway.app` |

### If your Render URL is:
```
https://portfolio-backend.onrender.com
```

### Then in Vercel, set:

| Variable Name | Variable Value |
|--------------|----------------|
| `VITE_API_BASE_URL` | `https://portfolio-backend.onrender.com/api` |
| `VITE_BACKEND_URL` | `https://portfolio-backend.onrender.com` |

---

## ✅ Quick Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Backend URL copied (starts with `https://`)
- [ ] Backend URL tested in browser (admin page loads)
- [ ] API endpoint tested (returns JSON)
- [ ] `VITE_API_BASE_URL` added to Vercel (ends with `/api`)
- [ ] `VITE_BACKEND_URL` added to Vercel (no trailing slash)
- [ ] Both variables set for all environments (Production, Preview, Development)
- [ ] Project redeployed after adding variables

---

## 🎯 Visual Guide

### Railway Dashboard:
```
┌─────────────────────────────────────┐
│  Your Service Name                  │
│  ─────────────────────────────────  │
│  🔗 https://your-app.railway.app    │ ← Copy this!
│                                     │
│  [Settings] [Deployments] [Logs]   │
└─────────────────────────────────────┘
```

### Vercel Environment Variables:
```
┌─────────────────────────────────────┐
│  Environment Variables              │
│  ─────────────────────────────────  │
│                                     │
│  Name: VITE_API_BASE_URL            │
│  Value: https://your-app.../api     │
│  Environment: ☑ Prod ☑ Preview     │
│                                     │
│  Name: VITE_BACKEND_URL             │
│  Value: https://your-app...         │
│  Environment: ☑ Prod ☑ Preview     │
│                                     │
│  [Save] [Cancel]                    │
└─────────────────────────────────────┘
```

---

## 🚨 Common Mistakes to Avoid

1. ❌ **Don't add trailing slash** to `VITE_BACKEND_URL`
   - ✅ Correct: `https://app.railway.app`
   - ❌ Wrong: `https://app.railway.app/`

2. ❌ **Don't forget `/api`** in `VITE_API_BASE_URL`
   - ✅ Correct: `https://app.railway.app/api`
   - ❌ Wrong: `https://app.railway.app`

3. ❌ **Don't use `http://`** - always use `https://` in production

4. ❌ **Don't forget to redeploy** after adding environment variables

---

## 🆘 Troubleshooting

### "Can't find backend URL in Railway"
- Check if deployment completed successfully
- Look in "Settings" → "Networking"
- Click "Generate Domain" if you see the button
- Check the service logs for any errors

### "Backend URL not working"
- Wait 2-3 minutes after deployment (services need time to start)
- Check Railway/Render logs for errors
- Verify `ALLOWED_HOSTS` includes your domain
- Make sure the service is running (not paused)

### "Frontend can't connect to backend"
- Verify environment variables are set correctly in Vercel
- Make sure you redeployed after adding variables
- Check browser console for CORS errors
- Verify `CORS_ALLOWED_ORIGINS` includes your Vercel URL

### "Environment variables not working"
- Make sure variable names start with `VITE_` (required for Vite)
- Redeploy the project after adding variables
- Check that variables are enabled for the right environment (Production/Preview)

---

## 📞 Need More Help?

1. Check `HOW_TO_GET_BACKEND_URLS.md` for more details
2. See `QUICK_START.md` for full deployment guide
3. Check platform documentation:
   - [Railway Docs](https://docs.railway.app)
   - [Vercel Docs](https://vercel.com/docs)


