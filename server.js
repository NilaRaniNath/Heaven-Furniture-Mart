// server.js - Express backend to proxy Gemini API calls securely (ESM)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('⚠️  GEMINI_API_KEY not set in .env');
  process.exit(1);
}

// System prompt defining the assistant's behavior
const SYSTEM_PROMPT = `You are a friendly, professional customer support assistant for Heaven Furniture Mart, a bespoke luxury furniture and interior styling brand based in Chattogram, Bangladesh.

Key facts about Heaven Furniture Mart:
- Specializes in bespoke, handcrafted solid wood furniture
- Categories: Living Room, Bedroom, Dining, Office, Outdoor
- Offers custom design through the "Bespoke Builder" feature on the website
- Contact: WhatsApp/Phone +880 1960-481983
- Location: Chattogram, Bangladesh
- Known for premium quality craftsmanship and personalized interior styling

Rules:
- Answer only about Heaven Furniture Mart's products, services, and related queries
- Redirect unrelated queries politely back to furniture topics
- Keep answers short (2-4 sentences max)
- Be warm, welcoming, and professional
- Encourage users to use the Bespoke Builder or contact via WhatsApp/phone when appropriate`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body; // array of {role, content}

    // Build Gemini request payload with systemInstruction
    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
    };

    console.log('📤 Sending request to Gemini API...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('❌ Gemini API error:', response.status, err);
      return res.status(500).json({ error: 'Gemini API error', details: err });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    console.log('✅ Got reply:', reply.substring(0, 80) + '...');
    res.json({ reply });
  } catch (e) {
    console.error('❌ Server error:', e.message);
    res.status(500).json({ error: 'Server error', details: e.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: 'gemini-3.6-flash' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Chat backend listening on http://localhost:${PORT}`);
  console.log(`🔑 API Key loaded: ${GEMINI_API_KEY.substring(0, 8)}...`);
});
