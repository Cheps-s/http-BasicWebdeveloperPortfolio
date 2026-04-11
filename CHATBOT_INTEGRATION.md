# Integration Guide - Adding Chatbot to Your Portfolio

## For HTML Websites

### 1. Copy Widget Files
Copy the chatbot folder to your project root directory.

### 2. Update index.html

Add this line in the `<head>` section:

```html
<!-- Chatbot Widget Styles -->
<link rel="stylesheet" href="chatbot/styles.css">
```

Add these lines before the closing `</body>` tag:

```html
<!-- Chatbot Widget -->
<div id="chatbot-widget"></div>
<script src="chatbot/widget.html"></script>
<script src="chatbot/script.js"></script>

<script>
  // Initialize chatbot (optional: customize settings)
  window.chatbot = new ChatbotWidget({
    apiUrl: "http://localhost:5001/api",  // Change to your API URL
    theme: "dark"  // "dark" or "light"
  });
</script>
```

### Example for Your index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- ... your existing head content ... -->
    
    <!-- Chatbot Widget Styles -->
    <link rel="stylesheet" href="chatbot/styles.css">
</head>
<body>
    <!-- Your existing content -->
    <div class="main-content">
        <!-- ... your portfolio content ... -->
    </div>
    
    <!-- Chatbot Widget -->
    <div id="chatbot-widget"></div>
    
    <!-- Your existing scripts -->
    <script src="path/to/your/scripts.js"></script>
    
    <!-- Chatbot Widget Scripts -->
    <script src="chatbot/widget.html"></script>
    <script src="chatbot/script.js"></script>
    
    <script>
      // Initialize chatbot when page loads
      window.chatbot = new ChatbotWidget({
        apiUrl: "http://localhost:5001/api",
        theme: "dark"
      });
    </script>
</body>
</html>
```

---

## For React Applications

### 1. Create Chatbot Component

Create `src/components/Chatbot.jsx`:

```jsx
import { useEffect } from 'react';
import '../../chatbot/styles.css';
import chatbotScript from '../../chatbot/script.js?raw';

export default function Chatbot() {
  useEffect(() => {
    // Create widget container
    const widgetHTML = `
      <div id="chatbot-widget">
        <button class="chat-button" id="chat-button" title="Open Chat">
          💬
        </button>
        <div class="chat-window" id="chat-window">
          <div class="chat-header">
            <div>
              <h3 class="chat-header-title">Chat Assistant</h3>
              <p class="chat-header-subtitle">Ask me anything!</p>
            </div>
            <div class="chat-header-actions">
              <button class="header-button theme-toggle" id="theme-toggle">🌙</button>
              <button class="header-button" id="close-button">✕</button>
            </div>
          </div>
          <div class="chat-messages" id="chat-messages">
            <div class="chat-empty-state">
              <div class="chat-empty-state-icon">👋</div>
              <div class="chat-empty-state-title">Welcome!</div>
              <div class="chat-empty-state-text">Ask me about skills, projects, or contact!</div>
            </div>
          </div>
          <div class="chat-input-area">
            <input type="text" class="chat-input" id="chat-input" placeholder="Type a message..." />
            <button class="send-button" id="send-button">➤</button>
          </div>
        </div>
      </div>
    `;
    
    // Inject widget if not already present
    if (!document.getElementById('chatbot-widget')) {
      document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }
    
    // Load chatbot script
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      ${chatbotScript}
      window.chatbot = new ChatbotWidget({
        apiUrl: "${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}",
        theme: "dark"
      });
    `;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup if needed
      const widget = document.getElementById('chatbot-widget');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return null;
}
```

### 2. Add to Your App

In `src/App.jsx`:

```jsx
import Chatbot from './components/Chatbot';
import './App.css';

export default function App() {
  return (
    <>
      <Chatbot />
      {/* Your portfolio content */}
      <div className="portfolio">
        {/* ... your components ... */}
      </div>
    </>
  );
}
```

### 3. Environment Variables

Create `.env` (or update existing):

```
VITE_API_URL=http://localhost:5001/api
```

For production:

```
VITE_API_URL=https://your-deployed-api.com/api
```

---

## For Next.js Applications

### 1. Create Chatbot Component

Create `components/Chatbot.jsx`:

```jsx
'use client';

import { useEffect } from 'react';
import '../../chatbot/styles.css';

export default function Chatbot() {
  useEffect(() => {
    const loadChatbot = async () => {
      // Dynamically load the widget HTML
      const response = await fetch('/chatbot/widget.html');
      const html = await response.text();
      
      const container = document.body;
      if (!document.getElementById('chatbot-widget')) {
        container.insertAdjacentHTML('beforeend', html);
      }
      
      // Load the script
      const script = document.createElement('script');
      script.src = '/chatbot/script.js';
      script.onload = () => {
        window.chatbot = new ChatbotWidget({
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
          theme: 'dark'
        });
      };
      document.body.appendChild(script);
    };
    
    loadChatbot();
  }, []);

  return null;
}
```

### 2. Add to Layout

In `app/layout.js`:

```jsx
import Chatbot from '@/components/Chatbot';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/chatbot/styles.css" />
      </head>
      <body>
        <Chatbot />
        {children}
      </body>
    </html>
  );
}
```

---

## Configuration Options

When initializing the chatbot, you can customize:

```javascript
new ChatbotWidget({
  // API endpoint
  apiUrl: "http://localhost:5001/api",
  
  // Theme: "dark" or "light"
  theme: "dark",
  
  // Additional options available for extension
});
```

---

## Production Deployment

### 1. Update API URL

For production, change the API URL to your deployed backend:

```javascript
new ChatbotWidget({
  apiUrl: "https://your-api-domain.com/api",
  theme: "dark"
});
```

### 2. Ensure CORS is Configured

The Flask backend already has CORS enabled, but verify in `app.py`:

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # This allows all origins
```

For production, restrict to specific domains:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://yourdomain.com"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})
```

### 3. Set Environment Variables

```bash
OPENAI_API_KEY=your-production-key
FLASK_ENV=production
```

---

## Testing Integration

### Local Testing

1. Start Flask server:
   ```bash
   cd chatbot
   python app.py
   ```

2. Open your website:
   ```bash
   http://localhost:3000  # or your dev server
   ```

3. Click the chat button and test functionality

### API Testing

```bash
# Test if backend is running
curl http://localhost:5001/api/chatbot/status

# Test chat endpoint
curl -X POST http://localhost:5001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hi", "history": []}'
```

---

## Troubleshooting

### Chatbot widget not appearing
- Check browser console for errors (F12)
- Verify files paths are correct
- Ensure styles.css is loaded

### Chatbot not responding
- Check Flask server is running: `http://localhost:5001/api/chatbot/status`
- Check browser console for CORS errors
- Verify OpenAI API key is set

### CORS errors
- Flask-CORS is installed and configured
- Check frontend URL matches allowed origins

---

## File Structure

After integration, your project should look like:

```
portfolio/
├── chatbot/
│   ├── app.py
│   ├── script.js
│   ├── styles.css
│   ├── widget.html
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   ├── start.bat (Windows)
│   └── start.sh (macOS/Linux)
├── src/
│   ├── components/
│   │   ├── Chatbot.jsx (or JSX file)
│   │   └── ...
│   └── App.jsx
├── index.html
├── CHATBOT_SETUP.md
├── CHATBOT_QUICKSTART.md
└── CHATBOT_INTEGRATION.md (this file)
```

---

**Next Step:** Configure your OpenAI API key in `.env` and start the server with `python chatbot/app.py`
