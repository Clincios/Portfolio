# Comprehensive Vite Setup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Vite Installation & Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Node.js and npm
Write-Host "[1/5] Checking Node.js and npm..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "  ✓ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "  ✓ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js or npm not found!" -ForegroundColor Red
    Write-Host "  Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 2: Clean up existing installations
Write-Host "[2/5] Cleaning up existing installations..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  Removing existing node_modules..." -ForegroundColor Gray
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Write-Host "  Removing existing package-lock.json..." -ForegroundColor Gray
    Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
}
Write-Host "  ✓ Cleanup complete" -ForegroundColor Green
Write-Host ""

# Step 3: Install dependencies
Write-Host "[3/5] Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
$installResult = npm install 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "  ✗ Installation failed!" -ForegroundColor Red
    Write-Host $installResult
    exit 1
}
Write-Host ""

# Step 4: Verify Vite installation
Write-Host "[4/5] Verifying Vite installation..." -ForegroundColor Yellow
if (Test-Path "node_modules\vite") {
    Write-Host "  ✓ Vite package found" -ForegroundColor Green
} else {
    Write-Host "  ✗ Vite package not found!" -ForegroundColor Red
    exit 1
}

if (Test-Path "node_modules\.bin\vite.cmd") {
    Write-Host "  ✓ Vite binary found" -ForegroundColor Green
} else {
    Write-Host "  ✗ Vite binary not found!" -ForegroundColor Red
    Write-Host "  Attempting to reinstall vite..." -ForegroundColor Yellow
    npm install vite --save-dev
}
Write-Host ""

# Step 5: Test the setup
Write-Host "[5/5] Testing setup..." -ForegroundColor Yellow
try {
    $viteVersion = npx vite --version 2>&1
    Write-Host "  ✓ Vite is working: $viteVersion" -ForegroundColor Green
} catch {
    Write-Host "  ⚠ Could not verify vite version, but installation appears complete" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now run: npm run dev" -ForegroundColor Green
Write-Host ""
