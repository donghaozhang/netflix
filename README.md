# Netflix Clone Application - "QURIOSITY"

A full-stack Netflix-style streaming application with React frontend and FastAPI backend, featuring **real movie data from The Movie Database (TMDB)** and enhanced UI components.

## 🎬 Latest Features (v2.0 - Quriosity Update)

### 🌟 **NEW: TMDB API Integration**
- **Real Movie Data**: Fetches trending, popular, and top-rated movies from The Movie Database
- **Dynamic Categories**: Action, Comedy, Horror, and Pokemon-themed collections
- **Live Search**: Real-time movie search with TMDB integration
- **Movie Details**: Rich movie information with ratings, release dates, and overviews
- **Poster Images**: High-quality movie posters and backdrop images

### 🎨 **Enhanced UI Components**
- **"QURIOSITY" Branding**: Updated header with modern Netflix-style design
- **Hero Banner**: Large featured movie banner with play/info buttons
- **Movie Modals**: Detailed movie information popups with trailer support
- **Smooth Scrolling**: Horizontal movie carousels with navigation arrows
- **Search Interface**: Beautiful search functionality with grid layout results
- **Loading States**: Professional loading spinners and animations

### 🎮 **Pokemon Special Content**
- **Pokemon Movies**: Curated collection of Pokemon films and series
- **Mixed Content**: Pokemon content integrated with trending movies
- **Custom Images**: Fallback images for Pokemon and other content

## 🏗️ Project Architecture

This is a **full-stack web application** with the following structure:

```
netflix/
├── frontend/          # React application (Port 3000)
│   ├── src/
│   │   ├── App.js     # Main app with TMDB integration
│   │   ├── components.js # UI components (Header, Banner, Cards, Modals)
│   │   └── App.css    # Tailwind + custom styling
├── backend/           # FastAPI Python server (Port 8001)
├── scripts/           # Deployment and utility scripts
├── tests/             # Test files
├── .cursor/rules/     # AI Assistant navigation rules
├── .devcontainer/     # VS Code development container config
├── .emergent/         # Project management files
├── Dockerfile         # Container configuration
├── docker-compose.yml # Multi-service orchestration
└── requirements.txt   # Python dependencies
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19.0.0
- **Routing**: React Router DOM 7.5.1
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion 12.15.0
- **HTTP Client**: Axios 1.8.4
- **Video Player**: React YouTube 10.1.0
- **API Integration**: The Movie Database (TMDB) API v3
- **Build Tool**: Create React App (react-scripts 5.0.1)

### Backend
- **Framework**: FastAPI 0.110.1
- **Server**: Uvicorn 0.25.0
- **Database**: MongoDB (Motor async driver 3.3.1)
- **Authentication**: PyJWT, Passlib
- **Environment**: python-dotenv
- **Data Validation**: Pydantic 2.6.4+
- **CORS**: Enabled for frontend communication

### External APIs
- **TMDB API**: Real movie data, search, and images
- **YouTube API**: Movie trailers and video content

### Infrastructure
- **Containerization**: Docker
- **Web Server**: Nginx
- **Process Manager**: Supervisor (for production)
- **Database**: MongoDB (localhost:27017)

## 🚀 Getting Started

### Prerequisites
- **Node.js** (for frontend)
- **Python 3.8+** (for backend)
- **MongoDB** (running on localhost:27017)
- **TMDB API Key** (for movie data - included in source)
- **Yarn** or **npm** (package managers)

### Environment Variables

#### Backend (.env)
```bash
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
```

#### Frontend (.env)
```bash
# Frontend environment variables
REACT_APP_API_URL=http://localhost:8001/api
```

### Quick Start

#### Option 1: Manual Startup

1. **Start MongoDB** (ensure it's running on port 27017)

2. **Backend Setup**:
   ```bash
   cd netflix/backend
   pip install -r requirements.txt
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   ```

3. **Frontend Setup** (in new terminal):
   ```bash
   cd netflix/frontend
   npm install  # or yarn install
   npm start    # or yarn start
   ```

#### Option 2: Using Docker
```bash
cd netflix
docker-compose up --build
```

#### Option 3: Production Script
```bash
cd netflix/scripts
./update-and-start.sh
```

## 📡 API Endpoints

### Base URL: `http://localhost:8001/api`

