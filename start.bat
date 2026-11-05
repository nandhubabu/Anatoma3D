@echo off
echo ====================================================
echo Starting Anatoma3D Serverless Web Application...
echo ====================================================
cd /d "%~dp0\frontend"
npm run dev -- --host 127.0.0.1 --port 5173

