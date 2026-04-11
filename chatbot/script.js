class ChatbotWidget {
  constructor(config = {}) {
    this.config = {
      apiUrl: config.apiUrl || "http://localhost:5001/api",
      theme: config.theme || "dark",
      ...config,
    };

    this.state = {
      isOpen: false,
      isLoading: false,
      messages: [],
      theme: this.config.theme,
    };

    this.elements = {};
    this.init();
  }

  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.loadTheme();
    this.checkChatbotStatus();
  }

  cacheElements() {
    this.elements = {
      widget: document.getElementById("chatbot-widget"),
      chatButton: document.getElementById("chat-button"),
      chatWindow: document.getElementById("chat-window"),
      closeButton: document.getElementById("close-button"),
      chatMessages: document.getElementById("chat-messages"),
      chatInput: document.getElementById("chat-input"),
      sendButton: document.getElementById("send-button"),
      themeToggle: document.getElementById("theme-toggle"),
    };
  }

  attachEventListeners() {
    this.elements.chatButton.addEventListener("click", () => this.toggleChat());
    this.elements.closeButton.addEventListener("click", () => this.closeChat());
    this.elements.sendButton.addEventListener("click", () => this.sendMessage());
    this.elements.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    this.elements.themeToggle.addEventListener("click", () => this.toggleTheme());
  }

  toggleChat() {
    if (this.state.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    this.state.isOpen = true;
    this.elements.chatWindow.classList.add("active");
    this.elements.chatButton.classList.add("open");
    this.elements.chatInput.focus();

    if (this.state.messages.length === 0) {
      this.addWelcomeMessage();
    }
  }

  closeChat() {
    this.state.isOpen = false;
    this.elements.chatWindow.classList.remove("active");
    this.elements.chatButton.classList.remove("open");
  }

  toggleTheme() {
    this.state.theme = this.state.theme === "dark" ? "light" : "dark";
    this.applyTheme();
    localStorage.setItem("chatbot-theme", this.state.theme);
    this.updateThemeIcon();
  }

  applyTheme() {
    const root = document.documentElement;
    root.setAttribute("data-theme", this.state.theme);
  }

  loadTheme() {
    const saved = localStorage.getItem("chatbot-theme");
    if (saved) {
      this.state.theme = saved;
      this.applyTheme();
    }
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const icon = this.state.theme === "dark" ? "☀️" : "🌙";
    this.elements.themeToggle.textContent = icon;
  }

  addWelcomeMessage() {
    this.addMessage(
      "Hello! 👋 I'm your portfolio assistant. I can help you learn about the developer's skills, projects, and how to connect with them. What would you like to know?",
      "assistant"
    );
  }

  addMessage(content, role) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}`;
    messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;

    // Clear empty state if first real message
    if (this.state.messages.length === 0 && role === "assistant") {
      const emptyState = this.elements.chatMessages.querySelector(".chat-empty-state");
      if (emptyState) {
        emptyState.remove();
      }
    }

    this.elements.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();

    this.state.messages.push({ role, content });
  }

  addTypingIndicator() {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message assistant";
    messageDiv.id = "typing-indicator";
    messageDiv.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    this.elements.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  async sendMessage() {
    const message = this.elements.chatInput.value.trim();

    if (!message) {
      return;
    }

    // Clear input
    this.elements.chatInput.value = "";

    // Add user message
    this.addMessage(message, "user");

    // Set loading state
    this.state.isLoading = true;
    this.elements.sendButton.disabled = true;
    this.elements.chatInput.disabled = true;

    // Show typing indicator
    this.addTypingIndicator();

    try {
      // Send to backend
      const response = await fetch(`${this.config.apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: this.state.messages.filter((m) => m.role !== "assistant" || m.content),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.response) {
        this.removeTypingIndicator();
        this.addMessage(data.response.content, "assistant");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      this.removeTypingIndicator();
      this.addMessage(
        "Sorry, I encountered an error. Please try again or contact the developer directly.",
        "assistant"
      );
    } finally {
      this.state.isLoading = false;
      this.elements.sendButton.disabled = false;
      this.elements.chatInput.disabled = false;
      this.elements.chatInput.focus();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
    }, 0);
  }

  async checkChatbotStatus() {
    try {
      const response = await fetch(`${this.config.apiUrl}/chatbot/status`);
      const data = await response.json();
      if (!data.available) {
        console.warn("Chatbot API not fully configured");
      }
    } catch (error) {
      console.warn("Could not connect to chatbot backend:", error.message);
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  clearHistory() {
    this.state.messages = [];
    this.elements.chatMessages.innerHTML = `
      <div class="chat-empty-state">
        <div class="chat-empty-state-icon">👋</div>
        <div class="chat-empty-state-title">Welcome!</div>
        <div class="chat-empty-state-text">
          Ask me about my skills, projects, or how to get in touch!
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.chatbot = new ChatbotWidget({
      apiUrl: "http://localhost:5001/api",
      theme: "dark",
    });
  });
} else {
  window.chatbot = new ChatbotWidget({
    apiUrl: "http://localhost:5001/api",
    theme: "dark",
  });
}
