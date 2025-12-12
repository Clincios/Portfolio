# 🔗 How to Get Your Backend URLs

After deploying your backend, you need to find the backend URL to configure your frontend. Here's how:

## 📍 Where to Find Your Backend URL

### **Option 1: Railway (Recommended)**

1. **After Deployment:**
   - Go to [railway.app](https://railway.app)
   - Click on your project
   - Click on your backend service
   - Look for the **"Settings"** tab
   - Scroll down to **"Networking"** or **"Domains"** section
   - You'll see your URL like: `https://your-app-production.up.railway.app`

2. **Or Check the Service:**
   - In your service dashboard, look for a **"Generate Domain"** button
   - Click it to get a public URL
   - The URL will look like: `https://your-app-name.railway.app`

3. **Copy the URL:**
   - This is your **Backend URL**: `https://your-app-name.railway.app`
   - Your **API URL** is: `https://your-app-name.railway.app/api`

---

### **Option 2: Render.com**

1. **After Deployment:**
   - Go to [render.com](https://render.com)
   - Click on your web service
   - Look at the top of the page
   - You'll see your URL: `https://your-app-name.onrender.com`

2. **Copy the URL:**
   - This is your **Backend URL**: `https://your-app-name.onrender.com`
   - Your **API URL** is: `https://your-app-name.onrender.com/api`

---

## 🎯 How to Use These URLs

### For Vercel Frontend Deployment:

When setting up environment variables in Vercel, use:

```
VITE_API_BASE_URL=https://your-app-name.railway.app/api
VITE_BACKEND_URL=https://your-app-name.railway.app
```

**Example:**
If your Railway URL is `https://portfolio-backend-production.up.railway.app`, then:

```
VITE_API_BASE_URL=https://portfolio-backend-production.up.railway.app/api
VITE_BACKEND_URL=https://portfolio-backend-production.up.railway.app
```

---

## ✅ Quick Checklist

1. ✅ Deploy backend to Railway/Render
2. ✅ Find your backend URL in the platform dashboard
3. ✅ Copy the full URL (starts with `https://`)
4. ✅ Use it as `VITE_BACKEND_URL` in Vercel
5. ✅ Add `/api` to the end for `VITE_API_BASE_URL`

---

## 🔍 Testing Your Backend URL

After getting your URL, test it:

1. **Test Backend Health:**
   ```
   https://your-backend-url.railway.app/admin/
   ```
   Should show Django admin login page

2. **Test API Endpoint:**
   ```
   https://your-backend-url.railway.app/api/profile/
   ```
   Should return JSON data (or empty array if no data)

3. **If you get errors:**
   - Check that `ALLOWED_HOSTS` includes your domain
   - Verify the service is running (check Railway/Render dashboard)
   - Check logs for any errors

---

## 📝 Example URLs

### Railway Example:
- **Backend URL:** `https://portfolio-backend-production.up.railway.app`
- **API Base URL:** `https://portfolio-backend-production.up.railway.app/api`
- **Admin URL:** `https://portfolio-backend-production.up.railway.app/admin/`

### Render Example:
- **Backend URL:** `https://portfolio-backend.onrender.com`
- **API Base URL:** `https://portfolio-backend.onrender.com/api`
- **Admin URL:** `https://portfolio-backend.onrender.com/admin/`

---

## 🚨 Important Notes

1. **HTTPS Required:** Always use `https://` in production
2. **No Trailing Slash:** Don't add `/` at the end of `VITE_BACKEND_URL`
3. **API Path:** The API URL should end with `/api` (no trailing slash)
4. **CORS:** After deploying frontend, update `CORS_ALLOWED_ORIGINS` in backend with your frontend URL

---

## 🆘 Troubleshooting

**Can't find the URL?**
- Check if the deployment completed successfully
- Look in the "Networking" or "Domains" section
- Some platforms require you to generate a domain first

**URL not working?**
- Wait a few minutes after deployment (services need time to start)
- Check the service logs for errors
- Verify `ALLOWED_HOSTS` includes your domain

**CORS errors?**
- Make sure `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Set `CORS_ALLOW_ALL_ORIGINS=False` in production

