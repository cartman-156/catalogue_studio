@echo off
rem serve-dist.bat - Serve the dist/ folder locally without npm or build steps

echo [Catalog Studio] - Serving dist/ locally

cd /d "%~dp0"

if not exist dist (
  echo Error: dist directory not found.
  echo Run a build first or copy your published files into dist\.
  pause
  exit /b 1
)

where python >nul 2>&1
if %errorlevel%==0 goto USE_PY

where py >nul 2>&1
if %errorlevel%==0 goto USE_PYEXE

echo No Python runtime found. Install Python or use another local static file server.
pause
exit /b 1

:USE_PY
echo Using Python http.server to serve dist/ on http://localhost:5000
start "" python -m http.server 5000 --directory "%~dp0dist"
timeout /t 2 >nul
start "" "http://localhost:5000"
exit /b 0

:USE_PYEXE
echo Using Python http.server via py.exe to serve dist/ on http://localhost:5000
start "" py -3 -m http.server 5000 --directory "%~dp0dist"
timeout /t 2 >nul
start "" "http://localhost:5000"
exit /b 0

