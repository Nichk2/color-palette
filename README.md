# ColorP — Fullstack Color Palette App

A fullstack app to discover, create, and manage beautiful color palettes. Frontend is built with Vite + React + TypeScript, and the backend is a lightweight Flask API.

## ✨ Features
- Browse curated palettes with tags and search
- Create your own palettes via an interactive builder
- One-click copy of hex codes and palette downloads
- Persistent local storage for favorites and settings
- Simple Flask backend ready for extension

## 🏗️ Tech Stack
- Frontend: React, TypeScript, Vite
- Styling: CSS (utility styles) + custom components
- Backend: Python, Flask, Flask-CORS
- Tooling: ESLint, TypeScript, Vite

## 📦 Project Structure
```
/ (repo root)
├─ backend/           # Flask API
│  ├─ app.py
│  └─ requirements.txt
├─ frontend/          # Vite + React + TS app
│  ├─ src/
│  │  ├─ components/  # UI components (Home, Collection, Create, etc.)
│  │  ├─ images/      # SVG assets
│  │  ├─ utils/       # helpers for downloads & storage
│  │  ├─ App.tsx, main.tsx, index.css
│  ├─ pages/          # Route-level pages
│  ├─ vite.config.ts
│  ├─ package.json
│  └─ tsconfig*.json
├─ package.json       # (optional root config)
└─ README.md
```

## 🚀 Quickstart

### Prereqs
- Node.js 18+
- Python 3.13+

### 1) Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
The dev server will start (typically at http://localhost:5173).

### 2) Backend (Flask API)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
The API will start at http://127.0.0.1:5000.

> Note: CORS is enabled via Flask-CORS. Adjust origins as needed for production.

## ⚙️ Environment
Optionally create a `.env` file (not committed) for any secrets or config you add later.

## 🧭 Available Scripts (Frontend)
- `npm run dev`: Start dev server
- `npm run build`: Production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🧪 API Endpoints (Starter)
The Flask app currently includes a placeholder root route. Extend `backend/app.py` with your endpoints, e.g. palettes CRUD, search, etc.

## 🖼️ Screens and Components
- Home: palette grid, tags, copy-to-clipboard
- Collection: saved/favorited palettes
- Create: interactive color tile builder and download

## 🔐 Security & Privacy
- No secrets are committed; use `.env` for local development
- Add validation and rate-limiting before exposing APIs publicly

## 📄 License
MIT — feel free to use and adapt.

## 🤝 Contributing
PRs and issues welcome. Please run lint/build before submitting.

## 📣 Acknowledgements
Built with React, Vite, and Flask. SVG assets included in `frontend/src/images/`.
\n\n[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)\n\n> After clicking, pick this repo. Render will use `render.yaml`.\n