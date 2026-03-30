# HTTPS Setup Script for wddmap.top
# Run as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  HTTPS Setup for wddmap.top" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: Run as Administrator!" -ForegroundColor Red
    pause
    exit 1
}

$projectDir = "F:\map2\DDmaps-railway"
$sslDir = "$projectDir\ssl"

# Create SSL directory
if (-not (Test-Path $sslDir)) {
    New-Item -ItemType Directory -Path $sslDir -Force | Out-Null
}

Write-Host ""
Write-Host "[1/3] Downloading win-acme (Let's Encrypt client)..." -ForegroundColor Yellow

$winAcmeDir = "C:\win-acme"
$winAcmeZip = "$env:TEMP\win-acme.zip"

if (-not (Test-Path $winAcmeDir)) {
    # Download win-acme
    $winAcmeUrl = "https://github.com/win-acme/win-acme/releases/download/v2.2.9.1701/win-acme.v2.2.9.1701.x64.pluggable.zip"
    
    Write-Host "  Downloading..." -ForegroundColor Gray
    try {
        Invoke-WebRequest -Uri $winAcmeUrl -OutFile $winAcmeZip -UseBasicParsing
        
        # Extract
        New-Item -ItemType Directory -Path $winAcmeDir -Force | Out-Null
        Expand-Archive -Path $winAcmeZip -DestinationPath $winAcmeDir -Force
        Remove-Item $winAcmeZip -Force
        Write-Host "  Done: win-acme installed to $winAcmeDir" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR: Failed to download win-acme" -ForegroundColor Red
        Write-Host "  Please download manually from: https://www.win-acme.com/" -ForegroundColor Yellow
    }
} else {
    Write-Host "  Done: win-acme already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/3] Generating SSL certificate..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  IMPORTANT: Make sure port 80 is accessible from internet!" -ForegroundColor Yellow
Write-Host "  The web server must be STOPPED during certificate generation." -ForegroundColor Yellow
Write-Host ""

# Check if certificate already exists
$certFile = "$sslDir\wddmap.top.pem"
$keyFile = "$sslDir\wddmap.top-key.pem"

if ((Test-Path $certFile) -and (Test-Path $keyFile)) {
    Write-Host "  SSL certificate already exists!" -ForegroundColor Green
} else {
    Write-Host "  Running win-acme to get certificate..." -ForegroundColor Gray
    Write-Host ""
    
    # Run win-acme
    $wacs = "$winAcmeDir\wacs.exe"
    if (Test-Path $wacs) {
        # Create certificate with manual mode
        & $wacs --target manual --host wddmap.top,www.wddmap.top --store pemfiles --pemfilespath $sslDir --accepttos --emailaddress admin@wddmap.top
    } else {
        Write-Host "  ERROR: wacs.exe not found" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "[3/3] Creating HTTPS startup script..." -ForegroundColor Yellow

# Create Python HTTPS server script
$httpsServerScript = @'
# HTTPS Server for DDmaps
# Uses waitress with a reverse proxy approach

import ssl
import os
from waitress import serve
from app import app

# SSL Certificate paths
SSL_DIR = r"F:\map2\DDmaps-railway\ssl"
CERT_FILE = os.path.join(SSL_DIR, "wddmap.top-chain.pem")
KEY_FILE = os.path.join(SSL_DIR, "wddmap.top-key.pem")

if __name__ == "__main__":
    print("=" * 50)
    print("  DDmaps HTTPS Server")
    print("  URL: https://wddmap.top")
    print("=" * 50)
    
    # Check if SSL files exist
    if os.path.exists(CERT_FILE) and os.path.exists(KEY_FILE):
        print(f"Using SSL certificate: {CERT_FILE}")
        # Note: waitress doesn't support SSL directly
        # We'll use werkzeug's built-in SSL support for development
        # For production, use nginx or IIS as reverse proxy
        app.run(
            host="0.0.0.0",
            port=443,
            ssl_context=(CERT_FILE, KEY_FILE),
            threaded=True
        )
    else:
        print("WARNING: SSL certificates not found!")
        print(f"Expected: {CERT_FILE}")
        print(f"Expected: {KEY_FILE}")
        print("\nFalling back to HTTP on port 80...")
        serve(app, host="0.0.0.0", port=80)
'@

$httpsServerScript | Out-File -FilePath "$projectDir\run_https.py" -Encoding UTF8
Write-Host "  Done: run_https.py created" -ForegroundColor Green

# Create startup batch file
$batContent = @'
@echo off
cd /d F:\map2\DDmaps-railway
call .venv\Scripts\activate
echo ========================================
echo   DDmaps HTTPS Server - wddmap.top
echo   URL: https://wddmap.top
echo   Press Ctrl+C to stop
echo ========================================
python run_https.py
pause
'@

$batContent | Out-File -FilePath "$projectDir\start_https_server.bat" -Encoding ASCII
Write-Host "  Done: start_https_server.bat created" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  HTTPS Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Stop any running HTTP server (Ctrl+C)" -ForegroundColor White
Write-Host "2. Run start_https_server.bat" -ForegroundColor White
Write-Host "3. Visit https://wddmap.top" -ForegroundColor White
Write-Host ""
Write-Host "If certificate generation failed:" -ForegroundColor Yellow
Write-Host "  Run: C:\win-acme\wacs.exe" -ForegroundColor Gray
Write-Host "  Follow the interactive prompts" -ForegroundColor Gray
Write-Host ""
pause
