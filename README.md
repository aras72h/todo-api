# Todo API Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [API Endpoints](#api-endpoints)
4. [Configuration](#configuration)
5. [Setup and Installation](#setup-and-installation)

## Overview

The Todo API provides a set of endpoints for managing a to-do list. It supports user authentication, task creation, and task management. This API is built with Node.js, Express, and Sequelize ORM for database interactions.

## File Structure

```plaintext
└── 📁todo
    └── .env
    └── .gitignore
    └── app.js
    └── 📁config
        └── database.js
    └── 📁controllers
        └── authController.js
        └── listController.js
        └── taskController.js
        └── userController.js
    └── 📁middlewares
        └── authMiddleware.js
        └── errorMiddleware.js
        └── validationMiddleware.js
    └── 📁models
        └── List.js
        └── Task.js
        └── User.js
    └── package-lock.json
    └── package.json
    └── 📁routes
        └── authRoutes.js
        └── listRoutes.js
        └── taskRoutes.js
        └── userRoutes.js
    └── sync.js
```

### `app.js`

- **Description**: Entry point of the application. Sets up the Express server and applies middleware.
- **Key Functionality**: Initializes middleware, sets up routes, and starts the server.

### `config/database.js`

- **Description**: Configures and connects to the database using Sequelize ORM.
- **Key Functionality**: Manages database connection and settings.

### `controllers/`

Contains logic for handling HTTP requests and responses.

- **`authController.js`**: Manages user authentication, registration, and login.
- **`listController.js`**: Handles operations related to to-do lists.
- **`taskController.js`**: Manages to-do tasks within lists.
- **`userController.js`**: Manages user-related operations.

### `middlewares/`

Contains middleware functions for various purposes.

- **`authMiddleware.js`**: Verifies JWT tokens and authenticates users.
- **`errorMiddleware.js`**: Catches and handles errors.
- **`validationMiddleware.js`**: Validates request data.

### `models/`

Defines database models using Sequelize ORM.

- **`List.js`**: Model for to-do lists.
- **`Task.js`**: Model for to-do tasks.
- **`User.js`**: Model for users.

### `routes/`

Defines API routes and associates them with controllers.

- **`authRoutes.js`**: Routes for user authentication and registration.
- **`listRoutes.js`**: Routes for managing to-do lists.
- **`taskRoutes.js`**: Routes for managing tasks within lists.
- **`userRoutes.js`**: Routes for user-related operations.

### `sync.js`

- **Description**: Synchronizes the database with Sequelize models, creating tables and ensuring the database schema is up-to-date.

## API Endpoints

### Authentication

- **POST `/register`**
  - **Description**: Register a new user.
  - **Request Body**: `{ username: string, email: string, password: string }`
  - **Response**: `{ id: number, username: string, email: string }`

- **POST `/login`**
  - **Description**: Authenticate a user and return a JWT token.
  - **Request Body**: `{ email: string, password: string }`
  - **Response**: `{ token: string }`

### To-Do Lists

- **POST `/lists`**
  - **Description**: Create a new to-do list.
  - **Request Body**: `{ name: string }`
  - **Response**: `{ id: number, name: string, userId: number }`

- **GET `/lists`**
  - **Description**: Get all to-do lists for the authenticated user.
  - **Response**: `[ { id: number, name: string, userId: number } ]`

- **GET `/lists/:id`**
  - **Description**: Get a specific to-do list by ID.
  - **Response**: `{ id: number, name: string, userId: number }`

- **PUT `/lists/:id`**
  - **Description**: Update a specific to-do list by ID.
  - **Request Body**: `{ name: string }`
  - **Response**: `{ id: number, name: string, userId: number }`

- **DELETE `/lists/:id`**
  - **Description**: Delete a specific to-do list by ID.
  - **Response**: `{ message: "List deleted" }`

### Tasks

- **POST `/lists/:listId/tasks`**
  - **Description**: Add a new task to a to-do list.
  - **Request Body**: `{ title: string }`
  - **Response**: `{ id: number, title: string, listId: number }`

- **GET `/lists/:listId/tasks`**
  - **Description**: Get all tasks for a specific to-do list.
  - **Response**: `[ { id: number, title: string, listId: number } ]`

- **GET `/lists/:listId/tasks/:taskId`**
  - **Description**: Get a specific task by ID.
  - **Response**: `{ id: number, title: string, listId: number }`

- **PUT `/lists/:listId/tasks/:taskId`**
  - **Description**: Update a specific task by ID.
  - **Request Body**: `{ title: string }`
  - **Response**: `{ id: number, title: string, listId: number }`

- **DELETE `/lists/:listId/tasks/:taskId`**
  - **Description**: Delete a specific task by ID.
  - **Response**: `{ message: "Task deleted" }`

  ### Users

- **GET `/users/:id`**
  - **Description**: Retrieve a user by ID.
  - **Response**: `{ id: number, username: string, email: string }`

- **PUT `/users/:id`**
  - **Description**: Update user information by ID.
  - **Request Body**: `{ username: string, email: string, password: string }`
  - **Response**: `{ id: number, username: string, email: string }`

- **DELETE `/users/:id`**
  - **Description**: Delete a user by ID.
  - **Response**: `{ message: "User deleted" }`

## Configuration

To configure the application, create a `.env` file in the root directory of the project with the following environment variables:

```
# Database configuration
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=5432

# JWT secret for token signing
JWT_SECRET=your_jwt_secret
```

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory**:
    ```bash
    cd todo
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**: Create a `.env` file in the root directory with the required variables.

5. **Sync the database**:
    ```bash
    node sync.js
    ```

6. **Start the server**:
    ```bash
    npm start
    ```

---
