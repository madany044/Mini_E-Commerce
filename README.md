# E-Commerce Web Application

## Project Overview

A minimal production-ready e-commerce web application built with React.js and Node.js. The application features user authentication, product listing, and a shopping cart system. All data is stored in-memory for simplicity.

## Architecture

The application follows a client-server architecture:

- **Frontend**: React.js application with functional components and hooks
- **Backend**: Node.js Express server providing RESTful API endpoints
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Storage**: In-memory storage (no database required)

## Folder Structure

```
ecommerce-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── cart.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── api.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Products.js
│   │   │   └── Cart.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Product Routes
- `GET /api/products` - Get all products

### Cart Routes (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:productId` - Remove item from cart

## Features

- User registration and login with JWT authentication
- Password hashing using bcrypt
- Product listing with static product data
- Shopping cart functionality (user-specific)
- Protected routes requiring authentication
- Clean and modern UI

## Important Notes

- All data (users, products, carts) is stored in-memory and will reset when the server restarts
- JWT tokens are stored in localStorage on the frontend
- The backend runs on port 5000
- The frontend runs on port 3000

