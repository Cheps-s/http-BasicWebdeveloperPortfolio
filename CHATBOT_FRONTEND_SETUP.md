# AI Chatbot Setup - Frontend Integration Complete ✅

Your React portfolio now includes the AI chatbot widget! Here's how to get the full system working.

## **Current Status**

✅ **Frontend**: Chatbot widget added to React app  
❌ **Backend**: Python Flask server needs to be set up  

---

## **Step 1: Install Python**

The Python Flask backend is NOT currently running because Python isn't installed.

### **Option A: Download Python Installer (Recommended for beginners)**

1. Go to [python.org](https://www.python.org/downloads/)
2. Click **"Download Python 3.11"** (or latest 3.x version)
3. Run the installer:
   - ✅ Check **"Add Python to PATH"** (important!)
   - Choose "Install Now" or customize installation
   - Click Install

4. **Verify installation**:
   ```bash
   python --version
   ```
   You should see: `Python 3.11.x` or similar

### **Option B: Using Windows Package Manager (Advanced)**

```bash
winget install Python.Python.3.11
```

---

## **Step 2: Start the Python Flask Backend**

Once Python is installed:

### **Method 1: Using the Startup Script (Easiest)**

In PowerShell (in the `c:\Users\nyl\Portfolio` directory):

```bash
cd chatbot
.\start.bat
```

You should see:
```
===============================================
   ✓ Starting Flask Server on port 5001
   ✓ Open: http://localhost:5001
   ✓ Press Ctrl+C to stop
===============================================
```

### **Method 2: Manual Setup**

```bash
cd chatbot

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env and add your OpenAI API key:
#   OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# Start the server
python app.py
```

---

## **Step 3: Get an OpenAI API Key**

The chatbot needs an OpenAI API key to generate responses.

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key
5. In `chatbot/.env`, add:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

---

## **Step 4: Test the Connection**

With both servers running:

1. **Frontend**: Open `http://localhost:5174` in your browser
2. **Backend**: Verify `http://localhost:5001/api/chatbot/status` returns `{"status": "online"}`
3. **Chatbot Button**: You should see a 💬 button in the bottom-right corner
4. **Click it and test**: Send a message like "What are your skills?"

---

## **Troubleshooting**

### **Chatbot button not appearing?**
- Refresh browser: **Ctrl+Shift+R**
- Check browser console: **F12** → Console tab
- Look for errors starting with "Failed to fetch"

### **"API error" message in chat?**
```
Possible causes:
1. Python Flask server not running
   → Start it with: cd chatbot && python app.py
   
2. Wrong OpenAI API key
   → Check chatbot/.env has valid OPENAI_API_KEY
   
3. CORS error
   → Flask-CORS is already configured, but verify server is running

4. Port 5001 in use
   → Kill process or change port in chatbot/app.py
```

### **Python not found?**
```
Error: "python is not recognized"
Solution: Python not installed or not in PATH
→ Reinstall Python and CHECK "Add Python to PATH"
→ Or add manually: https://docs.python.org/3/using/windows.html
```

### **No OpenAI responses?**
```
Check:
1. API key is valid: https://platform.openai.com/account/api-keys
2. Account has usage credits
3. Rate limit not exceeded: https://platform.openai.com/account/rate-limits
```

---

## **Running Both Servers Together**

You need **two separate terminal windows/tabs**:

### **Terminal 1: Frontend (Vite React)**
```bash
npm run dev
# Wait for: "VITE v7.3.1 ready in X ms"
```

### **Terminal 2: Backend (Python Flask)**
```bash
cd chatbot
python app.py
# Wait for: "Running on http://localhost:5001"
```

Then open: `http://localhost:5174` and test the chatbot!

---

## **Files Structure**

```
Portfolio/
├── src/
│   └── components/
│       └── Chatbot.jsx          ← React component (NEW)
│
├── chatbot/
│   ├── app.py                   ← Flask backend
│   ├── script.js                ← JS version (optional)
│   ├── styles.css               ← Shared styles
│   ├── widget.html              ← HTML version (optional)
│   ├── requirements.txt          ← Python dependencies
│   ├── .env.example             ← Template
│   ├── start.bat                ← Windows startup script
│   └── start.sh                 ← Mac/Linux startup script
│
└── .env.local                   ← Config (includes API URLs)
```

---

## **Environment Variables Reference**

### **.env.local (Frontend)**
```
VITE_CHATBOT_API=http://localhost:5001/api
```

### **chatbot/.env (Backend)**
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
FLASK_ENV=development
PORT=5001
FLASK_DEBUG=1
```

---

## **API Endpoints**

The Flask backend provides these endpoints:

### **POST /api/chat**
Send a message, get AI response
```bash
curl -X POST http://localhost:5001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hi",
    "history": []
  }'
```

### **GET /api/chatbot/status**
Check if backend is online
```bash
curl http://localhost:5001/api/chatbot/status
# Response: {"status": "online", "available": true}
```

---

## **Next Steps**

1. **Install Python** (if not already installed)
2. **Get OpenAI API key** from platform.openai.com
3. **Start both servers**:
   - Frontend: `npm run dev`
   - Backend: `cd chatbot && python app.py`
4. **Open** `http://localhost:5174` and test the chatbot!

---

## **Customization**

### **Change chatbot greeting**
Edit `src/components/Chatbot.jsx` → Line ~45 → Add welcome message

### **Change chatbot personality**
Edit `chatbot/app.py` → Search for `PORTFOLIO_CONTEXT` → Update the system prompt

### **Change colors**
Edit `src/components/Chatbot.jsx` → Update gradient colors (`#a855f7`, `#ec4899`, etc.)

---

## **Production Deployment**

For production:

1. **Get real Supabase credentials** and update `.env.local`
2. **Deploy Flask backend** to Heroku, Railway, or your own server
3. **Update VITE_CHATBOT_API** to production URL
4. **Set environment variables** on production server
5. **Test thoroughly** before going live

See `CHATBOT_SETUP.md` for full deployment guide.

---

**You're all set! The chatbot widget is ready. Just need to start the Python backend to enable AI responses.** 🚀
