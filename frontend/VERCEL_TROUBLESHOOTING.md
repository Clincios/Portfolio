# Vercel Deployment Troubleshooting Guide

## Common Build Errors and Solutions

### 1. Environment Variable Issues

**Problem:** `VITE_BACKEND_URL` has trailing slash
- **Current:** `https://portfolio-mit4.onrender.com/`
- **Should be:** `https://portfolio-mit4.onrender.com` (no trailing slash)

**Fix in Vercel:**
1. Go to Project Settings → Environment Variables
2. Update `VITE_BACKEND_URL` to remove trailing slash
3. Redeploy

### 2. Build Command Fails

**Error:** "Build command failed" or "Command exited with code 1"

**Solutions:**
- Check full build logs in Vercel dashboard
- Run `npm run build` locally to see the exact error
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors (if using TypeScript)
- Verify all imports are correct

### 3. Module Not Found Errors

**Error:** "Cannot find module 'X'" or "Module not found"

**Solutions:**
- Verify the module is in `package.json` dependencies
- Check import paths are correct
- Ensure `node_modules` is in `.gitignore`
- Try deleting `node_modules` and `package-lock.json`, then `npm install`

### 4. Environment Variables Not Accessible

**Problem:** Environment variables return `undefined`

**Solutions:**
- Variables must start with `VITE_` prefix
- Redeploy after adding/changing variables
- Check variable names match exactly (case-sensitive)
- Verify variables are set for "Production" environment

### 5. API Calls Failing

**Error:** CORS errors or network errors

**Solutions:**
- Verify `VITE_API_BASE_URL` is correct
- Check backend CORS settings include Vercel domain
- Test backend API directly in browser
- Check browser console for specific error messages

### 6. Static Assets Not Loading

**Problem:** Images, CSS, or JS files return 404

**Solutions:**
- Verify Output Directory is set to `dist`
- Check asset paths are relative (not absolute)
- Ensure `vercel.json` is configured correctly
- Check build output includes all assets

## How to Get Full Error Details

1. **In Vercel Dashboard:**
   - Go to your project
   - Click on the failed deployment
   - Scroll down to "Build Logs"
   - Look for red error messages
   - Copy the full error message

2. **Common Error Patterns:**
   - `SyntaxError` - Check your code for syntax errors
   - `TypeError` - Check for undefined variables or incorrect types
   - `ModuleNotFoundError` - Missing dependency
   - `Build failed` - Check build command output

## Quick Fixes Checklist

- [ ] Remove trailing slash from `VITE_BACKEND_URL`
- [ ] Verify `VITE_API_BASE_URL` ends with `/api`
- [ ] Check all environment variables are set
- [ ] Run `npm run build` locally first
- [ ] Check for console errors in build logs
- [ ] Verify `package.json` has all dependencies
- [ ] Check import paths are correct
- [ ] Ensure no hardcoded localhost URLs

## Testing Locally Before Deploying

```bash
# In frontend directory
npm install
npm run build

# If build succeeds locally, it should work on Vercel
# If it fails locally, fix the error first
```

## Getting Help

1. **Check Build Logs:** Full error details are in Vercel dashboard
2. **Test Locally:** Run `npm run build` to reproduce errors
3. **Check Console:** Browser console shows runtime errors
4. **Vercel Docs:** https://vercel.com/docs

## Common Configuration Issues

### Incorrect Environment Variables

**Wrong:**
```
VITE_BACKEND_URL=https://portfolio-mit4.onrender.com/
```

**Correct:**
```
VITE_BACKEND_URL=https://portfolio-mit4.onrender.com
```

### Missing Environment Variables

Make sure both are set:
- `VITE_API_BASE_URL` (should end with `/api`)
- `VITE_BACKEND_URL` (should NOT end with `/`)

### Build Settings

Verify these in Vercel:
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
