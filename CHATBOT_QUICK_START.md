# Quick Start: Running the Chatbot Backend

## TL;DR - Fast Setup (2 minutes)

```bash
# 1. Navigate to chatbot folder
cd c:\Users\nyl\Portfolio\chatbot

# 2. Create virtual environment (first time only)
python -m venv venv

# 3. Activate virtual environment
venv\Scripts\activate

# 4. Install dependencies (first time only)
pip install -r requirements.txt

# 5. Create .env file with your OpenAI API key
# File: chatbot/.env
# Content:
# OPENAI_API_KEY=sk-your-actual-key-here
# FLASK_ENV=development
# PORT=5001

# 6. Run the server
python app.py
```

Done! Backend runs at `http://localhost:5001`

## Every Time You Start

```bash
cd c:\Users\nyl\Portfolio\chatbot
venv\Scripts\activate
python app.py
```

## Verify It's Working

Open browser: `http://localhost:5001/api/chatbot/status`

Should show: `{"status": "online"}`

## Stop the Server

Press `Ctrl+C` in the terminal

## Getting an OpenAI API Key

1. Visit https://platform.openai.com/api/keys
2. Click "Create new secret key"
3. Copy the key
4. Paste into `.env` file as: `OPENAI_API_KEY=sk-...`
5. Save and restart Flask

## Common Issues

| Problem | Solution |
|---------|----------|
| "python: command not found" | Python not installed or not in PATH. Reinstall from python.org and check "Add to PATH" |
| "No module named flask" | Activate venv first: `venv\Scripts\activate` |
| "Port 5001 already in use" | Change PORT in .env or kill process on that port |
| "Invalid API key" | Check .env has correct key format: `sk-...` |
| "Module not found" | Run `pip install -r requirements.txt` |

## What's Happening

1. **Frontend** (React) sends chat messages to backend at `http://localhost:5001/api/chat`
2. **Backend** (Flask) receives message, adds portfolio context, sends to OpenAI API
3. **OpenAI** returns personalized response about Andrei's portfolio
4. **Frontend** displays response in the chat widget

---

**For detailed setup help:** See `CHATBOT_BACKEND_SETUP.md`
