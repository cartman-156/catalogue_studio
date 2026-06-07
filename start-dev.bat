@echo off
SET PATH=E:\Catalog_Studio\node-temp;%PATH%
echo Starting Catalog Studio dev server...
echo Open http://localhost:5173 in your browser.
cd /d E:\Catalog_Studio
call npm.cmd run dev
pause
