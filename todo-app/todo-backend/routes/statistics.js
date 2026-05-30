const express = require("express");
const router = express.Router();
const { get } = require("../redis/index");

router.get("/", async (_, res) => {
  const totalTodos = await get("added_todos");
  return res.json({
    "added_todos": totalTodos
  });
});

module.exports = router;