- **GET /**: Health check endpoint
- **POST /status**: Create status check
- **GET /status**: Get all status checks

### TMDB API Integration
The frontend integrates with The Movie Database API for:
- **Trending Movies**: `/trending/movie/day` and `/trending/movie/week`
- **Popular Movies**: `/movie/popular`
- **Top Rated**: `/movie/top_rated`
- **Genre Discovery**: `/discover/movie` with genre filters
- **Movie Search**: `/search/movie` for search functionality
- **Movie Details**: Individual movie information and trailers

### Example API Usage
```javascript
// Create status check
POST /api/status
{
  "client_name": "web-client"
}

// Get status checks
GET /api/status
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs (FastAPI auto-generated)

## ✨ Key Features

### 🎬 **Movie Browsing**
- **Featured Hero Banner**: Large showcase of trending content
- **Multiple Categories**: Trending, Popular, Top Rated, Action, Comedy, Horror
- **Horizontal Scrolling**: Netflix-style movie carousels
- **Hover Effects**: Interactive movie cards with smooth animations

### 🔍 **Search Functionality**
- **Real-time Search**: Instant search as you type
- **Grid Results**: Beautiful grid layout for search results
- **TMDB Integration**: Search across millions of movies and TV shows
- **Fallback Images**: Custom placeholder images when posters unavailable

### 🎭 **Movie Details**
- **Modal Popups**: Detailed movie information in overlay modals
- **Trailer Support**: YouTube trailer integration
- **Movie Info**: Ratings, release dates, overviews, and cast information
- **Play Button**: Ready for video streaming integration

### 🎨 **UI/UX Features**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Netflix-inspired dark color scheme
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Professional loading indicators
- **Scroll Effects**: Dynamic header that changes on scroll

## 📁 Key Files

### Frontend
- `frontend/src/App.js`: Main application with TMDB integration and routing
- `frontend/src/components.js`: UI components (Header, Banner, Cards, Modals)
- `frontend/src/App.css`: Styling with Tailwind CSS
- `frontend/src/index.js`: React application entry point
- `frontend/package.json`: Dependencies and scripts
- `frontend/tailwind.config.js`: Tailwind CSS configuration

### Backend
- `backend/server.py`: Main FastAPI application
- `backend/requirements.txt`: Python dependencies
- `backend/.env`: Environment configuration
- `backend/external_integrations/`: Third-party service integrations

### Infrastructure
- `Dockerfile`: Container build instructions
- `nginx.conf`: Web server configuration
- `entrypoint.sh`: Container startup script
- `scripts/update-and-start.sh`: Development startup script

### Project Management
- `.cursor/rules/`: AI Assistant navigation rules for better code understanding
- `.emergent/`: Project management and tracking files

## 🔧 Development

### Frontend Development
- Built with **React 19** and modern hooks
- **TMDB API** integration for real movie data
- **Tailwind CSS** for responsive styling
- **Framer Motion** for smooth animations
- **React YouTube** for trailer playback
- **Axios** for API communication

### Backend Development
- **FastAPI** with automatic API documentation
- **Async/await** pattern with Motor MongoDB driver
- **CORS** enabled for cross-origin requests
- **Pydantic** models for data validation
- **UUID** and **datetime** for data integrity

### Database
- **MongoDB** for data persistence
- Collections: `status_checks` (and potentially more)
- Async operations using Motor driver

## 🐛 Troubleshooting

### Common Issues
1. **Port conflicts**: Kill processes on ports 3000 and 8001
2. **MongoDB connection**: Ensure MongoDB is running on localhost:27017
3. **CORS errors**: Backend has CORS enabled for all origins
4. **Dependencies**: Run `npm install` and `pip install -r requirements.txt`
5. **TMDB API**: Movie data requires internet connection

### Logs Location (Production)
- Backend logs: `/var/log/supervisor/backend.out.log`
- Frontend logs: `/var/log/supervisor/frontend.out.log`

## 📝 Notes

- The application uses **TMDB API** for real movie data and images
- **Pokemon content** is mixed with trending movies for variety
- **CORS** is configured to allow all origins (adjust for production)
- **Environment variables** are loaded using python-dotenv
- **API routes** are prefixed with `/api`
- **Frontend** expects backend on localhost:8001
- **Database** uses test_database by default
- **Fallback data** provided for offline functionality

## 🎯 Recent Updates (Quriosity Branch)

✅ **TMDB API Integration**: Real movie data from The Movie Database  
✅ **Enhanced UI Components**: Professional Netflix-style interface  
✅ **Search Functionality**: Real-time movie search with beautiful results  
✅ **Movie Modals**: Detailed movie information with trailer support  
✅ **Pokemon Content**: Special Pokemon movie collections  
✅ **Responsive Design**: Works across all device sizes  
✅ **Loading States**: Professional loading and error handling  
✅ **Smooth Animations**: Framer Motion powered interactions  

## 🚧 Development Status

This is an **actively developed** Netflix-style streaming application featuring:
- Real movie data integration
- Modern React 19 architecture
- Professional UI/UX design
- Full-stack MongoDB backend
- Docker containerization
- Production-ready deployment

Perfect for learning modern web development with **real-world API integration** and **professional-grade UI components**!
