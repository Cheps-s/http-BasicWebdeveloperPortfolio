# Quick Start Guide - Portfolio AI Chatbot

## ⚡ 5-Minute Setup

### Step 1: Set Up Environment
```bash
cd chatbot
copy .env.example .env
# Edit .env and add your OpenAI API key
```

### Step 2: Install & Run Backend
```bash
pip install -r requirements.txt
python app.py
# Server runs on http://localhost:5001
```

### Step 3: Add to Your Website

**For HTML files:**
```html
<!-- In <head> -->
<link rel="stylesheet" href="path/to/chatbot/styles.css">

<!-- Before </body> -->
<div id="chatbot-widget"></div>
<script src="path/to/chatbot/widget.html"></script>
<script src="path/to/chatbot/script.js"></script>
```

**For React projects:**
```jsx
// In your main App component
import '../chatbot/styles.css';
import ChatbotWidget from './components/Chatbot';

export default function App() {
  return (
    <>
      <ChatbotWidget />
      {/* Your other components */}
    </>
  );
}
```

### Step 4: Test
1. Open your website in browser
2. Click the chat button (💬) in bottom-right
3. Type a message and send
4. See AI response appear!

## 🔧 Configuration

### Edit System Prompt
In `app.py`, customize `PORTFOLIO_CONTEXT`:
```python
PORTFOLIO_CONTEXT = """
You are an AI assistant for John Doe's portfolio.
Skills: React, Python, Node.js
Projects: [List your projects]
Contact: john@example.com
"""
```

### Change API Endpoint
In `script.js`, update `apiUrl`:
```javascript
new ChatbotWidget({
  apiUrl: "https://your-domain.com/api",
  theme: "dark"
});
```

### Customize Colors
In `styles.css`, edit CSS variables:
```css
:root {
  --primary-color: #a855f7;    /* Purple */
  --secondary-color: #ec4899;  /* Pink */
  --dark-bg: #0a0a0f;          /* Background */
}
```

## 📋 Checklist

- [ ] Created `.env` file with OpenAI API key
- [ ] Installed Python dependencies
- [ ] Flask server running on port 5001
- [ ] Added widget HTML/CSS/JS to website
- [ ] Customized system prompt
- [ ] Tested chatbot locally
- [ ] Set correct API endpoint URL

## 🆘 Troubleshooting

**Chatbot not responding?**
- Check Flask server is running
- Verify OpenAI API key is valid
- Check browser console (F12) for errors

**CORS errors?**
- Flask-CORS is already configured
- Make sure frontend and backend can communicate

**Styling issues?**
- Ensure styles.css path is correct
- Check for CSS conflicts

## 🚀 Next Steps

1. **Customize appearance**: Edit colors and fonts in styles.css
2. **Train on your knowledge**: Update system prompt in app.py
3. **Deploy backend**: Use Heroku, Railway, or your own server
4. **Deploy frontend**: Push to Vercel, Netlify, or GitHub Pages
5. **Monitor**: Add error logging and analytics

## 📚 Full Docs
See `CHATBOT_SETUP.md` for detailed documentation, API reference, and deployment guides.

---

**Questions?** Check the troubleshooting section in CHATBOT_SETUP.md
