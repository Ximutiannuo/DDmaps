# Pack minimal files for JD Cloud deployment

$SourceDir = "f:\map2\DDmaps-railway"
$OutputZip = "f:\map2\jdcloud_deploy.zip"

if (Test-Path $OutputZip) {
    Remove-Item $OutputZip -Force
}

$TempDir = "$env:TEMP\jdcloud_deploy"
if (Test-Path $TempDir) {
    Remove-Item $TempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

Write-Host "Copying required files..." -ForegroundColor Cyan

$RequiredFiles = @(
    "app.py",
    "requirements.txt",
    "traffic_system.html",
    "driver.html",
    "default_map.dxf",
    "system_checkpoint.json",
    "travel_time_database.json"
)

$RequiredDirs = @(
    "backend",
    "css",
    "js"
)

foreach ($file in $RequiredFiles) {
    $src = Join-Path $SourceDir $file
    if (Test-Path $src) {
        Copy-Item $src -Destination $TempDir -Force
        Write-Host "  + $file" -ForegroundColor Green
    }
}

foreach ($dir in $RequiredDirs) {
    $src = Join-Path $SourceDir $dir
    if (Test-Path $src) {
        $dest = Join-Path $TempDir $dir
        Copy-Item $src -Destination $dest -Recurse -Force
        Get-ChildItem -Path $dest -Recurse -Directory -Filter "__pycache__" | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  + $dir/" -ForegroundColor Green
    }
}

Write-Host "Creating zip file..." -ForegroundColor Cyan
Compress-Archive -Path "$TempDir\*" -DestinationPath $OutputZip -Force

Remove-Item $TempDir -Recurse -Force

$zipSize = (Get-Item $OutputZip).Length / 1MB
Write-Host "Done! File: $OutputZip (Size: $([math]::Round($zipSize, 2)) MB)" -ForegroundColor Green
