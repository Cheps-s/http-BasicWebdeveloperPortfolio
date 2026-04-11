#!/bin/bash
# Portfolio Chatbot Startup Script (macOS/Linux)

cd "$(dirname "$0")"

echo "==============================================="
echo "  Portfolio AI Chatbot - Startup"
echo "==============================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python from https://www.python.org"
    exit 1
fi

# Create virtual environment if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo "Virtual environment created!"
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo ""
    echo "WARNING: .env file not found!"
    echo ""
    echo "Creating .env from template..."
    cp .env.example .env
    echo ""
    echo "IMPORTANT: Edit .env and add your OpenAI API key:"
    echo "  OPENAI_API_KEY=sk-xxxxxxxxxxxxx"
    echo ""
    echo "Then run this script again!"
    exit 1
fi

# Install/upgrade dependencies
echo ""
echo "Installing dependencies..."
pip install -q -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

# Run the Flask app
echo ""
echo "==============================================="
echo "   ✓ Starting Flask Server on port 5001"
echo "   ✓ Open: http://localhost:5001"
echo "   ✓ Press Ctrl+C to stop"
echo "==============================================="
echo ""

python3 app.py
