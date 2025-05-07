# Notes App Backend



## Features Implemented

### Authentication System
- JWT-based authentication
- User registration with email validation
- Secure password hashing with bcrypt
- Protected route middleware
- Token-based session management

### Notes Management
- CRUD operations for notes
- User-specific note access
- Note pinning functionality
- Timestamp tracking for notes
- Data validation and sanitization

### Security Features
- CORS protection
- Helmet security headers
- Input validation
- Error handling middleware
- Secure password storage
- JWT token validation

### API Features
- RESTful API design
- Request logging with Morgan
- Environment-based configuration
- Database connection pooling
- Error response standardization

## Technology Stack

### Core Technologies
- Node.js
- Express.js
- MySQL (Database)
- JWT (Authentication)

### Security & Validation
- bcrypt (Password hashing)
- jsonwebtoken (JWT handling)
- express-validator (Input validation)
- helmet (Security headers)

### Development Tools
- nodemon (Development server)
- morgan (Request logging)
- dotenv (Environment variables)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notes-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=notes_app
JWT_SECRET=your_jwt_secret
```

4. Set up the database:
```sql
CREATE DATABASE notes_app;
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`


## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Project Structure

backend/
├── config/ # Configuration files
├── controllers/ # Route controllers
├── middlewares/ # Custom middlewares
├── models/ # Database models
├── routes/ # API routes
├── .env # Environment variables
├── server.js # Application entry point
└── package.json # Project dependencies

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Input validation is performed on all requests
- CORS is configured for specific origins
- Security headers are set using Helmet
- SQL injection prevention through parameterized queries
