@echo off
REM Portfolio Chatbot Startup Script
REM This script sets up and starts the Flask chatbot backend

cd /d "%~dp0"

echo ===============================================
echo   Portfolio AI Chatbot - Startup
echo ===============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo Virtual environment created!
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Check if .env file exists
if not exist ".env" (
    echo.
    echo WARNING: .env file not found!
    echo.
    echo Creating .env from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Edit .env and add your OpenAI API key:
    echo   OPENAI_API_KEY=sk-xxxxxxxxxxxxx
    echo.
    echo Then run this script again!
    pause
    exit /b 1
)

REM Install/upgrade dependencies
echo.
echo Installing dependencies...
pip install -q -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

REM Run the Flask app
echo.
echo ===============================================
echo   ✓ Starting Flask Server on port 5001
echo   ✓ Open: http://localhost:5001
echo   ✓ Press Ctrl+C to stop
echo ===============================================
echo.

python app.py
