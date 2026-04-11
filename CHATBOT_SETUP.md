# AI Chatbot for Portfolio - Setup Guide

## Overview

This chatbot provides an intelligent assistant that answers questions about your skills, projects, and contact information. It includes:

- **Frontend Widget**: Floating chat interface with smooth animations
- **Python Flask Backend**: AI-powered response engine using OpenAI
- **Dark/Light Mode**: Theme persistence with localStorage
- **Chat History**: Session-based conversation context
- **Responsive Design**: Works on mobile and desktop

## Project Structure

```
chatbot/
├── app.py              # Flask backend
├── requirements.txt    # Python dependencies
├── .env.example        # Environment template
├── script.js          # Frontend widget logic
├── styles.css         # Widget styling
└── widget.html        # Widget HTML structure
```

## Backend Setup

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation Steps

1. **Navigate to chatbot directory**
   ```bash
   cd chatbot
   ```

2. **Create a virtual environment** (optional but recommended)
   ```bash
   python -m venv venv
   # On Windows, activate with:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=sk-xxxxxxxxxxxx
     FLASK_ENV=development
     PORT=5001
     ```

5. **Run the Flask server**
   ```bash
   python app.py
   ```
   
   The server will start on `http://localhost:5001`

## Frontend Integration

### Option 1: Add to HTML Files

Add these three elements to your HTML `<head>` section:

```html
<!-- Add in <head> -->
<link rel="stylesheet" href="path/to/chatbot/styles.css">

<!-- Add before </body> -->
<div id="chatbot-widget"></div>
<script src="path/to/chatbot/widget.html"></script>
<script src="path/to/chatbot/script.js"></script>

<script>
  // Initialize chatbot with custom config (optional)
  window.chatbot = new ChatbotWidget({
    apiUrl: "http://localhost:5001/api",
    theme: "dark"  // or "light"
  });
</script>
```

### Option 2: For React Projects

1. **Create a React component** (`src/components/Chatbot.jsx`):

```jsx
import { useEffect } from 'react';
import '../../chatbot/styles.css';

export default function Chatbot() {
  useEffect(() => {
    // Load widget HTML
    const widgetHTML = `
      <div id="chatbot-widget">
        <button class="chat-button" id="chat-button" title="Open Chat">
          💬
        </button>
        <div class="chat-window" id="chat-window">
          <!-- ... rest of widget HTML from widget.html ... -->
        </div>
      </div>
    `;
    
    // Inject widget
    if (!document.getElementById('chatbot-widget')) {
      document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }
    
    // Load and initialize script
    const script = document.createElement('script');
    script.src = '../../chatbot/script.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  return null; // Widget renders to body
}
```

2. **Import in your main App component**:

```jsx
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div>
      <Chatbot />
      {/* Rest of your app */}
    </div>
  );
}
```

## API Endpoints

### POST `/api/chat`
Send a message and get AI response.

