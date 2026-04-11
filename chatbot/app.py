import os
import httpx
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
from datetime import datetime
from typing import List, Dict, Any, cast

load_dotenv()

app = Flask(__name__)

# FIX: Allow all origins in development (restrict in production)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # Change to specific origin in production
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
# Initialize Groq client
api_key = os.getenv("GROQ_API_KEY", "")
if not api_key:
    print("⚠️  WARNING: GROQ_API_KEY not found in environment variables!")
    
client = Groq(api_key=api_key) if api_key else None

# Portfolio context for the AI
PORTFOLIO_CONTEXT = """
You are NylzTech's AI Portfolio Assistant representing Andrei Nyl Manliclic.

ABOUT ANDREI:
- BSIT student at STI College Malolos, preparing for graduation
- Full-stack developer with passion for modern web technologies
- Currently completing work immersion

TECHNICAL SKILLS:
- Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS, Framer Motion
- Backend: Node.js, Python, Flask, Express
- Programming: Python, C#, JavaScript
- Tools: Git, VS Code, Vite, npm
- Databases: Supabase, MongoDB

PROJECTS:
1. AnimeBook - Anime tracking app featuring Demon Slayer, Naruto, My Hero Academia, Chainsaw Man
2. Chepsbook - Social media style website with modern layout
3. C# Snake Game - Classic snake game built with C#
4. Parallax Portfolio - Interactive portfolio with parallax scrolling effects

PERSONA:
- Professional yet friendly and enthusiastic
- Concise responses (2-3 sentences max)
- Direct visitors to Contact section for hiring inquiries
- If asked about unrelated topics, politely redirect to portfolio topics

CONTACT:
- Encourage visitors to use the Contact section or "Hire Me" button
- Andrei is available for freelance projects and collaborations
"""

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        user_message = data.get("message", "").strip()
        history = data.get("history", [])

        if not user_message:
            return jsonify({"error": "Message is required"}), 400

        if not client:
            return jsonify({
                "success": False,
                "error": "AI service not configured. Check GROQ_API_KEY."
            }), 503

        # Build conversation messages
        messages = [{"role": "system", "content": PORTFOLIO_CONTEXT}]
        
        # Add history (limit to last 10 messages)
        for msg in history[-10:]:
            messages.append({
                "role": msg.get("role", "user"), 
                "content": msg.get("content", "")
            })
        
        # Add current message
        messages.append({"role": "user", "content": user_message})

        # Call Groq API
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=cast(Any, messages),
            max_tokens=200,
            temperature=0.7,
            top_p=0.9,
        )

        content = completion.choices[0].message.content or ""
        
        return jsonify({
            "success": True,
            "response": {
                "role": "assistant",
                "content": content.strip()
            },
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/api/chatbot/status", methods=["GET"])
def status():
    return jsonify({
        "status": "online" if client else "offline",
        "engine": "Groq/Llama3-8B",
        "api_key_loaded": bool(api_key),
        "timestamp": datetime.now().isoformat()
    })

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    print(f"🚀 NylzTech AI Server running on http://localhost:{port}")
    print(f"🤖 Groq API Key loaded: {'Yes' if api_key else 'No'}")
    app.run(host="0.0.0.0", port=port, debug=True)