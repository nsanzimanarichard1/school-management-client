@echo off
echo ========================================
echo School Management System - Setup
echo ========================================
echo.

echo [1/4] Setting up Client App...
cd client-app
copy .env.example .env
echo Environment file created for client-app
echo Installing dependencies...
call npm install
cd ..
echo.

echo [2/4] Setting up Admin App...
cd admin-app
copy .env.example .env
echo Environment file created for admin-app
echo Installing dependencies...
call npm install
cd ..
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To run the applications:
echo.
echo Client App (Port 5173):
echo   cd client-app
echo   npm run dev
echo.
echo Admin App (Port 5174):
echo   cd admin-app
echo   npm run dev
echo.
echo Don't forget to update the .env files with your backend API URL!
echo.
pause
