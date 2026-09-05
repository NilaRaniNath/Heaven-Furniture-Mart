# Heaven Furniture Mart — "Design With Heaven"

An interactive, conversion-focused web application for **Heaven Furniture Mart**, a bespoke luxury furniture and interior styling brand based in Chattogram, Bangladesh. Built for the **RACDOX Hackathon**.

> "Furniture, Crafted Around You." — an online experience that feels less like an e-commerce shop, and more like stepping into a luxury interior design studio.

---

## 🪑 About Heaven Furniture Mart

Heaven Furniture Mart designs and crafts custom furniture — sofas, beds, dining sets, vanity units, wardrobes, and office pieces — built entirely around customer requirements, rather than mass production. Founded in 2020 by Managing Director **Abul Kalam Bhuiyan**, the brand operates from its showroom on Agrabad Access Road, Chattogram, and has grown into one of the city's leading bespoke furniture houses.

- **Founded:** 2020
- **Location:** Agrabad Access Road, Chattogram, Bangladesh
- **Contact:** +880 1960-481983 · heavenfurnituremart@gmail.com
- **Socials:** [Facebook](https://www.facebook.com/HeavenFurnitureMart) · [Instagram](https://www.instagram.com/heaven_furniture_ltd) · [YouTube](https://www.youtube.com/@HeavenFurnitureMart)

---

## ✨ Key Features & Highlights

### 🛍️ Dedicated Interactive `/collections` Catalog Page
A dedicated luxury products catalog page with comprehensive filter and sorting capabilities:
- **Category Bar:** Instant navigation cards for *Chairs, Sofas, Tables, Beds, and Dressing*.
- **Modern Product Cards:** Featuring fixed/discounted pricing (`$145.00` ~`$180.00`~), `NEW IN` / `ON SALE` badges, star ratings with review counts, and color swatches.
- **Advanced Filter Sidebar:** Filter products by availability (*In Stock*), product category, price range slider ($50–$1200), and color palette.
- **Quick View Modal & Pagination:** Detailed modal view for inspectable specifications and seamless pagination.

### 💖 Global Favorites / Wishlist Sync
- Click the Heart (Love) icon on any furniture card across Home or `/collections` page to add items to your personal wishlist.
- Real-time animated counter badge on the Navbar Heart icon.
- Instant top-layer **Saved Favorites Modal** to review saved items, request custom quotes, or clear favorites.

### 🎨 Bespoke Builder
A live 3-step interactive custom furniture configurator:
1. **Pick a Room** — Living Room, Bedroom, Dining, or Office & Study
2. **Pick a Style** — Modern Teak, Classic Walnut, Minimal Ivory, or Warm Natural Wood
3. **Pick a Scale** — Compact to Spacious via slider

Real-time concept moodboard rendering with direct WhatsApp consultation handoff (`wa.me`).

### 💬 Ask Heaven — AI Assistant (Gemini API)
A floating chatbot powered by **Google Gemini 3.6 Flash API** (via Vercel Serverless Function Proxy `/api/chat`), trained on real business facts to assist customers 24/7 with inquiries about teak materials, custom orders, showroom location, and pricing.

### 🎬 Motion & Responsive Aesthetics
- Smooth scroll-triggered Framer Motion entrance animations across all sections.
- Premium dark teal (`#122B2B`), warm ivory (`#F5EFE6`), and gold (`#B8925A`) palette.
- Custom SVG Royal Crown & Monogram logo favicon.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Routing | React Router DOM |
| State Management | React Context API (`FavoritesContext`) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| AI Chatbot | Google Gemini 3.6 Flash API |
| Backend Proxy | Vercel Serverless Functions (`/api/chat.js`) |
| Deployment | Vercel |

---

## 🎨 Design System

**Color Palette**

| Role | Name | Hex |
|---|---|---|
| Dark Background | Deep Charcoal-Teal | `#122B2B` |
| Light Background | Warm Ivory / Light Brown | `#F5EFE6` |
| Accent | Muted Gold / Brass | `#B8925A` |
| Body Text | Deep Brown | `#3A2A1E` |
| Badge Highlight | Emerald / Rose / Lime | `#10B981` / `#F43F5E` / `#A3E635` |

**Typography**
- Headlines: Playfair Display (Serif)
- Body / UI: Inter (Sans-serif)

---

## 📄 Routes & Page Architecture

- **`/` (Home Page):**
  1. Hero with Trust Marquee
  2. Brand Intro
  3. Why Choose Heaven
  4. Collections Bento Snapshot
  5. Bespoke Builder
  6. Social Proof & Ticker
  7. Final Call-To-Action
- **`/collections` (Full Catalog Page):**
  - Category Cards, Sidebar Filter Controls, Search, Sort & Product Grid
- **Global Components (Site-wide):**
  - Glassmorphic Navbar with Favorites Drawer & Counter Badge
  - Floating AI Chat Assistant (`Ask Heaven`)
  - Footer with Contact & Social Links

---

## 📁 Project Structure

```
├── api/
│   └── chat.js              → Vercel Serverless API Proxy for Gemini AI
├── assets/                  → High-res furniture product photos & media
├── public/                  → Static assets & custom favicon.svg
├── src/
│   ├── components/          → Navbar, Hero, Collections, CollectionsPage, BespokeBuilder, etc.
│   ├── context/             → FavoritesContext.jsx (Global wishlist state)
│   ├── data/                → productsData.js (Full furniture catalog data)
│   ├── hooks/               → useMotionConfig.js (Animation presets)
│   ├── App.jsx              → Main app with React Router routes
│   └── main.jsx             → Application entry point
├── vercel.json              → SPA & Serverless rewrite rules
└── package.json             → Dependencies & build scripts
```

---

## 🚀 Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/NilaRaniNath/Heaven-Furniture-Mart.git
   cd Heaven-Furniture-Mart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🏆 Built For

**RACDOX Hackathon** — Designed to demonstrate brand clarity within 30 seconds, an editorial luxury aesthetic, mobile-first responsiveness, and conversion-oriented interactive tools.

Developed by **Nila Rani Nath**.