# Task Management Web Application

This is a simple task management web application built with React, Node.js, Express, and MongoDB. It allows users to create, edit, and delete tasks.

## Features

- Add new tasks with a title and description
- Edit existing tasks
- Delete tasks
- View a list of all tasks

## Technologies Used

- React: Frontend framework for building user interfaces
- Node.js: JavaScript runtime for server-side applications
- Express: Web application framework for Node.js
- MongoDB: NoSQL database for storing tasks
- Axios: Promise-based HTTP client for making requests to the server
- Bootstrap: Frontend framework for designing responsive and mobile-first websites

## API Endpoints

### GET /api/tasks

- Description: Retrieves a list of all tasks
- Response: JSON array of tasks
- Sample Response:
  ```json
  [
    {
      "_id": "task1_id",
      "title": "Task 1",
      "description": "This is the first task"
    },
    {
      "_id": "task2_id",
      "title": "Task 2",
      "description": "This is the second task"
    }
  ]
  ```

### POST /api/tasks

- Description: Creates a new task
- Request Body: JSON object with `title` and `description` properties
- Response: JSON object with the created task and a success message
- Sample Request:
  ```json
  {
    "title": "New Task",
    "description": "This is a new task"
  }
  ```
- Sample Response:
  ```json
  {
    "message": "Task created successfully",
    "task": {
      "_id": "new_task_id",
      "title": "New Task",
      "description": "This is a new task"
    }
  }
  ```

### PUT /api/tasks/:id

- Description: Updates an existing task
- Request Body: JSON object with `title` and/or `description` properties
- Response: JSON object with the updated task and a success message
- Sample Request:
  ```json
  {
    "title": "Updated Task",
    "description": "This task has been updated"
  }
  ```
- Sample Response:
  ```json
  {
    "message": "Task updated successfully",
    "task": {
      "_id": "task_id",
      "title": "Updated Task",
      "description": "This task has been updated"
    }
  }
  ```

### DELETE /api/tasks/:id

- Description: Deletes a task by its ID
- Response: JSON object with a success message
- Sample Response:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## How to Run

1. Clone the repository.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the dependencies.
4. Start the backend server by running `npm run dev` in the `backend` directory.
5. Start the frontend server by running `npm start` in the `src` directory.

## Author

This project was created by Rishabh Gupta. If you have any questions or suggestions, please feel free to reach out.
