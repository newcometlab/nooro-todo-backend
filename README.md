# Todo List App - Backend

Backend service for the Todo List App. It provides the REST API for managing tasks and uses Prisma ORM with a MySQL database.

## Features

*   RESTful API endpoints for CRUD operations
*   Prisma ORM for seamless database management
*   Express.js for server-side logic

## Prerequisites

*   Node.js (v18 or above)
*   MySQL installed and running
*   npm or yarn package manager

## Setup Instructions

### 1\. Install Dependencies

```

npm install
# or
yarn install
  
```

### 2\. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```

DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database_name>"
PORT=3001
  
```

### 3\. Initialize the Database

```

npx prisma db push   # Sync schema to database
npx prisma generate  # Generate Prisma Client
  
```

If this is the first run, create your database in MySQL:

```

CREATE DATABASE <database_name>;
  
```

### 4\. Start the Server

```

npm run dev
# or
yarn dev
  
```

The server will be running on `http://localhost:3001`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a task by ID |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task by ID |
| DELETE | /tasks/:id | Delete a task by ID |

## Scripts

*   `npm run dev`: Start the server in development mode
*   `npm start`: Start the server in production mode
*   `npx prisma db push`: Sync database schema with Prisma ORM
