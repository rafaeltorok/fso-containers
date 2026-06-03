const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/", async (_, res) => {
  return res.status(200).send("Server is online");
});

module.exports = healthRouter;
