// Dependencies
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// Routers
const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");
const statisticsRouter = require("./routes/statistics");
const healthRouter = require("./routes/healthcheck");

const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

// Serve the frontend static build
app.use(express.static("./dist"));

// Express routes
app.use("/info", indexRouter);
app.use("/api/todos", todosRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/health", healthRouter);

module.exports = app;
