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
