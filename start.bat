@echo off
echo Starting SmartSyllabus...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend...
start "Frontend" cmd /k "cd client && npm run dev"

echo.
echo SmartSyllabus is starting up!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
