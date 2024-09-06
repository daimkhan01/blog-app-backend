# My React & Express Project in Sequelize ORM SQL Database

This project is a full-stack application built with React for the frontend and Express for the backend. The application supports user authentication, CRUD operations for posts, and more.

## Table of Contents

    Features
    Technologies Used
    Installation
    Environment Variables
    Running the Application
    API Endpoints
    Project Structure
    License

## Features

    User authentication (signup, login)
    CRUD operations for posts (create, read, update, delete)
    JWT-based authentication for secure routes
    Pagination and search functionality for posts
    Tailwind CSS for styling the React components
    Axios for making API requests

## Technologies Used

    Frontend: React, Tailwind CSS, Axios, React Router, React Toastify
    Backend: Node.js, Express, JWT, Bcrypt, MySQL
    Database: MySQL
    Middleware: CORS, Body-Parser

## Installation

### Clone the repository:

    bash

git clone https://github.com/your-username/your-repo.git
cd your-repo

### Install dependencies for the backend:

bash

cd backend
npm install

### Install dependencies for the frontend:

bash

    cd ../frontend
    npm install

### Environment Variables

Create a .env file in the backend directory and add the following environment variables:

PORT=8000
JWT_SECRET=your_secret
JWT_EXPIRES_IN=days
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

## Running the Application

### Start the backend server:

    bash

cd backend
npm start

### Start the frontend development server:

bash

    cd ../frontend
    npm start

    The application should now be running on:
        Frontend: http://localhost:3000
        Backend: http://localhost:8000

## API Endpoints

### Authentication

    POST /api/auth/signup - Create a new user
    POST /api/auth/login - Log in a user

### Posts

    GET /api/posts - Get all posts (supports pagination and search)
    GET /api/posts/:postId - Get a single post by ID
    POST /api/posts - Create a new post (protected)
    PUT /api/posts/:postId - Update a post by ID (protected, owner only)
    DELETE /api/posts/:postId - Delete a post by ID (protected, owner only)
    GET /api/posts/user/:userId - Get posts by a specific user

## Project Structure

.
├── backend
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── db
│ ├── .env
│ ├── server.js
│ └── package.json
└── frontend
├── public
├── src
│ ├── components
│ ├── pages
│ ├── App.js
│ ├── index.js
│ └── styles
├── tailwind.config.js
├── package.json
└── .env

## License

This project is licensed under the MIT License. See the LICENSE file for details.