**Request:**
```json
{
  "message": "What are your main skills?",
  "history": [
    {"role": "user", "content": "Hi"},
    {"role": "assistant", "content": "Hello!"}
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": {
    "role": "assistant",
    "content": "I specialize in full-stack development..."
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

### GET `/api/chatbot/status`
Check if chatbot is online and configured.

**Response:**
```json
{
  "status": "online",
  "available": true,
  "timestamp": "2024-01-15T10:30:00"
}
```

## Customization

### System Prompt

Edit the `PORTFOLIO_CONTEXT` in `app.py` to customize the chatbot's personality and knowledge:

```python
PORTFOLIO_CONTEXT = """
You are an AI assistant for [Your Name]'s portfolio.
You can answer questions about:
1. Skills: Full-stack development, React, Python, etc.
2. Projects: [List your major projects]
3. Experience: [Brief background]
4. Contact: Get in touch at [contact info]
"""
```

### Styling

Customize colors and animations by editing the CSS variables in `styles.css`:

```css
:root {
  --primary-color: #a855f7;
  --secondary-color: #ec4899;
  --dark-bg: #0a0a0f;
  /* ... more colors ... */
}
```

### Frontend Configuration

When initializing, you can pass config options:

```javascript
new ChatbotWidget({
  apiUrl: "https://your-api.com/api",
  theme: "dark",  // "dark" or "light"
  // Add custom options as needed
});
```

## Features

### ✅ Implemented
- AI-powered responses using OpenAI API
- Floating widget in bottom-right corner
- Smooth open/close animations
- Typing indicator while loading
- Message bubble animations
- Dark/light theme toggle
- Chat history for current session
- Responsive mobile design
- Clean, modern UI
- Error handling

### 🎯 Optional Enhancements
- Store chat history in backend database
- User authentication
- Custom suggestion buttons
- File upload support
- Integration with Supabase (you already have it!)
- Analytics tracking
- Multi-language support

## Troubleshooting

### Issue: Chatbot not responding
- Check if Flask server is running on port 5001
- Verify OPENAI_API_KEY is set correctly
- Check browser console for CORS errors
- Verify API URL in script.js matches your server

### Issue: CORS errors
- Make sure Flask-CORS is installed
- Verify `flask_cors.CORS(app)` is in app.py
- Check that your frontend URL is allowed

### Issue: Styling not applying
- Verify styles.css path is correct
- Check for CSS conflicts with existing styles
- Use browser DevTools to inspect element styles

### Issue: OpenAI API errors
- Verify API key is valid: `curl https://api.openai.com/v1/models -H "Authorization: Bearer YOUR_KEY"`
- Check your OpenAI account has available credits
- Ensure you're not rate-limited

## Environment Variables

Create a `.env` file in the `chatbot/` directory:

```
# Required
OPENAI_API_KEY=sk-your-key-here

# Optional
FLASK_ENV=development
PORT=5001
FLASK_DEBUG=1
```

**Important**: Never commit `.env` to version control. Add to `.gitignore`:

```
chatbot/.env
chatbot/venv/
chatbot/__pycache__/
```

## Deployment

### Option 1: Deploy to Heroku

1. Create a `.gitignore`:
```
chatbot/.env
chatbot/venv/
chatbot/__pycache__/
*.pyc
```

2. Create `chatbot/Procfile`:
```
web: gunicorn app:app
```

3. Update `requirements.txt`:
```bash
pip install gunicorn
pip freeze > requirements.txt
```

4. Deploy:
```bash
heroku create your-chatbot-app
heroku config:set OPENAI_API_KEY=sk-your-key
git push heroku main
```

### Option 2: Deploy to Vercel/Netlify (Frontend Only)

For the frontend, use your existing Vercel/Netlify setup. Update the `apiUrl` to point to your deployed backend.

### Option 3: Deploy with Docker

Create `chatbot/Dockerfile`:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENV PORT=5001
CMD ["python", "app.py"]
```

Build and run:
```bash
docker build -t portfolio-chatbot .
docker run -p 5001:5001 -e OPENAI_API_KEY=your-key portfolio-chatbot
```

## Security Notes

1. **Never expose your OpenAI API key** in client-side code
2. **Always use environment variables** for secrets
3. **Validate and sanitize** user input on backend
4. **Consider rate limiting** to prevent API abuse
5. **Use HTTPS** in production
6. **Add authentication** if needed

## Testing

### Test Backend

```bash
# Test server is running
curl http://localhost:5001/api/chatbot/status

# Test chat endpoint
curl -X POST http://localhost:5001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hi", "history": []}'
```

### Test Frontend

1. Open your website in browser
2. Click the chat button in bottom-right
3. Type a message and send
4. Verify response appears

## Support & Issues

For issues or questions:
1. Check error messages in browser console (F12)
2. Check Flask server logs
3. Review OpenAI API documentation
4. Verify all dependencies are installed

## Next Steps

1. **Get OpenAI API Key**: https://platform.openai.com/api-keys
2. **Set up environment**: Copy `.env.example` to `.env`
3. **Start backend**: `python app.py`
4. **Add widget to website**: Copy HTML/CSS/JS includes
5. **Test locally**: Click chat button and send a message
6. **Customize**: Edit system prompt and styling
7. **Deploy**: Push to production

---

**Happy coding! 🚀**
