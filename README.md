# Task Manager REST API

- A simple REST API for managing tasks, built with Node.js and Express.
- Readme created with the help of github copilot, because i'm bad at that stuff

## Features

- **CRUD operations** for tasks:
  - `GET /tasks`: Retrieve all tasks
  - `POST /tasks`: Create a new task
  - `PUT /tasks/:id`: Update an existing task
  - `DELETE /tasks/:id`: Delete a task
- Each task has:
  - `id` (number)
  - `title` (string)
  - `done` (boolean, indicates if the task is completed)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/LouisGastineau/<your-repo-name>.git
    cd <your-repo-name>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```
   The API will run on `http://localhost:4000` by default.

## API Endpoints

### Get all tasks

```http
GET /tasks
```
**Response**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "done": false
  }
]
```

### Create a new task

```http
POST /tasks
Content-Type: application/json
```
**Body**
```json
{
  "title": "Walk the dog",
  "done": false
}
```
**Response**
```json
{
  "id": 2,
  "title": "Walk the dog",
  "done": false
}
```

### Update a task

```http
PUT /tasks/:id
Content-Type: application/json
```
**Body**
```json
{
  "title": "Buy groceries and cook dinner",
  "done": true
}
```
**Response**
```json
{
  "id": 1,
  "title": "Buy groceries and cook dinner",
  "done": true
}
```

### Delete a task

```http
DELETE /tasks/:id
```
**Response**
```json
{
  "message": "Task deleted"
}
```

## Notes

- No authentication required.
- Data is stored in memory (will reset on server restart) unless you add a database.

## License

MIT
