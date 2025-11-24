@echo off
echo ========================================
echo   Video Insight AI - Quick Start
echo ========================================
echo.

REM Check if backend virtual environment exists
if not exist "backend\venv\" (
    echo [INFO] Creating Python virtual environment...
    cd backend
    python -m venv venv
    call venv\Scripts\activate
    echo [INFO] Installing backend dependencies...
    pip install -r requirements.txt
    cd ..
) else (
    echo [OK] Backend virtual environment found
)

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing frontend dependencies...
    call npm install
) else (
    echo [OK] Frontend dependencies found
)

echo.
echo ========================================
echo Starting Video Insight AI...
echo ========================================
echo.
echo [1] Starting Backend Server (Flask on port 5000)...
echo.

REM Start backend in a new window
start "Video Insight AI - Backend" cmd /k "cd backend && venv\Scripts\activate && python app.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

echo [2] Starting Frontend Server (Vite on port 5173)...
echo.

REM Start frontend in a new window
start "Video Insight AI - Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to open the frontend in your browser...
pause > nul

REM Open browser
start http://localhost:5173

echo.
echo To stop the servers, close the terminal windows.
echo.
