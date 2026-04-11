# Chatbot Backend Setup Guide

This guide walks you through setting up and running Andrei's AI chatbot backend powered by OpenAI.

## Prerequisites

- **Python 3.8+** installed on your system
- **OpenAI API Key** (get one at https://platform.openai.com/api/keys)
- The chatbot frontend already configured (Chatbot.jsx in React)

## Installation Steps

### 1. Install Python

**Windows:**
- Download from https://www.python.org/downloads/
- Run the installer and **CHECK** "Add Python to PATH"
- Verify installation:
  ```bash
  python --version
  ```

**Mac/Linux:**
```bash
# Using Homebrew (Mac)
brew install python3

# Or download from https://www.python.org/downloads/
```

### 2. Navigate to Chatbot Directory

```bash
cd c:\Users\nyl\Portfolio\chatbot
```

### 3. Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- `flask` - Web framework
- `flask-cors` - Cross-origin requests support
- `openai` - OpenAI API client
- `python-dotenv` - Environment variable management
- `requests` - HTTP library

### 5. Configure Environment Variables

**Create or update `.env` file in the chatbot directory:**

```env
OPENAI_API_KEY=sk-your-actual-key-here
FLASK_ENV=development
PORT=5001
```

**Important:** Never commit your `.env` file with real API keys to git!

### 6. Start the Flask Server

```bash
# From the chatbot directory with venv activated:
python .py
```

You should see output like:
```
 * Running on http://127.0.0.1:5001
 * Debug mode: on
```

The server is now running! The frontend will connect to it automatically.

## Verifying the Backend is Running

Open your browser and visit:
```
http://localhost:5001/api/chatbot/status
```

You should see a JSON response indicating the backend is online.

## Quick Start Scripts

**Windows (Quick Start):**
```bash
cd chatbot
start.bat
```

**Mac/Linux:**
```bash
cd chatbot
./start.sh
```

These scripts handle venv activation and startup automatically.

## Troubleshooting

### "ModuleNotFoundError: No module named 'flask'"
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again
- Check Python version: `python --version` (should be 3.8+)

### "OPENAI_API_KEY not found"
- Check that `.env` file exists in chatbot directory
- Verify the key format: `OPENAI_API_KEY=sk-...`
- Restart Flask server after adding the key

### "Address already in use on port 5001"
- Another process is using port 5001
- Either: 1) Close that process, or 2) Change PORT in .env to 5002, or 3) Run: `netstat -ano | findstr :5001` (Windows) to find the process

### Chatbot Says "Could Not Connect to Backend"
- Verify Flask server is running with `http://localhost:5001/api/chatbot/status`
- Check browser console for actual error message
- Ensure frontend `VITE_CHATBOT_API` env var is set to `http://localhost:5001/api`

### OpenAI API Returning 401 Error
- Check your API key is correct in `.env`
- Visit https://platform.openai.com/api/keys to verify the key is active
- Ensure you have credits/billing set up on OpenAI account

### Port 5001 Already in Use

Find what's using it:
```bash
# Windows:
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5001
kill -9 <PID>
```

## Architecture

```
Chatbot Flow:
┌─────────────────┐
│  React Browser  │ (Chatbot.jsx)
└────────┬────────┘
         │ POST /api/chat (message + history)
         ↓
┌─────────────────┐
│  Flask Backend  │ (.py)
│ + OpenAI API    │
└────────┬────────┘
         │ Returns AI response
         ↓
┌─────────────────┐
│  React Browser  │ (Display in UI)
└─────────────────┘
```

## Environment Variables Reference

**Frontend (.env.local):**
```env
VITE_CHATBOT_API=http://localhost:5001/api
```

**Backend (chatbot/.env):**
```env
OPENAI_API_KEY=sk-your-key
FLASK_ENV=development
PORT=5001
```

## API Endpoints

### Health Check
```
GET http://localhost:5001/api/chatbot/status
Response: {"status": "online"}
```

### Send Chat Message
```
POST http://localhost:5001/api/chat
Body: {
  "message": "What are your skills?",
  "conversation_history": []
}
Response: {
  "role": "assistant",
  "content": "Andrei's skilled in..."
}
```

## System Prompt Customization

The AI behavior is controlled by `PORTFOLIO_CONTEXT` in `.py`. To customize:

1. Open `chatbot/.py`
2. Find the `PORTFOLIO_CONTEXT` variable (starts around line 12)
3. Modify the prompt to reflect actual portfolio details:
   - Add your projects
   - Update skills list
   - Add real contact information
   - Adjust tone/personality

Example modification:
```python
PORTFOLIO_CONTEXT = """
You are Andrei's AI Assistant...
"""
```

The prompt includes guidelines for the AI on how to respond to different questions types.

## Next Steps

1. ✅ Install Python and dependencies
2. ✅ Configure OpenAI API key in .env
3. ✅ Start Flask server: `python .py`
4. ✅ Test in browser - chatbot should connect and respond
5. ✅ Customize system prompt if needed (see Customization section)
6. ✅ Deploy backend to production (see Deployment Guide)

## Production Deployment

For deploying the backend to production:

1. Use a production WSGI server: `gunicorn .py`
2. Set `FLASK_ENV=production`
3. Use environment variables from your hosting provider
4. Update frontend `VITE_CHATBOT_API` to point to production URL
5. Consider rate limiting and API key rotation strategies

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Flask output logs for detailed error messages
3. Verify OpenAI API status at https://status.openai.com
4. Check that your OpenAI account has available credits

---

**Remember:** Keep your `.env` file with real API keys private and never commit it to version control!
