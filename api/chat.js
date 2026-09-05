// api/chat.js - Vercel Serverless Function to handle Gemini Chat API requests

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('⚠️ GEMINI_API_KEY not set in environment variables');
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

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

  try {
    const { messages } = req.body;

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: (messages || []).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
    };

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
    return res.status(200).json({ reply });
  } catch (e) {
    console.error('❌ Server error:', e.message);
    return res.status(500).json({ error: 'Server error', details: e.message });
  }
}
