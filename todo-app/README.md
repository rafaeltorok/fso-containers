# Todo app

## Table of Contents
- [About](#about)
- [Usage](#usage)
- [CRUD operations](#crud-operations)
- [E2E tests](#e2e-tests)
- [Component tests](#component-tests)


## About

### Stack

- **Backend**: Express + MongoDB + Redis
- **Frontend**: React + Axios

### Font

- [SuperKindly⇗](https://www.fontspace.com/super-kindly-font-f152505) by *All Super Font*
- License: Freeware


## Usage

**Note**: This app was designed to be used with Docker only. Since it requires local Redis and MongoDB containers for the Server to store data.

### Development build

**Mode with hot reload implemented for both frontend and backend.**

Start the development composer orchestration
```bash
docker compose -f ./docker-compose.dev.yml up --build
```

Access the Web UI on http://localhost:5173

### Production build

Start the containers
```bash
docker compose up --build
```

Access the Web UI on http://localhost:8000


## CRUD operations

Port numbers:

- Development build on port `3000`
- Production build (through the Nginx reverse proxy) on port `8000`

Server routes:

- Get info about the MONGO_URL, REDIS_URL and visits counter
  ```bash
  curl -X GET http://localhost:<PORT>/info
  ```

- Server health check
  ```bash
  curl -X GET http://localhost:<PORT>/health
  ```

- Statistics about the total number of todos
  ```bash
  curl -X GET http://localhost:<PORT>/api/statistics
  ```

- GET all todos
  ```bash
  curl -X GET http://localhost:<PORT>/api/todos
  ```

- POST a new todo
  ```bash
  curl -X POST http://localhost:<PORT>/api/todos -H "Content-Type: application/json" --data '{ "text": "Use curl to add a new todo", "done": true }'
  ```

- PUT (update) a todo
  ```bash
  curl -X PUT http://localhost:<PORT>/api/todos/:id -H "Content-Type: application/json" --data '{ "done": true }'
  ```

- DELETE a todo
  ```bash
  curl -X DELETE http://localhost:<PORT>/api/todos/:id
  ```


## E2E tests

**Note**: it is recommended to run the Playwright testing suite with Docker Composer for simplicity.

Run the tests orchestration script
```bash
docker compose -f ./docker-compose.test.yml up --build --abort-on-container-exit
```

Cleanup after the tests
```bash
docker compose -f ./docker-compose.test.yml down -v
```


## Component tests

The tests were implemented with Vitest + React Testing Library.

Enter the frontend folder
```bash
cd ./todo-app/todo-frontend
```

Run in watch mode
```bash
npm run test
```

Run the suites only once
```bash
npm run test:run
```

UI mode
```bash
npm run test:ui
```

Get the current test coverage
```bash
npm run coverage
```
