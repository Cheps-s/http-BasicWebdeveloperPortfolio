const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
async function initData() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ 
      visitors: 0, 
      messages: [],
      visits: []
    }));
  }
}

// Get visitor count
app.get('/api/visitors', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    res.json({ count: data.visitors });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read visitor count' });
  }
});

// Track visit
app.post('/api/visit', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    data.visitors += 1;
    data.visits.push({
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, count: data.visitors });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    data.messages.push({
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });
    
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    // Here you could also send email notifications
    console.log(`New message from ${name} (${email}): ${message}`);
    
    res.json({ success: true, message: 'Message received' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get all messages (for admin purposes - add authentication in production)
app.get('/api/messages', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    res.json(data.messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read messages' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
initData().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API Endpoints:`);
    console.log(`   GET  /api/visitors  - Get visitor count`);
    console.log(`   POST /api/visit     - Track new visit`);
    console.log(`   POST /api/contact   - Submit contact form`);
    console.log(`   GET  /api/health    - Health check`);
  });
});