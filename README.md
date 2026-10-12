# KAPETZ AI — Exotic Pet Care Assistant (Web Version)

A responsive, mobile-first web application built with **React**, **TypeScript**, and **Vite**, featuring scientific care sheets, AI chat, enclosure engineering guides, and care tracking for exotic pet keepers.

## 🦂 Brand Identity
- **Original KAPETZ Scorpion Logo:** Preserves the circular emblem, scorpion silhouette, and stylized KAPETZ wordmark.
- **Color Palette:** Dark Obsidian (`#090C12`), Dark Charcoal (`#101520`), Metallic Silver (`#E2E8F0`), and Electric Blue (`#00E5FF`).

## 🌐 Supported Languages
- English (EN)
- Filipino / Tagalog (TL) with instant bilingual switcher.

## 📂 Project Structure
```text
/web
├── index.html                   # HTML entry point with meta tags & fonts
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── tsconfig.node.json           # Vite node configuration
├── vite.config.ts               # Vite bundler configuration
├── vercel.json                  # Vercel static deployment rules
├── netlify.toml                 # Netlify static deployment rules
├── .env.example                 # Environment variables template
├── public/
│   ├── logo.jpg                 # Original KAPETZ scorpion emblem
│   └── hero.jpg                 # Terrarium panorama banner
└── src/
    ├── main.tsx                 # React entry point
    ├── App.tsx                  # Main application container & view routing
    ├── index.css                # Obsidian & electric-blue design system
    ├── types/
    │   └── index.ts             # TypeScript interfaces for species & care data
    ├── data/
    │   ├── speciesData.ts       # Scientific care sheets for all 4 categories
    │   └── guidesData.ts        # Enclosure guides & daily husbandry tasks
    ├── services/
    │   └── aiService.ts         # Secure server-side AI integration & fallback engine
    ├── utils/
    │   └── translations.ts      # English and Tagalog localization dictionaries
    └── components/
        ├── Navbar.tsx           # Brand navigation & language toggle
        ├── Footer.tsx           # Safety pledge & hosting instructions
        ├── VeterinaryDisclaimer.tsx # Medical & safety advisory
        ├── SpeciesCard.tsx      # Species card with microclimate stats
        ├── SpeciesDetailModal.tsx # Full 17-section care sheet modal
        ├── SpeciesCompare.tsx   # Side-by-side species comparison
        ├── EnclosureGuides.tsx  # Step-by-step equipment setup guides
        ├── CareChecklist.tsx    # Daily & weekly husbandry tasks
        ├── AiChatAssistant.tsx  # Interactive AI chat assistant with prompt chips
        └── MyPetsRegistry.tsx   # Local user pet registry & calculated alerts
```

## 🚀 How to Run Locally
1. Navigate into the web directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

## 📦 How to Build for Production
```bash
npm run build
```
This generates a production-ready, minified static distribution inside the `dist/` directory.

## 🌐 Free Static Hosting Options
- **Vercel:** Connect your GitHub repository and set the Root Directory to `web`. Output directory is `dist`.
- **Netlify:** Set Base directory to `web`, Build command to `npm run build`, and Publish directory to `dist`.
- **Cloudflare Pages / GitHub Pages:** Point build output to `dist`.

## 🔒 Secure Server-Side AI Architecture
API keys (`GEMINI_API_KEY`) are NEVER committed or packaged into client-side JavaScript. 
- In development/offline, a built-in verified exotic pet expert engine provides instant answers and emergency protocols.
- In production, set `VITE_AI_PROXY_URL` in `.env` to route through a serverless function (e.g. `/api/chat`) that calls the Gemini API securely server-side.
