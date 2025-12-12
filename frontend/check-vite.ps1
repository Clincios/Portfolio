# Quick Vite Installation Checker
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Checking Vite Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$frontendPath = "C:\Users\AGEBOBA CLINTON\Desktop\PORTFOLIO\frontend"
Set-Location $frontendPath

# Check 1: node_modules directory
Write-Host "[1/5] Checking node_modules directory..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  ✓ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "  ✗ node_modules NOT FOUND" -ForegroundColor Red
    Write-Host "  → Run: npm install" -ForegroundColor Yellow
}
Write-Host ""

# Check 2: Vite package
Write-Host "[2/5] Checking Vite package..." -ForegroundColor Yellow
if (Test-Path "node_modules\vite") {
    Write-Host "  ✓ Vite package found" -ForegroundColor Green
    $viteVersion = Get-Content "node_modules\vite\package.json" | ConvertFrom-Json | Select-Object -ExpandProperty version
    Write-Host "  → Version: $viteVersion" -ForegroundColor Gray
} else {
    Write-Host "  ✗ Vite package NOT FOUND" -ForegroundColor Red
    Write-Host "  → Run: npm install vite --save-dev" -ForegroundColor Yellow
}
Write-Host ""

# Check 3: Vite binary/executable
Write-Host "[3/5] Checking Vite executable..." -ForegroundColor Yellow
if (Test-Path "node_modules\.bin\vite.cmd") {
    Write-Host "  ✓ Vite executable found" -ForegroundColor Green
} else {
    Write-Host "  ✗ Vite executable NOT FOUND" -ForegroundColor Red
    Write-Host "  → Run: npm install" -ForegroundColor Yellow
}
Write-Host ""

# Check 4: Test npx vite
Write-Host "[4/5] Testing Vite with npx..." -ForegroundColor Yellow
try {
    $viteVersionOutput = npx vite --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Vite is working!" -ForegroundColor Green
        Write-Host "  → $viteVersionOutput" -ForegroundColor Gray
    } else {
        Write-Host "  ✗ Vite command failed" -ForegroundColor Red
    }
} catch {
    Write-Host "  ✗ Could not run vite command" -ForegroundColor Red
    Write-Host "  → Error: $_" -ForegroundColor Gray
}
Write-Host ""

# Check 5: Check package.json
Write-Host "[5/5] Checking package.json configuration..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if ($packageJson.devDependencies.vite) {
    Write-Host "  ✓ Vite listed in devDependencies" -ForegroundColor Green
    Write-Host "  → Required version: $($packageJson.devDependencies.vite)" -ForegroundColor Gray
} else {
    Write-Host "  ✗ Vite not in package.json" -ForegroundColor Red
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$allChecks = @(
    (Test-Path "node_modules"),
    (Test-Path "node_modules\vite"),
    (Test-Path "node_modules\.bin\vite.cmd")
)

if ($allChecks -contains $false) {
    Write-Host "❌ Vite is NOT properly installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "To fix this, run:" -ForegroundColor Yellow
    Write-Host "  npm install" -ForegroundColor White
} else {
    Write-Host "✅ Vite appears to be installed correctly!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run:" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor White
}
Write-Host ""
