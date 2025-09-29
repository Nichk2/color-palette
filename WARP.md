# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Architecture

**ColorP** is a fullstack color palette application with a React/TypeScript frontend and Flask API backend:

- **Frontend**: Vite + React 19 + TypeScript with TailwindCSS 4.x
- **Backend**: Python Flask API with CORS enabled 
- **Styling**: TailwindCSS with custom fonts (Jersey 10, Rethink Sans)
- **Animation**: Framer Motion for smooth transitions and interactions
- **Routing**: React Router v7 for client-side navigation
- **API Integration**: Custom API utilities with environment-based configuration

### Key Directories

```
/
├── backend/              # Flask API (Python 3.13+)
│   ├── app.py           # Main Flask application
│   └── requirements.txt # Python dependencies
├── frontend/            # Vite React app (Node 18+)
│   ├── src/            # Core app files (App.tsx, main.tsx, utils/)
│   ├── components/     # Reusable UI components by feature
│   ├── pages/          # Top-level page components
│   └── types/          # TypeScript type definitions
└── .github/workflows/  # CI/CD for GitHub Pages deployment
```

### Component Architecture

The frontend follows a feature-based component organization:
- `components/Home/` - Home page specific components (PaletteGrid, TagSection, etc.)
- `components/Collection/` - Collection management components
- `components/Create/` - Color palette creation tools
- `components/Footer/` - Shared footer component
- `components/SplashScreen/` - App loading/intro screen

## Common Development Tasks

### Frontend Development
```bash
cd frontend
npm install
npm run dev          # Start dev server (usually http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py        # Start Flask API on http://127.0.0.1:8001
```

### Full Development Setup
```bash
# Terminal 1 - Backend
cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python app.py

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
```

### Testing Individual Components
- Run single test file: *No test framework currently configured*
- Component testing: Use browser dev tools with `npm run dev`

## API Configuration

The Flask backend runs on port **8001** (not the standard 5000) and includes:
- `/api/tags` - Get popular color palette tags
- `/api/palettes?tag=<tag>` - Get palettes by tag
- `/api/palettes/trending` - Get trending palettes
- `/health` - Health check endpoint

The frontend API client (`src/utils/api.ts`) uses `VITE_API_URL` environment variable for backend URL configuration.

## Deployment

### Frontend (GitHub Pages)
- Automatic deployment via GitHub Actions on main branch push
- Uses `.github/workflows/deploy-pages.yml`
- Supports custom `VITE_API_URL` environment variable

### Backend Options
- Flask app configured for production deployment
- CORS enabled for cross-origin requests
- Ready for Railway, Render, or similar platform deployment

## Key Technical Details

### State Management
- React hooks for local state
- LocalStorage utilities in `src/utils/storage.ts` for persistence
- No global state management library (uses prop drilling)

### Styling System
- TailwindCSS 4.x with Vite plugin
- Custom color palette: Primary pink `#ff008a`, secondary grays
- Responsive design with mobile-first approach
- Custom scrollbar hiding with `tailwind-scrollbar-hide`

### Animation Framework
- Framer Motion for page transitions and component animations
- Custom floating animations in About page
- Splash screen with timed auto-hide functionality

### Type Safety
- Full TypeScript implementation
- Custom type definitions in `types/` directory
- Strict TypeScript configuration across frontend

## Environment Variables

### Frontend (.env in frontend/)
```
VITE_API_URL=http://127.0.0.1:8001  # Backend API URL
```

### Backend (.env in backend/)
```
# Optional: Add any Flask configuration here
```

## Browser Compatibility
- Modern browsers supporting ES2020+
- React 19 requires recent browser versions
- Mobile-responsive design tested on various screen sizes