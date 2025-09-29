# Color Palette App - GitHub Pages Deployment

## 🚀 Live Demo
**Frontend (Static)**: `https://nichk2.github.io/color-palette`  
**Backend (API)**: `https://your-backend-url.railway.app`

## 📋 Important: Static vs Fullstack Architecture

### GitHub Pages Limitation
GitHub Pages **only serves static files** (HTML, CSS, JavaScript). It cannot run server-side code like Python Flask applications.

### How This App Works
This is a **fullstack application** split into two parts:

#### 🎨 Frontend (Static - Hosted on GitHub Pages)
- **Technology**: React + TypeScript + Vite
- **Hosting**: GitHub Pages (Free)
- **Purpose**: User interface, client-side logic
- **Features**: 
  - Browse color palettes
  - Interactive UI components
  - Responsive design
  - Client-side state management

#### 🔧 Backend (Dynamic - Hosted Separately)
- **Technology**: Python Flask
- **Hosting**: Railway/Render/Heroku (Paid service)
- **Purpose**: API server, data processing
- **Features**:
  - Color palette generation
  - External API integration (Coolors)
  - Data processing and algorithms
  - RESTful API endpoints

### Architecture Diagram
```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐
│   GitHub Pages  │ ──────────────────► │   Backend API   │
│   (Frontend)    │ ◄────────────────── │   (Railway)     │
│   Static Files  │    JSON Responses   │   Flask Server  │
└─────────────────┘                     └─────────────────┘
```

## 🔧 Deployment Status

### ✅ Frontend (GitHub Pages)
- [x] GitHub Actions workflow configured
- [x] Vite build process optimized
- [x] Static file serving ready
- [x] Environment variables set up

### ⏳ Backend (External Hosting)
- [ ] Deploy to Railway/Render/Heroku
- [ ] Update API URL in frontend
- [ ] Test API connectivity

## 🚀 Quick Start

### For Users
1. Visit the GitHub Pages URL above
2. The app will load the static frontend
3. API calls will be made to the backend server
4. If backend is not deployed, you'll see mock data

### For Developers
1. **Frontend Development**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend Development**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python app.py
   ```

## 🔗 API Endpoints

The backend provides these endpoints:
- `GET /api/tags` - Popular color tags
- `GET /api/palettes?tag={tag}` - Palettes by tag
- `GET /api/palettes/trending` - Trending palettes
- `GET /api/palette/{id}` - Specific palette details
- `GET /health` - Health check

## 🛠️ Deployment Process

### 1. Frontend (Automatic)
- Push code to `main` branch
- GitHub Actions automatically builds and deploys
- Available at GitHub Pages URL

### 2. Backend (Manual Setup Required)
1. Choose hosting platform (Railway recommended)
2. Connect GitHub repository
3. Deploy using provided config files
4. Update frontend environment variables
5. Test full integration

## 📁 Project Structure
```
my-fullstack-app/
├── frontend/                 # React app (→ GitHub Pages)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Flask API (→ External hosting)
│   ├── app.py
│   ├── requirements.txt
│   └── venv/
├── .github/workflows/        # GitHub Actions
│   └── deploy.yml
├── railway.toml             # Railway deployment config
├── render.yaml              # Render deployment config
└── Procfile                 # Heroku deployment config
```

## ⚠️ Important Notes

1. **Static Limitation**: GitHub Pages cannot run Python/Node.js servers
2. **CORS**: Backend must allow cross-origin requests from GitHub Pages
3. **Environment**: Frontend needs correct API URL for production
4. **Cost**: Backend hosting requires a paid service (Railway/Render/Heroku)

## 🔧 Troubleshooting

### Frontend Issues
- Check GitHub Actions logs for build errors
- Verify `vite.config.ts` base path matches repository name
- Ensure all dependencies are in `package.json`

### Backend Issues
- Verify hosting platform deployment logs
- Check CORS configuration in Flask app
- Test API endpoints directly

### Integration Issues
- Verify API URL in frontend environment variables
- Check browser network tab for failed requests
- Ensure backend is accessible from GitHub Pages domain

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify backend deployment status
3. Test API endpoints independently
4. Review browser console for errors

---

**Remember**: This is a **static frontend** + **dynamic backend** architecture. GitHub Pages handles the UI, while a separate service handles the API logic.