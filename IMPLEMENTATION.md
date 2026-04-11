# React Portfolio with Framer Motion Animations and Supabase Backend

## Overview

Your portfolio has been enhanced with:
- Framer Motion animations throughout the site
- Supabase database backend for visitor tracking, contact forms, and projects
- Custom React hooks for data management
- Reusable animated components
- Real-time visitor counting
- Database-driven project management

## Tech Stack

### Frontend
- React.js with Framer Motion for animations
- Tailwind CSS for styling
- Lucide React for icons
- Custom hooks for data fetching

### Backend
- Supabase (PostgreSQL database)
- Real-time visitor tracking
- Contact message storage
- Project management system

## Database Schema

### Tables Created

1. **visitors**
   - Tracks unique visits with IP and user agent
   - Public read/write access for tracking

2. **contact_messages**
   - Stores contact form submissions
   - Fields: name, email, message, read status
   - Public write, authenticated read

3. **projects**
   - Manages portfolio projects
   - Fields: title, description, image, URL, tags, category
   - Public read, authenticated write

## Key Features

### Animations

1. **Page Load Animations**
   - Navbar slides down from top
   - Hero content fades in with staggered delays
   - Sections reveal on scroll

2. **Interactive Elements**
   - Buttons scale on hover/tap
   - Cards lift and glow on hover
   - Icons rotate on hover
   - Smooth cursor tracking

3. **Background Effects**
   - Animated gradient orbs in hero
   - Pulsing status indicators
   - Smooth scroll animations

### Custom Hooks

1. **useVisitorTracking()**
   - Automatically tracks page visits
   - Returns visitor count
   - Stores in Supabase

2. **useProjects()**
   - Fetches projects from database
   - Loading states
   - Automatic ordering

### Reusable Components

1. **AnimatedSection**
   - Fade-in animation on scroll
   - Configurable delays

2. **AnimatedProjectCard**
   - Spring animations
   - Hover effects
   - Staggered tag animations

3. **ContactForm**
   - Form validation
   - Success/error states
   - Smooth transitions
   - Direct Supabase integration

## File Structure

```
src/
├── lib/
│   └── supabase.js          # Supabase client
├── hooks/
│   ├── useVisitorTracking.js
│   └── useProjects.js
├── components/
│   ├── AnimatedSection.jsx
│   ├── AnimatedProjectCard.jsx
│   └── ContactForm.jsx
└── App.jsx                   # Main application
```

## Environment Variables

Already configured in `.env`:
```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Animation Examples

### Cursor Animation
```jsx
<motion.div
  animate={{
    left: cursorPos.x - 10,
    top: cursorPos.y - 10,
    scale: mouseDown ? 0.8 : 1
  }}
  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
