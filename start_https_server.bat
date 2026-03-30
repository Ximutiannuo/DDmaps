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
