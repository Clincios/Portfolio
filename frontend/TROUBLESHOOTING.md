# Vite "Not Recognized" Error - Complete Solution Guide

## Problem Analysis

The error `'vite' is not recognized as an internal or external command` occurs because:

1. **node_modules is missing or incomplete** - Vite needs to be installed in `node_modules/.bin/`
2. **npm install didn't complete** - Dependencies weren't properly installed
3. **PATH issue** - The vite binary isn't accessible (though npm scripts should handle this)

## Root Cause

When you run `npm run dev`, npm looks for the `vite` command in:
- `node_modules/.bin/vite.cmd` (Windows)
- Or uses npx to find it

If `node_modules` doesn't exist or vite isn't installed, the command fails.

## Solutions (Try in Order)

### Solution 1: Clean Install (RECOMMENDED)

```powershell
cd "C:\Users\AGEBOBA CLINTON\Desktop\PORTFOLIO\frontend"

# Remove existing installations
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }

# Fresh install
npm install

# Verify installation
if (Test-Path "node_modules\vite") {
    Write-Host "SUCCESS: Vite installed!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Installation failed" -ForegroundColor Red
}
```

### Solution 2: Use the Setup Script

Run the provided setup script:

```powershell
cd "C:\Users\AGEBOBA CLINTON\Desktop\PORTFOLIO\frontend"
powershell -ExecutionPolicy Bypass -File "setup.ps1"
```

### Solution 3: Manual Vite Installation

If npm install fails, install vite directly:

```powershell
cd "C:\Users\AGEBOBA CLINTON\Desktop\PORTFOLIO\frontend"
npm install vite@^5.0.8 --save-dev
npm install @vitejs/plugin-react@^4.2.1 --save-dev
```

### Solution 4: Verify Node.js and npm

Ensure Node.js and npm are properly installed:

```powershell
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
```

If these don't work, install Node.js from: https://nodejs.org/

### Solution 5: Check Network/Proxy Issues

If behind a corporate firewall:

```powershell
npm config set registry https://registry.npmjs.org/
npm install
```

### Solution 6: Use npx (Already Applied)

The `package.json` has been updated to use `npx vite` instead of `vite`. This should work even if vite isn't in PATH, but you still need `node_modules` to exist.

## Verification Steps

After installation, verify:

1. **Check node_modules exists:**
   ```powershell
   Test-Path "node_modules"
   ```

2. **Check vite is installed:**
   ```powershell
   Test-Path "node_modules\vite"
   Test-Path "node_modules\.bin\vite.cmd"
   ```

3. **Test vite directly:**
   ```powershell
   npx vite --version
   ```

4. **Run dev server:**
   ```powershell
   npm run dev
   ```

## Expected File Structure

After successful installation:

```
frontend/
├── node_modules/          ← MUST EXIST
│   ├── vite/             ← Vite package
│   └── .bin/
│       └── vite.cmd      ← Vite executable
├── package-lock.json     ← Created after npm install
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    └── services/
        └── api.js
```

## Common Issues

### Issue: npm install hangs or times out
**Solution:** Check internet connection, try different registry, or use `npm install --verbose` to see what's happening

### Issue: Permission errors
**Solution:** Run PowerShell as Administrator, or check folder permissions

### Issue: node_modules exists but vite still not found
**Solution:** 
```powershell
npm rebuild
# Or reinstall vite specifically
npm uninstall vite
npm install vite --save-dev
```

## Next Steps

1. Run Solution 1 (Clean Install) above
2. If that fails, check Node.js installation
3. If still failing, check the error messages from `npm install --verbose`
4. Once `node_modules` exists, `npm run dev` should work

## Notes

- The `package.json` scripts have been updated to use `npx vite` which is more robust
- `npx` will download and cache vite if needed, but local installation is preferred
- Always ensure `node_modules` exists before running npm scripts