/>
```

### Card Hover
```jsx
<motion.div
  whileHover={{ y: -10, scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

### Scroll Reveal
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
/>
```

## Database Queries

### Track Visit
```javascript
await supabase.from('visitors').insert({
  ip_address: 'unknown',
  user_agent: navigator.userAgent
})
```

### Submit Contact Form
```javascript
await supabase.from('contact_messages').insert({
  name, email, message
})
```

### Fetch Projects
```javascript
const { data } = await supabase
  .from('projects')
  .select('*')
  .order('display_order', { ascending: true })
```

## Security Features

- Row Level Security (RLS) enabled on all tables
- Public can read projects and visitor count
- Public can submit contact messages
- Authenticated users can manage projects
- Secure API key handling through environment variables

## Performance Optimizations

- Spring animations for smooth physics
- Viewport-based scroll triggers (only animate when visible)
- Lazy loading for project images
- Optimized re-renders with proper dependencies

## Usage

1. Start development server:
```bash
npm run dev
```

2. The application will:
   - Track visitors automatically
   - Load projects from Supabase
   - Display real-time visitor count
   - Handle contact form submissions

## Future Enhancements

You can easily:
- Add authentication for admin panel
- Create project management interface
- View contact messages in admin dashboard
- Add analytics and charts
- Implement search and filtering
- Add project categories

## AI Chatbot Integration

### Overview
A floating AI chatbot widget has been integrated into the portfolio using OpenAI's GPT-3.5 Turbo model. The chatbot serves as Andrei's AI assistant, answering questions about his skills, projects, and how to contact him.

### Architecture

**Frontend (React Component)**
- Location: `src/components/Chatbot.jsx`
- Floating button that opens/closes chat widget
- Message display with typing animation
- Dark/light theme toggle
- Chat history per session
- Auto-scroll to latest message
- Error handling with API connection feedback

**Backend (Python Flask)**
- Location: `chatbot/app.py`
- Express.js server running on port 5001
- OpenAI API integration
- Conversation history management
- CORS enabled for frontend communication
- Health check endpoint: `GET /api/chatbot/status`
- Chat endpoint: `POST /api/chat`

### Key Features

1. **Personalized Responses**
   - System prompt includes Andrei's portfolio details
   - Knows about his skills: React, JavaScript, Python, Flask, Tailwind CSS, Three.js, etc.
   - Familiar with his projects: Chepsbook, AI Business Website, Parallax Portfolio
   - Can direct visitors to contact/hire sections

2. **Smart Conversation**
   - Maintains conversation history for context
   - Handles greetings, technical questions, and casual chat
   - Redirects to contact page for hiring inquiries
   - Admits knowledge limitations honestly

3. **User Experience**
   - Floating widget doesn't interfere with browsing
   - Smooth animations and transitions
   - Typing indicator while loading response
   - Theme matches portfolio (light/dark mode)
   - Responsive on mobile and desktop

4. **Error Handling**
   - Clear error messages if OpenAI API unavailable
   - Fallback responses if backend is offline
   - User-friendly guidance on reconnecting

### Setup Instructions

**Quick Start:**
```bash
cd chatbot
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# Create .env file with OPENAI_API_KEY
python app.py
```

**Detailed Instructions:** See `CHATBOT_QUICK_START.md`

**Full Setup Guide:** See `CHATBOT_BACKEND_SETUP.md`

### Environment Configuration

**Frontend (.env.local)**
```
VITE_CHATBOT_API=http://localhost:5001/api
```

**Backend (chatbot/.env)**
```
OPENAI_API_KEY=sk-your-api-key-here
FLASK_ENV=development
PORT=5001
```

### API Endpoints

**Health Check**
```
GET /api/chatbot/status
Response: {"status": "online"}
```

**Send Message**
```
POST /api/chat
Request: {
  "message": "What can you do?",
  "conversation_history": [...]
}
Response: {
  "role": "assistant",
  "content": "I'm Andrei's AI assistant..."
}
```

### Customization

To customize the chatbot's personality and knowledge:

1. Edit `chatbot/app.py`
2. Find the `PORTFOLIO_CONTEXT` variable
3. Update the system prompt with:
   - Personal introduction
   - Specific skills and technologies
   - Project details
   - Contact information
   - Response patterns and tone guidelines

Example:
```python
PORTFOLIO_CONTEXT = """
You are Andrei's AI Portfolio Assistant...
Skills: React, Python, JavaScript...
Projects: Chepsbook, AI Business Website...
"""
```

### File Structure

```
chatbot/
├── app.py                # Flask backend with OpenAI integration
├── requirements.txt      # Python dependencies
├── .env.example         # Environment variable template
├── .env                 # Actual (never commit this)
├── start.bat            # Windows startup script
├── start.sh             # Mac/Linux startup script
├── styles.css           # Chatbot widget styling
├── script.js            # Helper functions
└── widget.html          # Standalone widget template

src/components/
└── Chatbot.jsx          # React frontend component
```

### Dependencies

**Python:**
- flask==3.0.0 - Web framework
- flask-cors==4.0.0 - Cross-origin requests
- openai==1.3.0 - OpenAI API client
- python-dotenv==1.0.0 - Environment variables
- requests==2.31.0 - HTTP library

**JavaScript (already installed):**
- React hooks (useState, useEffect, useRef)
- Fetch API for HTTP requests

### Workflow

1. **User sends message** in React chatbot widget
2. **Frontend** sends POST request to `http://localhost:5001/api/chat`
3. **Backend** receives message, adds system prompt with portfolio context
4. **OpenAI API** generates personalized response
5. **Backend** returns response to frontend
6. **Frontend** displays message with typing animation
7. **Chat history** maintains context for multi-turn conversations

### Troubleshooting

**Chatbot Not Appearing**
- Check Chatbot.jsx is imported in App.jsx
- Verify `<Chatbot />` is rendered above closing `</main>` tag

**"Could not connect to backend" Error**
- Ensure Flask server is running: `python app.py`
- Check port 5001 is accessible
- Verify frontend env var: `VITE_CHATBOT_API=http://localhost:5001/api`

**OpenAI API Errors**
- Verify API key in `.env` is correct
- Check account has available credits
- Ensure network/firewall allows OpenAI connections

**Python "Module not found"**
- Activate virtual environment first
- Run `pip install -r requirements.txt`

For detailed help: See `CHATBOT_BACKEND_SETUP.md`

### Production Deployment

For deploying to production:
1. Use production WSGI server: `gunicorn app.py`
2. Set `FLASK_ENV=production`
3. Use environment variables from hosting provider
4. Update frontend URL to production backend address
5. Consider rate limiting and API key rotation

### Future Enhancements

- Add persistent chat history to Supabase
- Implement user authentication for saved conversations
- Add FAQ knowledge base for faster responses
- Create admin dashboard to view chat logs
- Add voice input/output capabilities
- Implement response caching for common questions
- Add sentiment analysis to improve responses

## Notes

- All animations use Framer Motion for consistency
- Database operations use Supabase client
- Form validation prevents empty submissions
- Loading states provide visual feedback
- Error handling with user-friendly messages
- Chatbot uses OpenAI API for intelligent, personalized responses
- Keep OpenAI API key secure (never commit to git)
- Flask server must be running for chatbot to work
