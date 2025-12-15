# Quick Fixes for Vercel Deployment

## ⚠️ Immediate Fix Required

### Fix Environment Variable

**In Vercel Dashboard:**
1. Go to: Project Settings → Environment Variables
2. Find: `VITE_BACKEND_URL`
3. Change from: `https://portfolio-mit4.onrender.com/`
4. Change to: `https://portfolio-mit4.onrender.com` (remove trailing slash)
5. Save and redeploy

## 🔍 How to Find the Exact Error

1. **In Vercel Dashboard:**
   - Click on your project
   - Click on the failed deployment (red X)
   - Scroll to "Build Logs" section
   - Look for error messages (usually in red)
   - The error will show what line/file failed

2. **Common Error Locations:**
   - Look for: `Error:`, `Failed:`, `Cannot find`, `Module not found`
   - Check the file path mentioned in the error
   - Note the line number

## 🛠️ Common Build Errors & Fixes

### Error: "Cannot find module"
**Fix:** Add missing dependency to `package.json`

### Error: "SyntaxError" or "Unexpected token"
**Fix:** Check the file mentioned for syntax errors

### Error: "Build command failed"
**Fix:** Run `npm run build` locally to see the exact error

### Error: "Module not found: Can't resolve"
**Fix:** Check import paths are correct

## ✅ Pre-Deployment Checklist

- [ ] Remove trailing slash from `VITE_BACKEND_URL`
- [ ] Verify `VITE_API_BASE_URL` = `https://portfolio-mit4.onrender.com/api`
- [ ] Verify `VITE_BACKEND_URL` = `https://portfolio-mit4.onrender.com` (no slash)
- [ ] Test build locally: `cd frontend && npm run build`
- [ ] Check for any console errors
- [ ] Ensure all dependencies are in `package.json`

## 🧪 Test Build Locally

```bash
cd frontend
npm install
npm run build
```

If this fails locally, fix the error first before deploying to Vercel.

## 📋 Current Configuration Check

**Your Current Settings (from screenshot):**
- ✅ Root Directory: `frontend` - Correct
- ✅ Framework: `Vite` - Correct
- ✅ Build Command: `npm run build` - Correct
- ✅ Output Directory: `dist` - Correct
- ⚠️ `VITE_BACKEND_URL`: Has trailing slash - **NEEDS FIX**

## 🚀 After Fixing

1. Update `VITE_BACKEND_URL` (remove trailing slash)
2. Click "Redeploy" in Vercel
3. Monitor build logs
4. If it still fails, check the full error message and share it
