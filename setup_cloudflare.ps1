# Cloudflare Tunnel 配置脚本
# 用于将内网服务器暴露到公网

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cloudflare Tunnel Setup" -ForegroundColor Cyan
Write-Host "  Domain: wddmap.top" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$cloudflaredDir = "C:\cloudflared"
$cloudflaredExe = "$cloudflaredDir\cloudflared.exe"

# Step 1: Download cloudflared
Write-Host ""
Write-Host "[1/3] Downloading cloudflared..." -ForegroundColor Yellow

if (-not (Test-Path $cloudflaredDir)) {
    New-Item -ItemType Directory -Path $cloudflaredDir -Force | Out-Null
}

if (-not (Test-Path $cloudflaredExe)) {
    $downloadUrl = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
    Write-Host "  Downloading from GitHub..." -ForegroundColor Gray
    try {
        Invoke-WebRequest -Uri $downloadUrl -OutFile $cloudflaredExe -UseBasicParsing
        Write-Host "  Done: cloudflared downloaded" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR: Failed to download" -ForegroundColor Red
        Write-Host "  Please download manually: $downloadUrl" -ForegroundColor Yellow
        pause
        exit 1
    }
} else {
    Write-Host "  Done: cloudflared already exists" -ForegroundColor Green
}

# Step 2: Login to Cloudflare
Write-Host ""
Write-Host "[2/3] Cloudflare Login..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  A browser window will open." -ForegroundColor Cyan
Write-Host "  Please login to your Cloudflare account" -ForegroundColor Cyan
Write-Host "  and authorize the domain: wddmap.top" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Press Enter to open browser..." -ForegroundColor Gray
pause

& $cloudflaredExe tunnel login

Write-Host ""
Write-Host "[3/3] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a tunnel:" -ForegroundColor White
Write-Host "   C:\cloudflared\cloudflared.exe tunnel create ddmaps" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Configure tunnel (run this command):" -ForegroundColor White
Write-Host "   C:\cloudflared\cloudflared.exe tunnel route dns ddmaps wddmap.top" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Run the tunnel:" -ForegroundColor White
Write-Host "   C:\cloudflared\cloudflared.exe tunnel run --url https://localhost:443 ddmaps" -ForegroundColor Yellow
Write-Host ""
pause
