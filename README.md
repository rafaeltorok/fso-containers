# FullStackOpen: Containers

## Table of Contents
- [About](#about)
- [Usage](#usage)
- [E2E tests](#e2e-tests)


## About
Material from the Part 12 of the FullStackOpen course by MOOC Finland, section about Containers.

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

Access:

- Web UI on http://localhost:5173
- CRUD operations on http://localhost:3000

### Production build

Start the containers
```bash
docker compose up --build
```

Access:

- Web UI on http://localhost:8000
- CRUD operations on http://localhost:3000


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
