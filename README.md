# Netflix Clone Application

A full-stack Netflix-style streaming application with React frontend and FastAPI backend.

## 🏗️ Project Architecture

This is a **full-stack web application** with the following structure:

```
netflix/
├── frontend/          # React application (Port 3000)
├── backend/           # FastAPI Python server (Port 8001)
├── scripts/           # Deployment and utility scripts
├── tests/             # Test files
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
- **Build Tool**: Create React App (react-scripts 5.0.1)

### Backend
- **Framework**: FastAPI 0.110.1
- **Server**: Uvicorn 0.25.0
- **Database**: MongoDB (Motor async driver 3.3.1)
- **Authentication**: PyJWT, Passlib
- **Environment**: python-dotenv
- **Data Validation**: Pydantic 2.6.4+
- **CORS**: Enabled for frontend communication

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

## 📁 Key Files

### Frontend
- `frontend/src/`: React application source code
- `frontend/public/`: Static assets
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

## 🔧 Development

### Frontend Development
- Built with **Create React App**
- Uses **Tailwind CSS** for styling
- **React Router** for navigation
- **Framer Motion** for animations
- **Axios** for API calls

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

### Logs Location (Production)
- Backend logs: `/var/log/supervisor/backend.out.log`
- Frontend logs: `/var/log/supervisor/frontend.out.log`

## 📝 Notes

- The application uses **async/await** patterns for database operations
- **CORS** is configured to allow all origins (adjust for production)
- **Environment variables** are loaded using python-dotenv
- **API routes** are prefixed with `/api`
- **Frontend** expects backend on localhost:8001
- **Database** uses test_database by default

## 🚧 Development Status

This appears to be a development/learning project for building a Netflix-style streaming application with modern web technologies.
