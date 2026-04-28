# Starter Kit MERN

A full-stack MERN starter kit with a Node.js/Express API, MongoDB, and a Vite + React frontend. The project includes user authentication, profile management, admin user controls, and user activity logs.

## Project Structure

- `Starter-Backend/` - Express API, MongoDB connection, authentication, validation, and user/log routes.
- `Starter-Frontend/` - React app with routing, auth state, UI components, and API integration.

## Features

- User registration, login, logout, and password reset
- JWT-based authentication and role checks
- Admin user management and activation controls
- User logs tracking and pagination support
- Vite frontend with routed pages and shared layout components

## Requirements

- Node.js 18 or newer
- MongoDB database
- npm

## Setup

### 1. Install backend dependencies

```bash
cd Starter-Backend
npm install
```

Create a `.env` file in `Starter-Backend/` with at least:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
NODE_ENV=development
```

### 2. Install frontend dependencies

```bash
cd ../Starter-Frontend
npm install
```

The frontend talks to the API at `http://localhost:3001/api` by default.

## Running the app

### Backend

```bash
cd Starter-Backend
npm run dev
```

The API starts on `http://localhost:3001` unless you change `PORT`.

### Frontend

```bash
cd Starter-Frontend
npm run dev
```

Vite will print the local development URL, usually `http://localhost:5173`.

## Available Scripts

### Backend

- `npm run dev` - start the API with nodemon
- `npm start` - start the API in production mode

### Frontend

- `npm run dev` - start the Vite dev server
- `npm run build` - build the production bundle
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

## API Notes

- Authentication uses Bearer JWT tokens.
- The API base URL used by the frontend is `http://localhost:3001/api`.
- User profile data is available from the `/users/me` route.

## Main Folders

- `Starter-Backend/src/controllers/` - request handlers
- `Starter-Backend/src/middlewares/` - auth, validation, logging, upload, and rate limiting middleware
- `Starter-Backend/src/models/` - MongoDB models
- `Starter-Backend/src/routes/` - API routes
- `Starter-Frontend/src/app/` - app shell, providers, and routing
- `Starter-Frontend/src/features/` - auth and user feature modules
- `Starter-Frontend/src/components/` - shared UI and layout components

## Notes

- If you seed the database, check `Starter-Backend/seeding/` for the available seeders.
- The frontend template expects JSX to stay in `.jsx` files.
