# DDmaps Windows Server Setup Script
# Run as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DDmaps Windows Server Setup" -ForegroundColor Cyan
Write-Host "  Domain: wddmap.top" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check admin privileges
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: Please run as Administrator!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "[1/4] Configuring Windows Firewall..." -ForegroundColor Yellow

# Open port 80
$rule80 = Get-NetFirewallRule -DisplayName "DDmaps HTTP 80" -ErrorAction SilentlyContinue
if ($rule80) { Remove-NetFirewallRule -DisplayName "DDmaps HTTP 80" }
New-NetFirewallRule -DisplayName "DDmaps HTTP 80" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow | Out-Null
Write-Host "  Done: Port 80 opened" -ForegroundColor Green

# Open port 443
$rule443 = Get-NetFirewallRule -DisplayName "DDmaps HTTPS 443" -ErrorAction SilentlyContinue
if ($rule443) { Remove-NetFirewallRule -DisplayName "DDmaps HTTPS 443" }
New-NetFirewallRule -DisplayName "DDmaps HTTPS 443" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow | Out-Null
Write-Host "  Done: Port 443 opened" -ForegroundColor Green

# Open port 5000
$rule5000 = Get-NetFirewallRule -DisplayName "DDmaps Flask 5000" -ErrorAction SilentlyContinue
if ($rule5000) { Remove-NetFirewallRule -DisplayName "DDmaps Flask 5000" }
New-NetFirewallRule -DisplayName "DDmaps Flask 5000" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow | Out-Null
Write-Host "  Done: Port 5000 opened" -ForegroundColor Green

Write-Host ""
Write-Host "[2/4] Checking Python..." -ForegroundColor Yellow

$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Done: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "  ERROR: Python not installed" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "[3/4] Setting up virtual environment..." -ForegroundColor Yellow

$projectDir = "F:\map2\DDmaps-railway"
Set-Location $projectDir

if (-not (Test-Path ".venv")) {
    Write-Host "  Creating venv..." -ForegroundColor Gray
    python -m venv .venv
}
Write-Host "  Done: Virtual environment ready" -ForegroundColor Green

Write-Host "  Installing dependencies..." -ForegroundColor Gray
& ".\.venv\Scripts\pip.exe" install -r requirements.txt --quiet
& ".\.venv\Scripts\pip.exe" install waitress --quiet
Write-Host "  Done: Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "[4/4] Creating startup script..." -ForegroundColor Yellow

# Create batch file content
$batContent = @'
@echo off
cd /d F:\map2\DDmaps-railway
call .venv\Scripts\activate
echo ========================================
echo   DDmaps Server - wddmap.top
echo   URL: http://wddmap.top
echo   Press Ctrl+C to stop
echo ========================================
python -m waitress --host=0.0.0.0 --port=80 app:app
pause
'@

$batContent | Out-File -FilePath "start_server.bat" -Encoding ASCII
Write-Host "  Done: start_server.bat created" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Add DNS A record in Spaceship:" -ForegroundColor White
Write-Host "   Host: @    Value: 103.62.49.162" -ForegroundColor Yellow
Write-Host "   Host: www  Value: 103.62.49.162" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Run start_server.bat to start server" -ForegroundColor White
Write-Host ""
Write-Host "3. Visit http://wddmap.top to test" -ForegroundColor White
Write-Host ""
pause
